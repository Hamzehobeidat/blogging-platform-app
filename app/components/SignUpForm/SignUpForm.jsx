"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { signUp } from "../../service/apiAuth";
import { setToken } from "../../store/authSlice";
import { saveTokenToLocalStorage } from "../../utils/authHelpers";
import "./SignUpForm.css";

export default function SignUpForm() {
  const queryClint = useQueryClient();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    isLoading,
    mutate: signUptUser,
    error,
  } = useMutation({
    mutationFn: ({ data }) => signUp(data),
    onSuccess: () => {
      queryClint.invalidateQueries({
        queryKey: ["signUpUser"],
      });
    },
    onError: (error) => {
      console.error("Sign In Error:", error.message);
    },
  });
  const onSubmit = async (data) => {
    signUptUser(
      { data },
      {
        onSuccess: (response) => {
          dispatch(setToken(response?.accessToken));
          saveTokenToLocalStorage(response?.accessToken);
        },
      },
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="First Name"
        {...register("firstName", { required: true })}
      />
      {errors.firstName && <span>First Name is required</span>}

      <input
        type="text"
        placeholder="Last Name"
        {...register("lastName", { required: true })}
      />
      {errors.lastName && <span>Last Name is required</span>}

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
        Sign Up
      </button>
      {error && <span>{error?.response?.data?.message}</span>}
    </form>
  );
}
