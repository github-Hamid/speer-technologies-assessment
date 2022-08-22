import {createSlice, createEntityAdapter, createAsyncThunk, createSelector} from "@reduxjs/toolkit";
import {getAllActivities, updateActivity, getActivity, resetAllActivities} from "../../services/api.js"

export const URL = "https://aircall-job.herokuapp.com/activities";

const callAdapter = createEntityAdapter({
    // sorting the entities
    sortComparer : (a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
    }
});

const initialState = callAdapter.getInitialState({
    status: "idle", // 'idle' | 'loading' | 'success'
    error : null
})

// getting all list
export const getList = createAsyncThunk("/getList", async () =>{
    return getAllActivities();
})

// updating the is_archived property
export const updateCall = createAsyncThunk("/postCall", async (activity) =>{

   return updateActivity(activity.id, activity.is_archived);
})

// reset all is_archived property to false
export const resetAllCalls = createAsyncThunk("/postResetCalls", async () => {
return resetAllActivities();
})


const callSlice = createSlice({
    name: "calls",
    initialState,
    reducers: {
       changeStatus : (state, action) => {
        state.status = action.payload;
       },
       // updating the is_archive propertys
       updateActivityArchive: (state, action) => {
        let activity = state.entities[action.payload.id]
        if(activity)
        {
            activity.is_archived = action.payload.isArchived;
             callAdapter.updateOne(state, activity);
        }
       },
       // set all calls property(is_archived) to true
       archiveAllCalls: (state, action) => {
        let activity = ""
         state.ids.forEach((id) => {
           activity = state.entities[id];
           activity.is_archived = true;
           callAdapter.updateOne(state, activity);
        })
       },
       // // set all calls property(is_archived) to false
       unArchiveAllCalls: (state, action) => {
        let activity = ""
         state.ids.forEach((id) => {
           activity = state.entities[id];
           activity.is_archived = false;
           callAdapter.updateOne(state, activity);
        })
       }
    },
    extraReducers(builder)
    {
        builder
        .addCase(getList.pending, (state, action) => {
            state.status = "loading"
        })

        .addCase(getList.fulfilled, (state, action) => {
            callAdapter.upsertMany(state, action.payload);
             state.status = "success";
        })

        .addCase(getList.rejected, (state, action) => {
            state.error = "Cannot find any list of calls";
        })
        .addCase(updateCall.rejected, (state, action) => {
            state.error = "Error in updating archive!"
        })
      .addCase(resetAllCalls.rejected, (state, action) => {
        state.error = "Error in reseting All Calls!";
      })
    }
})

export const {
    selectAll: selectAllCalls,
    selectById: selectCallById,
    selectIds: selectCallIds
    } = callAdapter.getSelectors((state) => {
        return state.calls
    })

export const getStatus = (state) => {
    return state.calls.status;
}

export const selectArchivedActivities = createSelector(
    [selectAllCalls], (calls) => {
        return calls.filter((call) => call.is_archived);
    }
)



export const {changeStatus, updateActivityArchive, archiveAllCalls, unArchiveAllCalls} = callSlice.actions;
export default callSlice.reducer;