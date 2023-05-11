import { React, useState, useEffect } from "react";
import "./post.css";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useCookies } from "react-cookie";
import {
  getDataByID,
  setDataToID,
  deleteDataByID,
  getAllData,
} from "../../Helpers/Utils";

const Post = ({
  id,
  user_id,
  content,
  likes,
  author,
  setPosts,
  postLikesDB,
  setPostLikesDB,
}) => {
  const [isLiked, setIsLiked] = useState([]);
  const [cookies] = useCookies(["user"]);

  const currentUser = cookies.user === user_id;

  useEffect(() => {
    const getLikedPosts = async () => {
      const _ = await getDataByID("users", cookies.user);
      setIsLiked(_.likedPosts);
    };
    getLikedPosts();
  }, []);

  const setLike = async (e, postID) => {
    e.preventDefault();
    // Set post to users liked posts
    const liked = await getDataByID("users", cookies.user);

    const likedPosts = [...liked.likedPosts];

    if (!likedPosts.includes(postID)) {
      likedPosts.push(postID);
    }
    setIsLiked(likedPosts);

    await setDataToID("users", cookies.user, { likedPosts });

    // Update the like on post
    const postLikes = {
      likes: likes + 1,
    };
    const newPostLikesDB = { ...postLikesDB };
    newPostLikesDB[postID] = postLikesDB[postID] + 1;
    setPostLikesDB(newPostLikesDB);
    await setDataToID("posts", postID, postLikes);
  };

  const setDislike = async (e, postID) => {
    e.preventDefault();
    // Set post to users liked posts
    const liked = await getDataByID("users", cookies.user);

    const likedPosts = [...liked.likedPosts];

    if (likedPosts.includes(postID)) {
      likedPosts.pop(postID);
    }
    setIsLiked(likedPosts);
    await setDataToID("users", cookies.user, { likedPosts });

    // Update the like on post
    const postLikes = {
      likes: likes - 1,
    };
    const newPostLikesDB = { ...postLikesDB };
    newPostLikesDB[postID] = postLikesDB[postID] - 1;
    setPostLikesDB(newPostLikesDB);
    await setDataToID("posts", postID, postLikes);
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
          {isLiked?.includes(id) ? (
            <AiOutlineDislike
              className="post-btn dislike"
              onClick={(e) => {
                setDislike(e, id);
              }}
            />
          ) : (
            <AiOutlineLike
              className="post-btn like"
              onClick={(e) => {
                setLike(e, id);
              }}
            />
          )}
          <span>{postLikesDB[id]}</span>
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
