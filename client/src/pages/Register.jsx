import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onSubmit() {
    axios
      .post("http://localhost:3000/auth/register", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        alert("Registration Successful!");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <h1>Login</h1>
      <div className="flex flex-col border border-gray-300 rounded-md p-2 m-2 w-[300px] h-[400px]">
        <label htmlFor="">Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="">Password</label>
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className="border border-gray-300 rounded-md"
          onClick={() => {
            onSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
