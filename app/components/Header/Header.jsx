"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Modal from "../../ui/Modal/Modal";
import { clearToken } from "../../store/authSlice";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { removeTokenFromLocalStorage } from "../../utils/authHelpers";
import "./Header.css";

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();

  const goToProfile = () => {
    router.push("/profile");
  };
  const goToHome = () => {
    router.push("/");
  };
  const handelLogout = () => {
    removeTokenFromLocalStorage();
    dispatch(clearToken());
    router.push("/");
  };
  return (
    <header>
      <h1 onClick={goToHome} className="homeLink">
        <span>⚛️</span>Blogging Platform
      </h1>
      {!isAuthenticated ? (
        <div>
          <Modal>
            <Modal.Open opens={"SignIn"}>
              <button>Sign In</button>
            </Modal.Open>
            <Modal.Window name={"SignIn"}>
              <div>
                <SignInForm />
              </div>
            </Modal.Window>
            <Modal.Open opens={"SignUp"}>
              <button>Sign Up</button>
            </Modal.Open>
            <Modal.Window name={"SignUp"}>
              <div>
                <SignUpForm />
              </div>
            </Modal.Window>
          </Modal>
        </div>
      ) : (
        <div>
          <button onClick={goToProfile}>Profile</button>
          <button onClick={handelLogout}>Log out</button>
        </div>
      )}
    </header>
  );
}
