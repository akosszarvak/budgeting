import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const userRef = useRef();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, error, isLoading, success } = useLogin();
  const { email, password } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
      console.log("success");
      navigate("/");
    }
  }, [error, success]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please fill out the form");
    }
    const userData = {
      email,
      password,
    };

    try {
      await login(userData);
    } catch (err) {
      if (!err?.response) {
        toast.error("No server response");
      } else {
        toast.error("Login failed");
      }
    }
  };
  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <div className="mx-auto mt-4  max-w-md border-2 border-gray-300 bg-white px-6 py-7 shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Please, login</h1>
      <p className="text-md text-gray-700">Enter your credentials</p>

      <form className="mt-6" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="mb-2 block text-left  text-gray-700">Email</label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="email"
            id="email"
            name="email"
            ref={userRef}
            value={email}
            placeholder="enter your email"
            onChange={onChange}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-left  text-gray-700">
            Password
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="enter your password"
            onChange={onChange}
          />
        </div>
        <div className="p-4">
          <button
            disabled={isLoading}
            type="submit"
            className=" rounded-md bg-red-600 py-1 px-3 text-white shadow-lg hover:bg-red-900 hover:shadow-none"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
