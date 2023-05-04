import { React, useState } from "react";
import "./post.css";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { setDataToID, deleteDataByID, getAllData } from "../../Helpers/Utils";

const Post = ({ id, user_id, content, likes, author, setPosts }) => {
  const [liked, setLiked] = useState(false);
  const [cookies] = useCookies(["user"]);

  const currentUser = cookies.user === user_id;

  const setLike = (e) => {
    e.preventDefault();
    setLiked(true);

    const data = {
      likes: likes + 1,
    };

    setDataToID("posts", id, data);
  };

  const setDislike = (e) => {
    e.preventDefault();
    setLiked(false);

    const data = {
      likes: likes - 1,
    };

    setDataToID("posts", id, data);
  };

  const deletePost = async (e, id) => {
    e.preventDefault();
    await deleteDataByID("posts", id);

    const updatedData = await getAllData("posts");
    setPosts(updatedData);
  };

  return (
    <article className="post" key={id}>
      <h2 className="post-content">{content}</h2>
      <footer className="post-footer">
        <small className="post-author">Author: {author}</small>
        <div className="post-likes">
          {liked ? (
            <AiOutlineDislike
              className="post-btn dislike"
              onClick={(e) => {
                setDislike(e);
              }}
            />
          ) : (
            <AiOutlineLike
              className="post-btn like"
              onClick={(e) => {
                setLike(e);
              }}
            />
          )}
          <span>{likes}</span>
          {currentUser ? (
            <button className="btn danger" onClick={(e) => deletePost(e, id)}>
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </footer>
    </article>
  );
};

export default Post;
