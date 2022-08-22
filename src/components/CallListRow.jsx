import React from "react";
import {
  selectCallById,
  updateActivityArchive,
  updateCall,
} from "../features/activityFeed/activityFeedSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/callListRow.css";
import { HiPhoneMissedCall } from "react-icons/hi";
import { IconContext } from "react-icons";
import { VscCallIncoming } from "react-icons/vsc";
import { FiVoicemail } from "react-icons/fi";
import Time from "./Time.js";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CallListRow(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // selecting activity
  const call = useSelector((state) => selectCallById(state, props.id));
  // selecting previous activity to comare its day to current activity day
  const previousCall = useSelector((state) =>
    selectCallById(state, props.previous)
  );
  let type, caller, receiver, hour, minute, duration, content;

  // eslint-disable-next-line default-case
  switch (call.call_type) {
    case "missed":
      type = (
        <IconContext.Provider value={{ size: "2rem", color: "red" }}>
          <div>
            <HiPhoneMissedCall />
          </div>
        </IconContext.Provider>
      );
      break;
    case "answered":
      type = (
        <IconContext.Provider value={{ size: "2rem", color: "#228B22" }}>
          <div>
            <VscCallIncoming />
          </div>
        </IconContext.Provider>
      );
      break;
    case "voicemail":
      type = (
        <IconContext.Provider value={{ size: "2rem", color: "#FF4500" }}>
          <div>
            <FiVoicemail />
          </div>
        </IconContext.Provider>
      );
      break;
  }

  caller = <div className="div-caller">{call.from}</div>;
  receiver = (
    <div className="div-receiver">
      tried to call <span className="span-receiver">{call.to}</span>
    </div>
  );

  hour = new Date(call.created_at).getUTCHours();
  minute = new Date(call.created_at).getUTCMinutes();

  duration = (
    <div className="div-duration">
      Duration:{" "}
      <span className="sapn-duration">{parseInt(call.duration) / 60} min</span>
    </div>
  );

  if (
    // adding date of activity to the list if days are different
    new Date(call.created_at).getUTCDate() !==
      new Date(previousCall.created_at).getUTCDate() ||
    call.id === previousCall.id
  ) {
    content = (
      <>
        <div className="div-day-call">
          <Time time={call.created_at} />
        </div>
        <Card className="card">
          <Card.Body>
            <div className="activity-container">
              {type}
              <div className="activity-caller">
                {caller}
                {receiver}
              </div>
              <div className="div-time">
                <div className="div-time-hour">
                  <div>
                    {parseInt(hour) > 12 ? parseInt(hour) - 12 : hour}:{" "}
                  </div>
                  <div>
                    {minute} {parseInt(hour) > 12 ? "PM" : "AM"}
                  </div>
                </div>
                {duration}
              </div>

              <div className="div-buttons">
                <Button
                  className="viewBtn"
                  onClick={() => {
                    viewDetailClicked(call.id);
                  }}
                  variant="outline-primary"
                >
                  View
                </Button>
                <Button
                  onClick={updateActivityClicked}
                  className="archiveBtn"
                  variant="outline-dark"
                >
                  {call.is_archived ? "Unarchive" : "Archive"}
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    content = (
      <Card className="card">
        <Card.Body>
          <div className="activity-container">
            {type}
            <div className="activity-caller">
              {caller}
              {receiver}
            </div>
            <div className="div-time">
              <div className="div-time-hour">
                <div>{parseInt(hour) > 12 ? parseInt(hour) - 12 : hour}: </div>
                <div>
                  {minute} {parseInt(hour) > 12 ? "PM" : "AM"}
                </div>
              </div>
              {duration}
            </div>
            <div className="div-buttons">
              <Button
                className="viewBtn"
                onClick={() => {
                  viewDetailClicked(call.id);
                }}
                variant="outline-primary"
              >
                View
              </Button>
              <Button
                onClick={updateActivityClicked}
                className="archiveBtn"
                variant="outline-dark"
              >
                {call.is_archived ? "Unarchive" : "Archive"}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  function updateActivityClicked() {
    // update store
    dispatch(
      updateActivityArchive({ id: call.id, isArchived: !call.is_archived })
    );
    // update database
    dispatch(updateCall({ id: call.id, is_archived: !call.is_archived }));
  }

  // clicking on view button
  function viewDetailClicked(id) {
    navigate(`/detail/${call.id}`);
  }

  return <div>{content}</div>;
}

export default CallListRow;
