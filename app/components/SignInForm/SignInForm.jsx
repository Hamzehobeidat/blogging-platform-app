"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/authSlice";
import { saveTokenToLocalStorage } from "../../utils/authHelpers";

import { useForm } from "react-hook-form";
import { signIn } from "../../service/apiAuth";
import "./SignInForm.css";

export default function SignInForm() {
  const queryClint = useQueryClient();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, mutate: signIntUser } = useMutation({
    mutationFn: ({ data }) => signIn(data),
    onSuccess: () => {
      queryClint.invalidateQueries({
        queryKey: ["signInUser"],
      });
    },
  });

  const onSubmit = async (data) => {
    signIntUser(
      { data },
      {
        onSuccess: (response) => {
          dispatch(setToken(response?.accessToken));
          saveTokenToLocalStorage(response?.accessToken);
        },
        onError: (error) => {
          console.error("Sign In Error:", error.message);
        },
      },
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
      />
      {errors.email && <span>Email is required</span>}

      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      {errors.password && <span>Password is required</span>}

      <button type="submit" disabled={isLoading}>
        Sign In
      </button>
    </form>
  );
}
