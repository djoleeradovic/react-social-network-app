import { React, useRef } from "react";
import "./newpost.css";
import { useCookies } from "react-cookie";
import { addNewdata, getAllData, getDataByID } from "../../Helpers/Utils";

const NewPost = ({ setPosts }) => {
  const contentRef = useRef("");
  const [cookies] = useCookies(["user"]);

  const addPost = async (e, content) => {
    e.preventDefault();
    if (content.current.value.length === 0) {
      alert("Cannot add empty post!");
    } else {
      const data = await getDataByID("users", cookies.user);
      const author = await data.username;

      const postData = {
        user_id: cookies.user,
        content: content.current.value,
        likes: 0,
        author: author,
      };

      await addNewdata("posts", postData);

      content.current.value = "";
      const updatedData = await getAllData("posts");
      setPosts(updatedData);
    }
  };
  return (
    <form className="post-form">
      <textarea
        ref={contentRef}
        defaultValue=""
        placeholder="Type something"
      ></textarea>
      <button className="btn" onClick={(e) => addPost(e, contentRef)}>
        Publish
      </button>
    </form>
  );
};

export default NewPost;
