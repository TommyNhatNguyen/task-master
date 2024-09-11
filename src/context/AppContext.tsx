import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { MODAL_TYPES } from "../constant/modal";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import Task from "../Task";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { getTaskData } from "../firebase/services/taskService";

type ModalTypes = keyof typeof MODAL_TYPES | "";

const AppContext = createContext<Partial<any>>({});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [modalShow, setModalShow] = useState<ModalTypes>("");
  const [user, setUsers] = useState<User | string>("");
  const hanldeShowModal = (modalType: ModalTypes): void => {
    setModalShow(modalType);
  };
  const hanldeCloseModal = (): void => {
    setModalShow("");
  };
  const { uid: userId } = user?.providerData?.[0] || {};
  const tasksCollectionRef = collection(db, `users/${userId}/tasks`);
  const { data: tasks } = getTaskData(userId, tasksCollectionRef);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsers(user);
      } else {
        setUsers("");
      }
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (user) {
      hanldeCloseModal();
    }
  }, [user]);
  return (
    <AppContext.Provider
      value={{
        hanldeCloseModal,
        hanldeShowModal,
        modalShow,
        user,
        tasks,
        tasksCollectionRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

export const useAppContext = () => useContext(AppContext);
