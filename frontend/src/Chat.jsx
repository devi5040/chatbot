import React, { useEffect, useState } from "react";
import axios from "axios";

const Chat = ({ closeHandler }) => {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [newMessage, setNewMessage] = useState(""); // Stores current message input

  //send welcome message at the starting
  useEffect(() => {
    setMessages([
      {
        text: "Hi Dear!\n Ask me anything on hospital appointment booking",
        sender: "Bot",
      },
    ]);
  }, []);

  // Function to handle sending a message
  const sendMessage = async (e) => {
    //prevent the default behaviour of submit
    e.preventDefault();
    const question = e.target.user.value;
    const queryDetails = {
      question: question,
    };

    if (newMessage.trim() !== "") {
      // Add the new message to the messages array
      setMessages([...messages, { text: newMessage, sender: "You" }]);

      // Clear the input field
      setNewMessage("");
      const response = await axios.post(
        "http://localhost:3000/chatbot/chatbot-response",
        queryDetails
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data, sender: "Bot" },
      ]);
    }
  };

  //this will handle the close button handler
  const clickCloseHandler = () => {
    closeHandler(true);
  };

  //handle the delete button click
  const deleteChatHandler = async () => {
    let exitResponse = await axios.post(
      "http://localhost:3000/chatbot/chatbot-response",
      {
        question: "exit",
      }
    );
    setMessages([{ text: exitResponse.data, sender: "Bot" }]);
    console.log(messages);
  };

  return (
    <div className="flex flex-col w-[400px] h-[600px] border rounded-md overflow-hidden absolute right-5 bottom-10">
      <div className="header px-4 py-3 flex justify-between bg-purple-500 text-white">
        <h1 className="font-semibold text-xl ">
          Chatbot for appointment booking
        </h1>
        <h1
          className="font-bold text-xl cursor-pointer"
          onClick={clickCloseHandler}
        >
          X
        </h1>
      </div>
      <div className="flex-1 p-5 flex flex-col overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`px-5 my-3 py-2 rounded-md max-w-[80%] text-[#fff] ${
              message.sender === "You"
                ? "self-end bg-purple-500"
                : "self-start bg-[#ddd] text-[#000]"
            }`}
          >
            <p className="font-xl">{message.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="bg-white flex border-t-2">
        <h3
          className="w-[10%] flex items-center justify-center cursor-pointer text-purple-500"
          onClick={deleteChatHandler}
        >
          <i className="bi bi-trash-fill text-xl"></i>
        </h3>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border-none outline-none"
          name="user"
        />
        <button
          type="submit"
          className="p-3 border-none  text-purple-500 text-xl cursor-pointer"
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </form>
    </div>
  );
};

export default Chat;
