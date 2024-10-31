/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { getTokenFromLocalStorage } from "../utils/authHelpers";
import UserPosts from "../components/UserPosts/UserPosts";
export default function page() {
  const isAuth = getTokenFromLocalStorage();

  useEffect(() => {
    if (!isAuth) {
      return redirect("/");
    }
  }, [isAuth]);
  return (
    <div>
      <UserPosts />
    </div>
  );
}
