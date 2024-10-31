import axios from "axios";
import { LOCAL_URL } from "../utils/constant";
import { getTokenFromLocalStorage } from "../utils/authHelpers";
export const getPosts = async () => {
  try {
    const { data } = await axios.get(`${LOCAL_URL}/posts`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getUserPostsByUserId = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const { data } = await axios.get(`${LOCAL_URL}/posts/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log("Error fetching posts:", error);
  }
};

export const createPost = async (postData) => {
  const token = getTokenFromLocalStorage();
  try {
    const { data } = await axios.post(`${LOCAL_URL}/posts`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (postId, postData) => {
  const token = getTokenFromLocalStorage();
  try {
    const { data } = await axios.patch(
      `${LOCAL_URL}/posts/${postId}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId) => {
  const token = getTokenFromLocalStorage();
  try {
    const { data } = await axios.delete(`${LOCAL_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
