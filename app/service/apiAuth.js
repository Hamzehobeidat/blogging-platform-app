import axios from "axios";
import { LOCAL_URL } from "../utils/constant";
export const signUp = async (userData) => {
  const { data } = await axios.post(`${LOCAL_URL}/authentication/signup`, {
    ...userData,
  });
  console.log("🚀 ~ signUp ~ data:", data);
  return data;
};

export const signIn = async (userData) => {
  const { data } = await axios.post(`${LOCAL_URL}/authentication/signin`, {
    ...userData,
  });
  return data;
};
