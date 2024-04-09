import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../UserContext";

export default function NoteBox() {
  const [notes, setNotes] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {
    if(user){
        const use = axios.get()
    }
  },[user]);

  return <div>heloo</div>;
}

const CommentBox = () => {
  return (
    <div>
      <div>
        <h1>Title</h1>
        <p>Content</p>
      </div>
    </div>
  );
};
