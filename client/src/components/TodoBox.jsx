import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Checklist from "./Checklist";
import { userContext } from "../UserContext";
import InputBox from "./InputBox";
import Header from "./Header";
import Notes from "./Notes";
import "../App.css";
import AddButton from "./AddButton";

export default function TodoBox() {
  const [posts, setPosts] = useState([]);
  const [postChange, setPostChange] = useState(null);
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
  }, [user, postChange]);

  const updatePosts = (updatedPost) => {
    setPostChange(updatedPost);
    // console.log(updatedPost);
    // setPosts(updatedPost);
  };

  function handleVisibility() {
    setBoxVisibility(false);
  }

  function onCheck(id, diff) {
    console.log(id, diff);
    axios
      .delete(`http://localhost:3000/posts/${user._id}/${id}/${diff}`)
      .then((res) => {
        // console.log(res, selectedDifficulty);
        const result = posts.filter((post) => post._id !== id);
        setPosts(result);
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-b from-black to-[#0099C4] pixelFont">
      {loading ? (
        <div>
          <Header />
          "Loading"
        </div>
      ) : (
        <div className="flex flex-col w-full h-screen text-white">
          {posts && <Header posts={posts} />}
          <div className="flex justify-between mt-2">
            <Notes />
            <div className="relative flex w-1/3 justify-center mt-4">
              <AddButton
                onClickFunction={() => {
                  setBoxVisibility(true);
                }}
              />
              <div
                className={`border border-gray-300 w-[400px] h-[500px] rounded-md m-2 pt-6 p-2`}
              >
                <h1 className="absolute -top-4">TO DO</h1>
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
                <div
                  className={`h-full element ${
                    posts.length > 9 && "overflow-y-scroll"
                  }`}
                >
                  {posts.map((post) => {
                    return (
                      <Checklist
                        content={post.content}
                        difficulty={post.difficulty}
                        id={post._id}
                        updatePosts={updatePosts}
                        onCheck={() => {
                          // console.log(diff);
                          onCheck(post._id, post.difficulty);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-1/3"></div>
          </div>
        </div>
      )}
    </div>
  );
}
