import {
  CollectionReference,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const getTaskData = (
  userId: string,
  collectionRef: CollectionReference,
) => {
  const [data, setData] = useState<DocumentData[]>([]);
  useEffect(() => {
    if (userId) {
      const getData = async () => {
        try {
          const unsubscribe = onSnapshot(
            query(collectionRef, orderBy("createdAt", "desc")),
            (docs) => {
              const newData: DocumentData[] = [];
              docs.forEach((doc) => {
                newData.push(doc.data());
              });
              setData(newData);
            },
          );
          return () => unsubscribe();
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    } else {
      setData([]);
    }
  }, [userId]);
  return { data };
};
