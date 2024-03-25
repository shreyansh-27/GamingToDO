import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Checklist from "./Checklist";
import { userContext } from "../UserContext";
import InputBox from "./InputBox";
import Header from "./Header";
// import { post } from "../../../api/routes/postRoutes";

export default function TodoBox() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(userContext);
  const [boxVisibility, setBoxVisibility] = useState(false);
  const demoTask = [
    {
      content: "First",
    },
    {
      content: "Second",
    },
  ];

  useEffect(() => {
    setLoading(true);
    if (user && user._id) {
      axios
        .get(`http://localhost:3000/posts/${user._id}`)
        .then((res) => {
          console.log("data: " + res.data);
          if (res.data) {
            setPosts(res.data);
            setLoading(false);
          } else {
            // setPosts([{ content: "sad" }]);
            setLoading(false);
          }
        })
        .catch((Err) => {
          console.log(Err);
          setLoading(false);
        });
    }
  }, [user]);

  function handleVisibility() {
    setBoxVisibility(false);
  }

  function onSubmit(task, selectedDifficulty) {
    console.log(task, selectedDifficulty);
    axios
      .patch(`http://localhost:3000/posts/${user._id}`, {
        content: task,
        difficulty: selectedDifficulty,
      })
      .then((res) => {
        console.log(res);
        setPosts([res.data, ...posts]);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
      });
  }

  return (
    <div>
      {loading ? (
        <div>
          <Header />
          "Loading"
        </div>
      ) : (
        <div>
          {posts.length > 0 && <Header posts={posts} />}
          <div className="relative flex w-screen justify-center mt-4">
            <div
              className="border border-gray-300 bg-white absolute flex items-center w-10 h-10 justify-center top-[-10px]"
              onClick={() => {
                setBoxVisibility(true);
              }}
            >
              +
            </div>
            <div className="border border-gray-300 w-[400px] rounded-md m-2 p-2">
              <h1>TO DO</h1>
              {boxVisibility && (
                <InputBox
                  onSubmit={(task, selectedDifficulty) => {
                    handleVisibility();
                    onSubmit(task, selectedDifficulty);
                  }}
                  handleBGClick={() => {
                    handleVisibility();
                  }}
                />
              )}
              <Checklist posts={posts} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
