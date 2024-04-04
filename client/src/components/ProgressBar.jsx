import { useContext, useEffect, useState } from "react";
import { userContext } from "../UserContext";
// import "../styles.css";

export default function ProgressBar(props) {
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  const [requiredExp, setRequiredExp] = useState(0);

  function calculateExpVsLevel(lvl) {
    let constantNumber = 1.8;
    let map = new Map();
    for (let i = 1; i < 100; i++) {
      map.set(i, Math.round(Math.pow(i / 0.5, constantNumber)));
    }
    // console.log(map.get(lvl));
    console.log(lvl);
    return map.get(lvl);
  }

  useEffect(() => {
    setUserInformation(props.userInfo);
  }, [props.userInfo]);

  useEffect(() => {
    if (userInformation) {
      const exp = calculateExpVsLevel(userInformation.level);
      setRequiredExp(exp);
      console.log(userInformation.exp);
      if (filled < userInformation.exp) {
        setFilled(userInformation.exp);
      }
    }
  }, [filled, userInformation]);

  useEffect(() => {
    if (filled < requiredExp && isRunning) {
      setTimeout(() => setFilled((prev) => (prev += 2)), 50);
    }
  }, [filled, isRunning]);

  return (
    <div className="w-full h-full mt-1">
      <div className="relative border overflow-hidden w-full h-full bg-[#555] text-white">
        <div
          style={{
            height: "100%",
            width: `${(filled / requiredExp) * 100}%`,
            backgroundColor: "#0099C4",
            transition: "width 0.5s",
            position: "relative",
          }}
        ></div>
        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold font-sans text-white text-shadow">{filled + "/" + requiredExp}</span>
      </div>
    </div>
  );
}
