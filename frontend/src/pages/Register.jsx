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
    <>
      <section>
        <h1>
          <FaUser />
          Register
        </h1>{" "}
        <p>Please create an account</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            ref={userRef}
            value={name}
            placeholder=" enter your name"
            onChange={onChange}
          />
          <input
            type="email"
            id="email"
            name="email"
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
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            placeholder="confirm your password"
            onChange={onChange}
          />
          <div>
            <button disabled={isLoading} type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
