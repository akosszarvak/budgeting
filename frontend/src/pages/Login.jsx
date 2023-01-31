import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authHelpers } from "../api/axios";

function Login() {
  const userRef = useRef();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    try {
      console.log(userData);
      await authHelpers.login(userData);
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        toast.error("No server response");
      } else {
        toast.error("Login failed");
      }
    }
  };
  return (
    <>
      <section>
        <h1>
          <FaUser />
          Login
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
