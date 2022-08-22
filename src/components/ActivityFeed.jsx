import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCallIds,
  archiveAllCalls,
  updateCall,
} from "../features/activityFeed/activityFeedSlice.js";
import CallListRow from "./CallListRow.jsx";
import "../css/activityFeed.css";
import { BsArchive } from "react-icons/bs";
import { IconContext } from "react-icons";
function ActivityFeed() {
  const dispatch = useDispatch();
  // select ids of store
  let ids = useSelector(selectCallIds);
  let content = ids.map((id, index) => {
    return (
      <CallListRow
        key={id}
        id={id}
        previous={index !== 0 ? ids[index - 1] : ids[0]}
      />
    );
  });

  function archiveAllClicked() {
    // updaying the store
    dispatch(archiveAllCalls());
    // updating database
    ids.forEach((id) => {
      dispatch(updateCall({ id: id, is_archived: true }));
    });
  }

  // archive icon hovered
  function archiveDivHovered() {
    const archivedIcon = document.getElementById("archiveIcon");
    archivedIcon.classList.add("spin");
  }
  // archive icon hovered left
  function archiveDivleft() {
    const archivedIcon = document.getElementById("archiveIcon");
    archivedIcon.classList.remove("spin");
  }

  return (
    <>
      <div>
        <IconContext.Provider
          value={{ size: "2rem", color: "rgb(42, 196, 32)" }}
        >
          <div className="div-archive">
            <span
              onClick={archiveAllClicked}
              onMouseEnter={archiveDivHovered}
              onMouseLeave={archiveDivleft}
              className="span-archive-icon"
              id="archiveIcon"
            >
              <BsArchive />
            </span>{" "}
            <span
              onClick={archiveAllClicked}
              onMouseEnter={archiveDivHovered}
              onMouseLeave={archiveDivleft}
              className="span-archive-all"
            >
              Archive All Calls
            </span>
          </div>
        </IconContext.Provider>
      </div>
      <div>{content}</div>
    </>
  );
}

export default ActivityFeed;
