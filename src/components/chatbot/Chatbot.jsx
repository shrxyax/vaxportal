import ChatbotIcon from "./Chatboticon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import "./Chatbot.css";

import { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);


  const updateHistory= (text, isError=false) => {
    setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking.."), {role: "model" , text, isError}])
  }

  const generateBotResponse = async(history) => {

    const transformedHistory = history.map(({ role, text }) => ({
    role,
    parts: [{ text }]
  }));

    const requestOptions ={
      method : "POST" , 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({contents: transformedHistory })
    }

    try{

      //api call for bot response
      const response = await fetch(process.env.REACT_APP_API_URL, requestOptions)
      const data= await response.json()
      if(!response.ok) throw new Error(data.error.message || "Something went wrong");
      
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText)
    } catch(error) {
      console.log(error)
    };
    
  }

  // Ref to auto-scroll chat body
  const chatBodyRef = useRef(null);

  // Scroll to bottom when chat updates
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? 'show-chatbot' : ''}`}>
     <button onClick={() => setShowChatbot(prev => !prev)} id="chatbot-toggler">
  <span className="material-symbols-outlined">
    {showChatbot ? "close" : "mode_comment"}
  </span>
</button>

      <div className="chatbot-popup">

        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-outlined">keyboard_arrow_down</button>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there <br /> How can I help you today?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={chat.id || index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;
