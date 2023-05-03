const API_KEY = process.env.REACT_APP_API_KEY;

export const getDataByID = async (path, id) => {
  let res = await fetch(`${API_KEY}/${path}/${id} `);
  let data = await res.json();
  return data;
};

export const getAllData = async (path) => {
  let res = await fetch(`${API_KEY}/${path}`);
  let data = await res.json();
  return data;
};

export const deleteDataByID = async (path, id) => {
  await fetch(`${API_KEY}/${path}/${id}`, {
    method: "DELETE",
  });
};

export const deleteUserPosts = async (user_id) => {
  const data = await getAllData("posts");

  data.forEach((post) => {
    if (post.user_id === user_id) {
      fetch(`${API_KEY}/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  });
};

export const addNewdata = async (path, data) => {
  await fetch(`${API_KEY}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const setDataToID = (path, id, data) => {
  fetch(`${API_KEY}/${path}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const checkForCookie = (navigator, cookie) => {
  if (cookie) {
    navigator("/home");
  } else {
    navigator("/");
  }
};

export const usernameError = async (setusernameMessage, username) => {
  const data = await getAllData("users");

  const isUsernameTaken = data.some((user) => user.username === username);
  if (username.trim() === "") {
    setusernameMessage("Field cannot be empty");
  } else if (isUsernameTaken) {
    setusernameMessage("Username is taken");
  } else {
    setusernameMessage("");
  }
};

export const passwordError = (setpasswordMessage, password) => {
  if (password.trim() === "") {
    setpasswordMessage("Field cannot be empty");
  } else if (password.length < 8) {
    setpasswordMessage("Field must have min 8 characters");
  } else {
    setpasswordMessage("");
  }
};

export const matchingError = (
  setmatchingError,
  matching_password,
  password
) => {
  if (matching_password.trim() === "") {
    setmatchingError("Field cannot be empty");
  } else if (matching_password !== password) {
    setmatchingError("Passwords doesnt matching");
  } else {
    setmatchingError("");
  }
};
