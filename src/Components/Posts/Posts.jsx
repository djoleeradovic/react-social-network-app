import { React, useState, useEffect } from "react";
import "./posts.css";
import Post from "../Post/Post";
import NewPost from "../NewPost/NewPost";
import { getAllData } from "../../Helpers/Utils";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getAllData("posts");
      setPosts(posts);
    };
    getPosts();
  }, []);

  return (
    <div className="container posts-wrapper">
      <NewPost setPosts={setPosts} />
      {posts
        .sort((a, b) => b.id - a.id)
        .map((post) => (
          <Post
            id={post.id}
            key={post.id}
            user_id={post.user_id}
            content={post.content}
            likes={post.likes}
            author={post.author}
            setPosts={setPosts}
          />
        ))}
    </div>
  );
};

export default Posts;
