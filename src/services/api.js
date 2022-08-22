import {URL} from "../features/activityFeed/activityFeedSlice.js"


// get activity by id
export async function getActivity(id)
    {
        const response = await fetch(URL + `/${id}`);
        const json = await response.json();
        return json;
    }
// get all activities 
    export async function getAllActivities()
    {
        const response = await fetch(URL);
        const json = await response.json();
        return json;
    }
// update activity(is_archived)
    export async function updateActivity(id, isArchived)
    {
        const response = await fetch(URL + `/${id}`, 
        {
            method: "POST",
            body : JSON.stringify({
                is_archived: isArchived
              }),
            headers : {"content-type": "application/json"}
        });
        const json = await response.json();
        console.log("json:", json);
        return json;
    }
// reset all activities(is_archived to false)
    export async function resetAllActivities()
    {
        const response = await fetch("https://aircall-job.herokuapp.com/reset");
        const json = await response.json();
        return json;
    }