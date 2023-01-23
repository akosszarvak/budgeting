import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
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
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="enter your email"
            onChange={onChange}
          />
          <input
            type="text"
            id="password1"
            name="password1"
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
