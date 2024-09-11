import {
  CloseOutlined,
  FacebookFilled,
  GoogleOutlined,
} from "@ant-design/icons";
import Button from "./Button";
import { useAppContext } from "./context/AppContext";
import { handleLoginFacebook } from "./firebase/services/loginServices";

const Modal = () => {
  const { modalShow, hanldeCloseModal } = useAppContext();
  const _onHandleCloseModal = () => {
    hanldeCloseModal();
  };

  const _onLoginFacebook = () => {
    handleLoginFacebook("users");
  };
  return (
    modalShow && (
      <div
        className={`fixed left-0 top-0 z-20 flex h-lvh w-full items-center justify-center ${modalShow ? "bg-gray-800/80" : ""} `}
      >
        {modalShow === "login" && (
          <div className="relative rounded-lg bg-white p-6 shadow-md">
            <div className="text-center text-2xl font-bold">Login</div>
            <div className="mt-4 flex flex-col gap-2">
              <Button
                className="flex items-center gap-1"
                onClick={() => _onLoginFacebook()}
              >
                <FacebookFilled />
                <span>Login with facebook</span>
              </Button>
              <Button className="flex items-center gap-1 bg-neutral-200 text-black hover:bg-neutral-100">
                <GoogleOutlined />
                <span>Login with google</span>
              </Button>
            </div>
            <div
              className="absolute right-2 top-2 cursor-pointer duration-300 hover:opacity-50"
              onClick={_onHandleCloseModal}
            >
              <CloseOutlined />
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Modal;
