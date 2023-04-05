import { useRef, useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useSignup } from "../hooks/useSignup";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

function Register() {
  const userRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { signup, error, isLoading, success } = useSignup();
  const { name, email, password, password2 } = formData;
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
    // userRef.current.focus();
  }, [error, success]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "" || password2 === "") {
      toast.error("Please fill out the form");
    } else if (password !== password2 || !password) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      try {
        await signup(userData);
      } catch (err) {
        if (!err?.response) {
          toast.error("No server response");
        } else {
          toast.error("Registration failed");
        }
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
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Register</h1>{" "}
      <p className="text-md text-gray-700">Please create an account</p>
      <form className="mt-6" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="mb-2 block text-left  text-gray-700">Name</label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            id="name"
            name="name"
            ref={userRef}
            value={name}
            placeholder="enter your name"
            onChange={onChange}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-left  text-gray-700">E-mail</label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="enter your e-mail"
            onChange={onChange}
          />{" "}
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
          />{" "}
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-left  text-gray-700">
            Confirm Password
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="password"
            id="password2"
            name="password2"
            value={password2}
            placeholder="confirm your password"
            onChange={onChange}
          />{" "}
        </div>
        <div className="p-4">
          <button
            disabled={isLoading}
            type="submit"
            className="rounded-lg bg-blue-500 p-2 text-white shadow-md hover:cursor-pointer hover:bg-blue-800 hover:shadow-none"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
