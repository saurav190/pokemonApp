import React from "react";
import InputControl from "../components/InputControl";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginInfo } from "../redux/features/userAuth/userAuthSlice";
import { AES, enc } from "crypto-js";
import img1 from "../assets/image/1305158.jpeg"
import { Link, useNavigate } from 'react-router-dom';
interface FormValues {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const existingUsers = JSON.parse(
        localStorage.getItem("usersData") || "[]"
      ) as FormValues[];
      const user = existingUsers.find((item) => item.email === values.email);
      console.log(user);


      if (user) {
        const decryptedPassword = decrypt(user.password);
        if (decryptedPassword === values.password) {
          const loginUser = {
            email: values.email,
            password: encrypt(values.password),
          };
          dispatch(loginInfo(loginUser));
          localStorage.setItem("loginuser", JSON.stringify(loginUser));
          navigate('/');
        } else {
          formik.setFieldError("password", "Password does not match");
        }
      } else {
        formik.setFieldError("email", "User not found");
      }
    },
  });
  const encrypt = (data: string) => {
    return AES.encrypt(JSON.stringify(data), "secret_key").toString();
  };

  const decrypt = (encryptedData: string) => {
    const bytes = AES.decrypt(encryptedData, "secret_key");
    const decryptedData = bytes.toString(enc.Utf8);
    return JSON.parse(decryptedData);
  };
  return (
    <div className=" h-screen flex">
      <div className="w-1/2 h-full relative">
        <img src={img1} alt="" className="w-full h-full" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-50"></div>
      </div>
      <div className="w-1/2 h-full flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 px-20 rounded-lg">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <InputControl
              inputname="email"
              type="email"
              labelname="Email"
              placeholder="Please enter your email"
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
              placeholder="Enter your Password here"

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

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full"
            >
              Log In
            </button>
          </form>

          <Link to='/signup' className="mt-4 text-center text-gray-600">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
