import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import Header from "./Header";
import Modal from "./Modal";
import { useAppContext } from "./context/AppContext";
import {
  Timestamp,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Task from "./Task";

/**
 Features: 
 - Add task 
 - Remove task
 - Update task
 Components:
 - Add task form component
 - Task component
 - Undone list component
 - Done list component
 */

const MAX_CHARACTER = 70;

type Task = {
  isDone: boolean;
  task: string;
};

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputTask, setInputTask] = useState<Task>({
    task: "",
    isDone: false,
  });
  const characterCount: number = inputTask.task.length;
  const { tasks, tasksCollectionRef } = useAppContext();
  const isMaxCharacterCount: boolean = characterCount === MAX_CHARACTER;

  const _addTask = async (task: Task): Promise<void> => {
    const newDocRef = doc(tasksCollectionRef);
    await setDoc(
      newDocRef,
      {
        ...task,
        createdAt: Timestamp.now(),
        id: newDocRef.id,
      },
      { merge: true },
    );
  };

  const handleDoneTask = async (taskId: string): Promise<void> => {
    const newDocRef = doc(tasksCollectionRef, taskId);
    await updateDoc(newDocRef, {
      isDone: true,
    });
  };
  const handleUndoneTask = async (taskId: string): Promise<void> => {
    const newDocRef = doc(tasksCollectionRef, taskId);
    await updateDoc(newDocRef, {
      isDone: false,
    });
  };
  const handleRemoveTask = async (taskId: string): Promise<void> => {
    const newDocRef = doc(tasksCollectionRef, taskId);
    await deleteDoc(newDocRef);
  };

  const _onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length <= MAX_CHARACTER) {
      setInputTask((prev) => {
        return {
          ...prev,
          task: e.target.value,
        };
      });
    }
  };
  const _onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputTask.task.length > 0) {
      _addTask(inputTask);
    }
  };
  return (
    <main className="bg-[url('src/assets/background.jpg')]">
      <Header />
      <div className="m-auto flex h-lvh w-lvw items-center justify-center">
        <div className="container max-w-[750px] rounded-xl border-2 border-sky-400 bg-gradient-to-tl from-sky-300/50 to-white p-6 px-6 py-4">
          <div className="content flex flex-col items-center justify-between text-center">
            <img
              src="src/assets/logo.png"
              alt="logo"
              className="h-24 w-24 object-cover object-center"
            />
            <h1 className="font-2xl mt-2 text-xl text-sky-700">TaskMaster</h1>
            <p className="font-medium">Conquer Your Day, One Task at a Time</p>
          </div>
          <form
            action="#"
            onSubmit={(e) => _onSubmit(e)}
            className="mt-4 flex h-8 w-full flex-1 items-center justify-between gap-4"
          >
            <div className="input-group relative flex h-full w-full items-center overflow-hidden rounded-xl border-2 border-sky-400">
              <input
                type="text"
                placeholder="Add to task..."
                onChange={(e) => _onChange(e)}
                value={inputTask.task}
                className={`placeholder:font-regular h-full w-full px-2 py-4 shadow-inner outline-none transition-all duration-300 placeholder:font-[rr] placeholder:text-black focus:ring-2 focus:ring-sky-700`}
                ref={inputRef}
              />
              <span className="absolute right-4 top-[55%] hidden -translate-y-[50%] text-xs md:flex">
                {characterCount}/{MAX_CHARACTER}
              </span>
            </div>
            <button
              type="submit"
              className="h-full flex-shrink-0 transition-all duration-300 hover:text-sky-400"
            >
              <BsPlusSquare className="h-full w-full" />
            </button>
          </form>
          {isMaxCharacterCount && (
            <p className="mt-2 hidden text-sm text-red-400 md:flex">
              Max character
            </p>
          )}
          {isMaxCharacterCount && (
            <p className="mt-2 flex text-sm text-red-400 md:hidden">
              {characterCount}/{MAX_CHARACTER} - Max character
            </p>
          )}
          <hr className="my-4" />
          <div className="tasks flex flex-col gap-4">
            {tasks?.length < 1 && <h2>Start your day with a task 👆🏼</h2>}
            {tasks?.map((item: any, index: any) => {
              return (
                <Task
                  key={item.task + index}
                  {...item}
                  handleRemoveTask={handleRemoveTask}
                  handleDoneTask={handleDoneTask}
                  handleUndoneTask={handleUndoneTask}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Modal />
    </main>
  );
}

export default App;
