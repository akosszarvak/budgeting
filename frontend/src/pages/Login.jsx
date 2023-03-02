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
    <>
      <section>
        <h1>
          <FaUser />
          Login Page
        </h1>{" "}
        <p>Enter your credentials</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            ref={userRef}
            value={email}
            placeholder="enter your email"
            onChange={onChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="enter your password"
            onChange={onChange}
          />

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
