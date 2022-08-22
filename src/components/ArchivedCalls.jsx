import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectArchivedActivities,
  resetAllCalls,
  unArchiveAllCalls,
} from "../features/activityFeed/activityFeedSlice.js";
import CallListRow from "./CallListRow.jsx";
import { MdOutlineUnarchive } from "react-icons/md";
import { IconContext } from "react-icons";
import "../css/archivedCalls.css";
function ArchivedCalls() {
  const dispatch = useDispatch();
  // selecting archived activities
  const archivedCalls = useSelector(selectArchivedActivities);
  let content = "";
  if (archivedCalls.length) {
    let previousId = archivedCalls[0].id;
    let temp = "";
    content = archivedCalls.map((call) => {
      temp = previousId;
      previousId = call.id;
      // variable previous is used for comparing each day of action to previous action day
      return <CallListRow key={call.id} id={call.id} previous={temp} />;
    });
  }

  function archiveDivHovered() {
    const unarchivedIcon = document.getElementById("unarchiveIcon");
    unarchivedIcon.classList.add("spin");
  }

  function archiveDivleft() {
    const unarchivedIcon = document.getElementById("unarchiveIcon");
    unarchivedIcon.classList.remove("spin");
  }

  function unArchiveAllClicked() {
    // updating store
    dispatch(unArchiveAllCalls());
    // updating database
    dispatch(resetAllCalls());
  }

  return (
    <>
      {archivedCalls.length !== 0 && (
        <div>
          <IconContext.Provider
            value={{ size: "2rem", color: "rgb(42, 196, 32)" }}
          >
            <div className="div-archive">
              <span
                onClick={unArchiveAllClicked}
                onMouseEnter={archiveDivHovered}
                onMouseLeave={archiveDivleft}
                className="span-unarchive-icon"
                id="unarchiveIcon"
              >
                <MdOutlineUnarchive />
              </span>{" "}
              <span
                onClick={unArchiveAllClicked}
                onMouseEnter={archiveDivHovered}
                onMouseLeave={archiveDivleft}
                className="span-reset-all"
              >
                Reset All Calls
              </span>
            </div>
          </IconContext.Provider>
        </div>
      )}
      <div>{content}</div>
    </>
  );
}

export default ArchivedCalls;
