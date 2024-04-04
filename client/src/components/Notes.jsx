import AddButton from "./AddButton";

export default function Notes() {
  return (
    <div className="relative flex w-1/3 justify-center mt-4">
      
      <div className="relative border border-gray-300 w-[400px] rounded-md m-2 p-2 w-1/3 h-[500px]">
        <h1>Notes</h1>
      </div>
      <AddButton />
    </div>
  );
}
