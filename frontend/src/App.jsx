import { useState } from "react";
import botIcon from "./assets/bot-icon.svg";
import Chatbot from "./Chatbot";

function App() {
  const [iconVisibility, setIconVisibility] = useState(true);

  //click handler to handle the icon click
  const clickHandler = () => {
    setIconVisibility(!iconVisibility);
  };

  return (
    <div className="bg-white">
      {iconVisibility && (
        <img
          src={botIcon}
          alt="bot icon"
          className="w-[150px] h-[150px] object-cover absolute bottom-1 right-1 cursor-pointer"
          onClick={clickHandler}
        />
      )}
      {!iconVisibility && <Chatbot closeHandler={clickHandler} />}
    </div>
  );
}

export default App;
