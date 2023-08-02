import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputControl from "../components/InputControl";
import { useDispatch } from "react-redux";
import { signUpInfo } from "../redux/features/userAuth/userAuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { AES } from "crypto-js";

interface User {
  username: string;
  email: string;
  password: string;
}
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required("Username is required")
        .matches(/^\S*$/, "Username cannot contain spaces")
        .min(4, "Username must be at least 4 characters long"),
      email: yup
        .string()
        .email("Invalid email")
        .required("Email is required")
        .matches(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/g,
          "Invalid email format"
        ),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,|\~`[\]\\[=-]).{8,}$/,
          "Password must contain at least one letter, one number, and one special character"
        ),
      confirm_password: yup
        .string()
        .test("password-match", "Passwords must match", function (value) {
          return this.parent.password === value;
        })
        .required("Confirm_password is required"),
    }),
    onSubmit: (values) => {
      dispatch(signUpInfo(values));
      const existingUsers: User[] = JSON.parse(
        localStorage.getItem("usersData") || "[]"
      );
      const newUser = {
        username: values.username,
        email: values.email,
        password: encrypt(values.password),
        confirm_password: encrypt(values.confirm_password),
      };
      const emailExists = existingUsers.some(
        (user) => user.email === values.email
      );
      if (emailExists) {
        formik.setFieldError("email", "Email already exists");
      } else {
        existingUsers.push(newUser);
        localStorage.setItem("usersData", JSON.stringify(existingUsers));
        dispatch(signUpInfo(values));
        navigate("/signin");
      }
    },
  });
  const encrypt = (data: string) => {
    return AES.encrypt(JSON.stringify(data), "secret_key").toString();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500 ">
      <div className="bg-white rounded-lg w-[500px]  shadow-lg">
        <form onSubmit={formik.handleSubmit} className="w-full p-6">
          <InputControl
            inputname="username"
            type="text"
            labelname="Username"
            placeholder="Enter your username"
            inputclass={
              formik.touched.username && formik.errors.username
                ? "border-red-500"
                : "border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
            }
            onchange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500">{formik.errors.username}</p>
          )}

          <InputControl
            inputname="email"
            type="email"
            labelname="Email"
            placeholder="Enter your email here"
            inputclass={
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            }
            onchange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}

          <InputControl
            inputname="password"
            type="password"
            labelname="Password"
            placeholder="Enter your password here"
            inputclass={
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            }
            onchange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}

          <InputControl
            inputname="confirm_password"
            type="password"
            labelname="Confirm Password"
            placeholder="Enter your password"
            inputclass={
              formik.touched.confirm_password && formik.errors.confirm_password
                ? "border-red-500"
                : "border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            }
            onchange={formik.handleChange}
            value={formik.values.confirm_password}
          />
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              <p className="text-red-500">{formik.errors.confirm_password}</p>
            )}

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full"
          >
            Sign Up
          </button>
          <Link to="/" className="mt-4 text-center text-gray-600">
            Already Have an Account? Login Here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
