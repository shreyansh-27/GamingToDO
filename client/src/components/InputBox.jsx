import { useEffect, useState } from "react";

export default function InputBox(props) {
  const [task, setTask] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  useEffect(() => {
    console.log(props.newTask);
    setTask(props.newTask);
  }, [props.newTask]);

  useEffect(() => {
    console.log(props.newDifficulty);
    setSelectedDifficulty(props.newDifficulty);
  }, [props.newDifficulty]);

  useEffect(() => {
    console.log("Updated Selected Difficulty: ", selectedDifficulty);
  }, [selectedDifficulty]);

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
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-20 "
      onClick={() => {
        props.handleBGClick();
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center opacity-none border border-gray-300 p-2 bg-blue-300 rounded-lg shadow-lg z-30"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <input
          className="border border-gray-300 rounded-md w-full bg-white text-[black]"
          type="text"
          placeholder={
            props.placeholder ? props.placeholder : "Add task to the list"
          }
          value={props.value ? props.value : task}
          onChange={(e) => setTask(e.target.value)}
        />
        <div className="flex p-2 gap-2 w-full justify-center">
          <button
            className={`border border-gray-300 rounded-md h-[80px] w-[80px] bg-blue-200 ${
              selectedDifficulty === "easy" && "bg-[white] text-[#0099c4]"
            }`}
            onClick={() => handleSelectDifficulty("easy")}
          >
            <label htmlFor="">Easy</label>
          </button>
          <button
            className={`border border-gray-300 rounded-md h-[80px] w-[80px] bg-blue-200 ${
              selectedDifficulty === "medium" && "bg-[white] text-[#0099c4]"
            }`}
            onClick={() => handleSelectDifficulty("medium")}
          >
            <label htmlFor="">Medium</label>
          </button>
          <button
            className={`border border-gray-300 rounded-md h-[80px] w-[80px] bg-blue-200 ${
              selectedDifficulty === "hard" && "bg-[white] text-[#0099c4]"
            }`}
            onClick={() => handleSelectDifficulty("hard")}
          >
            <label htmlFor="">Hard</label>
          </button>
        </div>

        <button
          type="submit"
          className="text-black"
          onClick={() => {
            props.onSubmit(task, selectedDifficulty);
            {
              console.log(task, selectedDifficulty);
            }
            // setTask("");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
