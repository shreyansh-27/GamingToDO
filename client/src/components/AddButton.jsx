export default function AddButton(props) {
  return (
    <button
      className="border border-gray-300 bg-[#0099c4] hover:bg-blue-100 hover:text-teal-500 text-xl rounded-sm absolute flex items-center w-10 h-10 justify-center top-[-10px]"
      onClick={() => {
        props.onClickFunction();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
