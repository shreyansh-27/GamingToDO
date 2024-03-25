import { useContext, useEffect, useState } from "react";
import { userContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const { user } = useContext(userContext);
  const [userInfo, setUserInfo] = useState([]);
  const [posts, setPosts] = useState(props.posts);
  const navigate = useNavigate();

  useEffect(() => {
    setPosts(props.posts);
  }, [props.posts]);

  useEffect(() => {
    async function fetchData() {
      if (user && user._id) {
        try {
          const userData = await axios.get(
            `http://localhost:3000/user/${user._id}`
          );

          if (userData) {
            setUserInfo(userData.data);
            console.log(userData);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [user, posts]);

  function handleOnClick() {
    axios
      .post("http://localhost:3000/auth/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((Err) => {
        console.log(Err);
      });
  }

  console.log(user);
  return (
    <div className="flex justify-between p-2 w-full h-16 bg-[yellow]">
      {console.log(posts)}
      <div className="flex border border-gray-300 w-1/2 ">
        <img
          src=""
          alt=""
          className="border border-gray-300 h-[30px] w-[30px]"
        />
        <div className="w-full">
          <div className="border border-gray-300 bg-white">
            <h2>{!!user && user.username}</h2>
          </div>
          <div className="flex justify-between">
            <h2>Level: {userInfo.level}</h2>
            <h2>Experience: {userInfo.exp}</h2>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300 h-14 w-14"></div>

      <div className="flex border border-gray-300 w-1/2 ">
        <h2 className="border border-gray-300">profile</h2>
        <h2 className="border border-gray-300">setting</h2>
        <h2
          className="border border-gray-300"
          onClick={() => {
            handleOnClick();
          }}
        >
          logout
        </h2>
      </div>
    </div>
  );
}
