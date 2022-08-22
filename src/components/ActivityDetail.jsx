import React, { useEffect, useState } from "react";
import {
  changeStatus,
  selectCallById,
  updateActivityArchive,
  updateCall,
} from "../features/activityFeed/activityFeedSlice.js";

import { useParams } from "react-router-dom";
import { HiPhoneMissedCall } from "react-icons/hi";
import { IconContext } from "react-icons";
import { VscCallIncoming } from "react-icons/vsc";
import { FiVoicemail } from "react-icons/fi";
import { getActivity } from "../services/api.js";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/activityDetail.css";

function ActivityDetail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const activity = useSelector((state) => selectCallById(state, id));
  let type, caller, receiver, hour, minute, duration, content, direction, via;

  function updateActivityClicked() {
    // updating the store
    dispatch(updateActivityArchive({ id, isArchived: !activity.is_archived }));
    // updating the database
    dispatch(updateCall({ id, is_archived: !activity.is_archived }));
  }

  // eslint-disable-next-line default-case
  switch (activity.call_type) {
    case "missed":
      type = (
        <IconContext.Provider value={{ size: "3.5rem", color: "red" }}>
          <div className="div-type">
            <HiPhoneMissedCall />
          </div>
        </IconContext.Provider>
      );
      break;
    case "answered":
      type = (
        <IconContext.Provider value={{ size: "3.5rem", color: "#228B22" }}>
          <div className="div-type">
            <VscCallIncoming />
          </div>
        </IconContext.Provider>
      );
      break;
    case "voicemail":
      type = (
        <IconContext.Provider value={{ size: "3.5rem", color: "#FF4500" }}>
          <div className="div-type">
            <FiVoicemail />
          </div>
        </IconContext.Provider>
      );
      break;
  }

  caller = <div className="caller">{activity.from}</div>;
  receiver = (
    <div>
      tried to call <span className="receiver">{activity.to}</span>
    </div>
  );

  direction = (
    <div>
      Direction: <sapn className="direction">{activity.direction}</sapn>
    </div>
  );

  via = (
    <div>
      Via: <sapn className="via">{activity.via}</sapn>
    </div>
  );

  hour = new Date(activity.created_at).getUTCHours();
  minute = new Date(activity.created_at).getUTCMinutes();

  duration = (
    <div>
      Duration:{" "}
      <span className="duration">{parseInt(activity.duration) / 60} min</span>
    </div>
  );

  content = (
    <div>
      {type}
      <Card className="div-detail-card">
        <Card.Body>
          <div className="detail-container">
            <div>
              {caller}
              {receiver}
            </div>
            <div className="time">
              <div className="hour">
                <div>{parseInt(hour) > 12 ? parseInt(hour) - 12 : hour}: </div>
                <div>
                  {minute} {parseInt(hour) > 12 ? "PM" : "AM"}
                </div>
              </div>
            </div>
            {direction}
            {via}
            {duration}
            <div className="archive-btn">
              <Button onClick={updateActivityClicked} variant="outline-dark">
                {activity.is_archived ? "Unarchive" : "Archive"}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
  return <div>{content}</div>;
}

export default ActivityDetail;
