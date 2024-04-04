import axios from "axios";
import { useContext, useEffect, useState } from "react";
import InputBox from "./InputBox";
import { userContext } from "../UserContext";

export default function Checklist(props) {
  const [editing, setEditing] = useState(false);
  const { user } = useContext(userContext);
  const [newContent, setNewContent] = useState(props.content);
  const [newDiff, setNewDiff] = useState(props.difficulty);

  useEffect(() => {
    console.log(props.content);
    setNewContent(props.content);
  }, [props.content]);

  useEffect(() => {
    console.log(props.difficulty);
    setNewDiff(props.difficulty);
  }, [props.difficulty]);

  function onCalick() {
    setEditing(false);
  }

  function onSubmit(task, selectedDifficulty) {
    console.log(selectedDifficulty, task);
    axios
      .patch(`http://localhost:3000/posts/${user._id}/${props.id}`, {
        content: task,
        difficulty: selectedDifficulty,
      })
      .then((res) => {
        console.log(res);
        setNewContent(res.data.content);
        setNewDiff(res.data.difficulty);
        props.updatePosts(res.data);
        setEditing(false);
      })
      .catch((Err) => {
        console.log(Err);
      });
    setNewContent("");
  }

  return (
    <div
      className="flex items-center overflow-hidden border border-white bg-[#0099c4] h-12 rounded-md m-1"
      key={props.id}
    >
      <div
        className={`flex justify-center items-center rounded-md w-12 h-12 relative mr-1 ${
          newDiff === "hard"
            ? "bg-cyan-900"
            : newDiff === "easy"
            ? "bg-cyan-400"
            : "bg-cyan-700"
        }`}
      >
        <input
          type="checkbox"
          name=""
          id=""
          onClick={(res) => {
            if (res.target.checked) {
              props.onCheck(props.id);
            }
          }}
          className="absolute w-6 h-6 mx-2"
          //colors: red:FB5012 yellow:E9DF00 green:08A045
        />
      </div>

      <div>
        {editing && (
          <div>
            <InputBox
              handleBGClick={() => {
                onCalick();
              }}
              onSubmit={(task, selectedDifficulty) => {
                onSubmit(task, selectedDifficulty);
                {
                  console.log(task, selectedDifficulty);
                }
              }}
              newTask={newContent}
              newDifficulty={newDiff}
            />
          </div>
        )}
        <label
          htmlFor=""
          onClick={() => {
            setEditing(true);
            console.log(newContent + " " + newDiff);
          }}
        >
          {newContent}
        </label>
      </div>
    </div>
  );
}
