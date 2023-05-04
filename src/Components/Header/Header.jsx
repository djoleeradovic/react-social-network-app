import { React, useState, useEffect, useRef } from "react";
import "./header.css";
import Logo from "../../assets/logo.png";
import { AiFillCaretDown } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import {
  getDataByID,
  getAllData,
  setDataToID,
  deleteDataByID,
  passwordError,
  usernameError,
  deleteUserPosts,
} from "../../Helpers/Utils";

const Header = () => {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [usernameMessage, setusernameMessage] = useState("");
  const [passwordMessage, setpasswordMessage] = useState("");
  const [editErrorMessage, seteditErrorMessage] = useState("");
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();

  const userCookie = cookies.user;

  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const getUser = async () => {
    const data = await getDataByID("users", cookies.user);
    setUsername(data.username);
    setPassword(data.password);
  };

  const editUser = async (e, username, password) => {
    e.preventDefault();
    if (usernameMessage.length > 0 || passwordMessage.length > 0) {
      seteditErrorMessage("Enter a valid data!");
    } else {
      const editedUser = {
        username: username.current.value,
        password: password.current.value,
      };

      setUsername(username.current.value);
      setPassword(password.current.value);

      await setDataToID("users", userCookie, editedUser);

      const data = await getAllData("posts");

      const new_author = {
        author: username.current.value,
      };

      await data.forEach((post) => {
        if (post.user_id === userCookie) {
          setDataToID("posts", post.id, new_author);
        }
      });

      setShowModal(false);
      setShowSettingsMenu(false);
    }
  };

  const deleteUser = (e) => {
    e.preventDefault();
    deleteDataByID("users", userCookie);
    deleteUserPosts(userCookie);
    navigate("/");
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const logOut = () => {
    navigate("/");
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  useEffect(() => {
    if (cookies.user) {
      getUser();
    }
  }, [username]);

  return (
    <>
      <header>
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="profile">
          <div className="profile-photo">
            <img
              src="https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture.jpg"
              alt="s"
            />
          </div>
          <div
            className="info"
            onClick={() => setShowSettingsMenu((prev) => !prev)}
          >
            <h3>{username}</h3>
            <AiFillCaretDown />
          </div>
          {showSettingsMenu ? (
            <div className="profile-settings">
              <button className="btn" onClick={() => setShowModal(true)}>
                Edit Profile
              </button>
              <button className="btn" onClick={() => logOut()}>
                Log Out
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </header>
      {showModal ? (
        <dialog className="edit-modal">
          <form>
            <FaRegWindowClose onClick={() => setShowModal(false)} />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              defaultValue={username}
              placeholder="Enter username"
              onChange={(e) =>
                usernameError(setusernameMessage, e.target.value)
              }
            />
            {usernameMessage ? <small>{usernameMessage}</small> : ""}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              defaultValue={password}
              placeholder="Enter password"
              onChange={(e) =>
                passwordError(setpasswordMessage, e.target.value)
              }
            />
            {passwordMessage ? <small>{passwordMessage}</small> : ""}
            <div className="modal-btns">
              <button
                className="btn"
                onClick={(e) => editUser(e, usernameRef, passwordRef)}
              >
                Save
              </button>
              <button className="btn danger" onClick={(e) => deleteUser(e)}>
                Delete
              </button>
            </div>
            {editErrorMessage ? (
              <small className="edit-error">{editErrorMessage}</small>
            ) : (
              ""
            )}
          </form>
        </dialog>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
