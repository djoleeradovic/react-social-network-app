import { React, useState, useRef, useEffect } from "react";
import "./authpage.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  addNewdata,
  getAllData,
  passwordError,
  checkForCookie,
  usernameError,
  matchingError,
} from "../../Helpers/Utils";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [usernameMessage, setusernameMessage] = useState("");
  const [passwordMessage, setpasswordMessage] = useState("");
  const [matchingMessage, setmatchingMessage] = useState("");
  const [loginErrorMessage, setloginErrorMessage] = useState("");
  const [singupErrorMessage, setsingupErrorMessage] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const matching_passwordRef = useRef("");

  const addUser = async (e, username, password) => {
    e.preventDefault();
    if (passwordRef.current.value !== matching_passwordRef.current.value) {
      setpasswordMessage("Passwords doesnt matching");
      setmatchingMessage("Passwords doesnt matching");
      passwordRef.current.value = "";
      matching_passwordRef.current.value = "";
    } else if (
      usernameMessage.length > 0 ||
      passwordMessage.length > 0 ||
      matchingMessage.length > 0
    ) {
      console.log(usernameMessage.length);
      console.log(passwordMessage.length);
      console.log(matchingMessage.length);
      setsingupErrorMessage("Enter a valid data!");
    } else {
      const new_user = {
        username: username.current.value,
        password: password.current.value,
      };
      await addNewdata("users", new_user);
      setIsLogin(true);
    }
  };

  const authUser = async (e, username, password) => {
    e.preventDefault();
    const data = await getAllData("users");

    data.forEach((user) => {
      if (
        user.username === username.current.value &&
        user.password === password.current.value
      ) {
        setCookie("user", user.id, { path: "/" });
        navigate("/home");
      } else {
        setloginErrorMessage(
          "Incorrect username or password! Please try again!"
        );
      }
    });
  };

  useEffect(() => {
    checkForCookie(navigate, cookies.user);
  }, []);

  return (
    <div className="container auth-container">
      {isLogin ? (
        <form className="auth-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            placeholder="Enter username"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Enter password"
          />
          {loginErrorMessage ? <small>{loginErrorMessage}</small> : ""}
          <button
            className="btn"
            onClick={(e) => authUser(e, usernameRef, passwordRef)}
          >
            Login
          </button>
          <span onClick={() => setIsLogin(false)}>Sing Up</span>
        </form>
      ) : (
        <form className="auth-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            onChange={(e) => usernameError(setusernameMessage, e.target.value)}
            placeholder="Enter username"
          />
          {usernameMessage ? <small>{usernameMessage}</small> : ""}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            onChange={(e) => passwordError(setpasswordMessage, e.target.value)}
            placeholder="Enter password"
          />
          {passwordMessage ? <small>{passwordMessage}</small> : ""}
          <label htmlFor="repeat_password">Repeat Password</label>
          <input
            type="password"
            id="repeat_password"
            placeholder="Repeat password"
            ref={matching_passwordRef}
            onChange={(e) =>
              matchingError(
                setmatchingMessage,
                e.target.value,
                passwordRef.current.value
              )
            }
          />
          {matchingMessage ? <small>{matchingMessage}</small> : ""}
          <button
            className="btn"
            onClick={(e) => addUser(e, usernameRef, passwordRef)}
          >
            Sing Up
          </button>
          {singupErrorMessage ? (
            <small className="singup-error">{singupErrorMessage}</small>
          ) : (
            ""
          )}
          <span onClick={() => setIsLogin(true)}>Login</span>
        </form>
      )}
    </div>
  );
};

export default AuthPage;
