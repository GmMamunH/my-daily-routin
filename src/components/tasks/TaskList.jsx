import React from "react";

export const TaskList = () => {
  return (
    <>
      <div>
        <h1>Task List</h1>
        <div className="flex items-center gap-3">
          <div>
            <input type="checkbox" name="taskComplete" id="taskComplete" />
          </div>
          <div>
            <p>task</p>
          </div>
          <div>
            <button>Edit</button>
          </div>
          <div>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};
