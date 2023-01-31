import { useRef, useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { name, email, password1, password2 } = formData;

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
            value={name}
            placeholder=" enter your name"
            onChange={onChange}
          />
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
            value={password1}
            placeholder="enter your password"
            onChange={onChange}
          />
          <input
            type="text"
            id="password2"
            name="password2"
            value={password2}
            placeholder="confirm your password"
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

export default Register;
