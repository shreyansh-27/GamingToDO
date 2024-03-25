import axios from "axios";
import { useContext, useEffect, useState } from "react";
import InputBox from "./InputBox";
import { userContext } from "../UserContext";

export default function Checklist(props) {
  const [editingIndex, setEditingIndex] = useState(null);
  const { user } = useContext(userContext);
  const [postStates, setPostStates] = useState([]);

  useEffect(() => {
    if (props.posts) {
      setPostStates(
        props.posts.map((post) => ({
          id: post._id,
          content: post.content,
          difficulty: post.difficulty,
        }))
      );
    }
  }, [props.posts]);

  useEffect(() => {
    console.log(postStates);
  }, [postStates]);

  function onSubmit(index, task, selectedDifficulty) {
    console.log(selectedDifficulty, task);
    axios
      .patch(
        `http://localhost:3000/posts/${user._id}/${props.posts[index]._id}`,
        {
          content: task,
          difficulty: selectedDifficulty,
        }
      )
      .then((res) => {
        console.log(res);
        const newPostStates = [...postStates];
        newPostStates[index].content = res.data.content;
        newPostStates[index].difficulty = res.data.difficulty;
        setPostStates(newPostStates);
        setEditingIndex(null);
      })
      .catch((Err) => {
        console.log(Err);
      });
    setNewContent("");
  }

  function onCheck(id, newDifficulty) {
    console.log(id, newDifficulty);
    axios
      .delete(`http://localhost:3000/posts/${user._id}/${id}/${newDifficulty}`)
      .then((res) => {
        console.log(res, newDifficulty);
        const result = postStates.filter((post) => post.id !== id);
        setPostStates(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return postStates.map((post, index) => {
    return (
      <div className="flex align-center " key={post.id}>
        <input
          type="checkbox"
          name=""
          id=""
          onClick={(res) => {
            if (res.target.checked) {
              onCheck(post.id, post.difficulty);
            }
          }}
        />
        <div>
          {editingIndex === index ? (
            <div>
              <InputBox
                onSubmit={(task, selectedDifficulty) => {
                  onSubmit(index, task, selectedDifficulty);
                  {
                    console.log(task, selectedDifficulty);
                  }
                }}
                newTask={post.content}
                newDifficulty={post.difficulty}
              />
            </div>
          ) : (
            <label
              htmlFor=""
              onClick={() => {
                setEditingIndex(index);
                console.log(newContent + " " + newDiff);
              }}
            >
              {post.content + " diff: " + post.difficulty}
            </label>
          )}
        </div>
      </div>
    );
  });
}
