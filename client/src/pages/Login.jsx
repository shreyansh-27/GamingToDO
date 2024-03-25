import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { userContext } from "../UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  function onSubmit() {
    const userInfo = axios
      .post(
        "http://localhost:3000/auth/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // window.location.href = "/";
        alert("Login Succcess");
        console.log(res.data);
        setUser(res.data);
        navigate("/");
      })
      .catch((Err) => {
        console.log(Err);
      });

    console.log(userInfo);

    console.log("asd");
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
