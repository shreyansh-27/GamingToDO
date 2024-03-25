import { useEffect, useState } from "react";

export default function InputBox(props) {
  const [task, setTask] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  useEffect(() => {
    console.log(props.newDifficulty, props.newTask);
    setTask(props.newTask);
    console.log(task, selectedDifficulty);
  }, [props.newTask]);

  useEffect(() => {
    setSelectedDifficulty(props.newDifficulty);
    console.log(selectedDifficulty);
  }, [props.newDifficulty]);

  useEffect(() => {
    console.log("Updated Selected Difficulty: ", selectedDifficulty);
  }, [selectedDifficulty]);

  const handleSelectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
    console.log("Selected Difficulty: ", difficulty);
    console.log(selectedDifficulty);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"
      onClick={() => {
        props.handleBGClick();
      }}
    >
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center border border-gray-300 p-2 bg-white rounded-lg shadow-lg"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <input
          className="border border-gray-300 rounded-md w-full"
          type="text"
          placeholder={
            props.placeholder ? props.placeholder : "Add task to the list"
          }
          value={props.value ? props.value : task}
          onChange={(e) => setTask(e.target.value)}
        />
        <div className="flex p-2 gap-2 w-full justify-center">
          <div
            className={`border border-gray-300 rounded-md h-[80px] w-[80px] ${
              selectedDifficulty === "easy" && "bg-blue-200"
            }`}
            onClick={() => handleSelectDifficulty("easy")}
          >
            <label htmlFor="">Easy</label>
          </div>
          <div
            className={`border border-gray-300 rounded-md h-[80px] w-[80px] ${
              selectedDifficulty === "medium" && "bg-blue-200"
            }`}
            onClick={() => handleSelectDifficulty("medium")}
          >
            <label htmlFor="">Medium</label>
          </div>
          <div
            className={`border border-gray-300 rounded-md h-[80px] w-[80px] ${
              selectedDifficulty === "hard" && "bg-blue-200"
            }`}
            onClick={() => handleSelectDifficulty("hard")}
          >
            <label htmlFor="">Hard</label>
          </div>
        </div>

        <button
          type="submit"
          onClick={() => {
            props.onSubmit(task, selectedDifficulty);
            {
              console.log(task, selectedDifficulty);
            }
            setTask("");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
