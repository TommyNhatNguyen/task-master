import Button from "./Button";
import { useAppContext } from "./context/AppContext";
import { MODAL_TYPES } from "./constant/modal";
import { auth } from "./firebase/config";
import { signOut } from "firebase/auth";

type ModalTypes = keyof typeof MODAL_TYPES | "";

const Header = () => {
  const { hanldeShowModal, user } = useAppContext();
  const {
    uid: userId,
    displayName: username,
    email: userEmail,
    photoURL,
  } = user?.providerData?.[0] || {};
  const _onHandleShowModal = (modalType: ModalTypes) => {
    hanldeShowModal(modalType);
  };
  const handleSignout = async () => {
    await signOut(auth);
  };
  return (
    <div className="relative top-0 flex h-14 w-full items-center justify-between p-4">
      <a className="z-10 flex h-10 w-10">
        <img className="object-center" src="./assets/logo.png" alt="logo" />
      </a>
      {user ? (
        <div id={userId} className="z-10 flex items-center gap-1">
          <div className="flex items-center gap-1">
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <img src={photoURL} alt="user photo" />
            </div>
            <div>
              <div className="text-xs font-semibold">{username}</div>
              <div className="text-xs font-semibold">{userEmail}</div>
            </div>
          </div>
          <Button onClick={handleSignout}>Exit</Button>
        </div>
      ) : (
        <div className="z-10">
          <Button
            className="bg-[initial] hover:bg-[initial] hover:text-sky-700"
            onClick={() => _onHandleShowModal(MODAL_TYPES.login)}
          >
            Login
          </Button>
          <span className="pointer-events-none">/</span>
          <Button className="bg-[initial] hover:bg-[initial] hover:text-sky-700">
            Register
          </Button>
        </div>
      )}
      <div className="absolute left-0 top-0 z-0 h-full w-full bg-sky-200/60 blur-sm"></div>
    </div>
  );
};

export default Header;
