import { MouseEvent, useEffect, useState } from "react";
import Button from "./Button";
import { SlOptions } from "react-icons/sl";

type TaskType = {
  id: number;
  isDone: boolean;
  isUpdate: boolean;
  task: string;
  handleRemoveTask: (taskId: number) => void;
  handleDoneTask: (taskId: number) => void;
  handleUndoneTask: (taskId: number) => void;
};

const Task = ({
  id,
  isDone,
  isUpdate,
  task,
  handleRemoveTask,
  handleDoneTask,
  handleUndoneTask,
}: TaskType) => {
  const [isShowControls, setIsShowControls] = useState(false);
  const _onShowControls = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsShowControls((prev) => !prev);
  };
  const _onRemoveTask = (taskId: number) => {
    handleRemoveTask(taskId);
  };
  const _onDoneTask = (taskId: number) => {
    handleDoneTask(taskId);
  };
  const _onUndoneTask = (taskId: number) => {
    handleUndoneTask(taskId);
  };

  useEffect(() => {
    window.addEventListener("resize", (e: any) => {
      const windowInnerWidth = e.target.innerWidth;
      setIsShowControls(false);
      if (windowInnerWidth > 767.98) {
        setIsShowControls(false);
      }
    });
    window.addEventListener("click", () => {
      setIsShowControls(false);
    });
  }, []);
  return (
    <div className="task-container relative flex h-fit w-full flex-1 items-center justify-between gap-2 rounded-sm border-2 border-gray-200 p-4">
      <p
        className={`task-content w-full hyphens-auto text-wrap break-words ${isDone && "pointer-events-none flex-shrink text-gray-400 line-through"}`}
      >
        {task}
      </p>

      <div
        className={`md:relative md:z-10 md:flex md:scale-100 md:flex-row md:border-none md:bg-transparent md:p-[initial] ${isShowControls ? "origin-top scale-y-100 bg-white" : "origin-top scale-y-0 transition-none"} button-group absolute right-0 top-0 z-20 flex flex-shrink-0 flex-col items-center justify-between gap-2 rounded-sm border-2 border-sky-600 px-6 py-8 duration-300`}
      >
        {isDone && !isUpdate && (
          <Button intent="undone" onClick={() => _onUndoneTask(id)}>
            UnDone
          </Button>
        )}
        {!isDone && !isUpdate && (
          <Button intent="done" onClick={() => _onDoneTask(id)}>
            Done
          </Button>
        )}
        {/* {!isUpdate && !isDone && <Button intent="edit">Edit</Button>} */}
        {isUpdate && <Button intent="done">Save</Button>}
        <Button intent="delete" onClick={() => _onRemoveTask(id)}>
          Delete
        </Button>
      </div>
      <button
        className={`flex transition-all duration-300 hover:text-blue-400 md:hidden ${isShowControls ? "z-40 text-blue-400" : "z-10"}`}
        onClick={(e) => _onShowControls(e)}
      >
        <SlOptions />
      </button>
    </div>
  );
};

export default Task;
