import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter ,Routes, Route, useNavigate, Navigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"

import {getList, getStatus} from "./features/activityFeed/activityFeedSlice.js";
import ActivityFeed from './components/ActivityFeed.jsx';
import Loading from './components/Loading.jsx';
import Layout from './components/Layout.jsx';
import ActivityDetail from './components/ActivityDetail.jsx';
import ArchivedCalls from './components/ArchivedCalls.jsx';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const callListStatus = useSelector(getStatus);
  
  useEffect(() => {
  
      if(callListStatus === "idle")
      {
          dispatch(getList());
       }
     
    }, [dispatch, callListStatus])


 if(callListStatus === "loading")
 {
  return <Loading />
 }
 else if(callListStatus === "success")
 {
  return (
<Routes>
    <Route path="/" element={<Layout />}>

      <Route index element={<ActivityFeed />} />
      <Route path='detail'>
       <Route path=':id' element={<ActivityDetail />} />
      </Route>
      <Route path='/archived' element={<ArchivedCalls />}></Route>
      {/* Catch all - replace with 404 component if you want */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Route>
  </Routes>
  )
 }
 else
 {
  return (
    <div>Error!</div>
  )
 }
    
  
}

export default App;
