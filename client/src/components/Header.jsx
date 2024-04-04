import { useContext, useEffect, useState } from "react";
import { userContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import avatar from "../assets/avatar.png";

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
    <div className="flex justify-between p-2 mt-1 mr-1 w-full h-16 bg-[black] text-white">
      <div className="flex w-1/2 gap-2">
        <h1>Trackify</h1>

        <div className="flex w-full gap-1">
          <h2>O</h2>
          <div className="flex rounded-sm items-center border w-full mt-1 h-1/2 bg-[#0099C4] justify-center">
            <h2 className="">{!!user && user.username}</h2>
          </div>

          <div className="flex w-full h-1/2 gap-1">
            <h2>Lv{userInfo.level}</h2>
            <ProgressBar userInfo={userInfo} />
            {/* <h2>Experience: {userInfo.exp}</h2> */}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-14 w-1/3"></div>

      <div className="flex justify-end gap-3 items-start w-1/2 ">
        {/* <h2 className="border border-gray-300">profile</h2> */}
        <h2 className="border bg-[#0099C4] rounded-sm px-1 py-[1px]">
          setting
        </h2>
        <h2
          className="border bg-[#0099C4] rounded-sm px-1 py-[1px]"
          onClick={() => {
            handleOnClick();
          }}
        >
          logout
        </h2>
        <img src={avatar} alt="" className="aspect-square h-full" />
      </div>
    </div>
  );
}
