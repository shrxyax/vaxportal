import { useRef } from 'react';

const ChatForm = ({ chatHistory,setChatHistory, generateBotResponse }) => {
    
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    // Clear input after sending
    inputRef.current.value = "";

    // Update chat history
    setChatHistory((history) => [
      ...history,
      { id: Date.now(),role: "user", text: userMessage },
    ]);
    
    //placeholder thinking for bot response
    setTimeout(()=> {setChatHistory((history) => [
      ...history,
      { id: Date.now(),role: "model", text: "Thinking.."}])

    generateBotResponse([...chatHistory,{role:"user",text: userMessage}])
  },600)
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button type="submit" className="material-symbols-outlined">
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
