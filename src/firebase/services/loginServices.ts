import {
  FacebookAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../config";
import { Timestamp, doc, setDoc } from "firebase/firestore";

const provider = new FacebookAuthProvider();
export const handleLoginFacebook = async (collectionName: string) => {
  try {
    const response = await signInWithPopup(auth, provider);
    if (response) {
      const { user } = response || {};
      const additionalUserInfo = getAdditionalUserInfo(response);
      // Add user to database
      if (!additionalUserInfo?.isNewUser) return;
      try {
        const providedData = user?.providerData?.[0];
        const docRef = await setDoc(
          doc(db, collectionName, providedData?.uid),
          {
            ...providedData,
            createdAt: Timestamp.now(),
          },
        );
        console.log(docRef);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
