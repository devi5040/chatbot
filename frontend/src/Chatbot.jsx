import axios from "axios";
import Chat from "./Chat";
import { useState } from "react";

function Chatbot({ closeHandler }) {
  return (
    <div className="w-[100vw]">
      <div className=" ">
        <Chat closeHandler={closeHandler} />
      </div>
    </div>
  );
}

export default Chatbot;
