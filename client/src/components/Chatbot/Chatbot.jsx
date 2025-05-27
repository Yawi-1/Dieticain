import React from 'react';
import { ImCross } from "react-icons/im";
import { LuMessageSquare } from "react-icons/lu";
import { FiSend } from "react-icons/fi";

const Chatbot = () => {
  const [showChatbot, setShowChatbot] = React.useState(false);
  const [userInput, setUserInput] = React.useState('');
  const [messages, setMessages] = React.useState([
    {
      from: 'bot',
      text: 'Hello! 👋 How can I assist you with your health or diet today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [suggestions, setSuggestions] = React.useState([]);
  const messagesEndRef = React.useRef(null);
  const toggleChatbot = () => setShowChatbot(prev => !prev);

  const qaPairs = [
    { question: "diet plan", answer: "We offer personalized diet plans based on your health goals. Please visit the Diet Plans section." },
    { question: "weight loss", answer: "For weight loss, we recommend a calorie-deficit plan combined with light exercise. You can book a consultation." },
    { question: "consultation", answer: "To book a consultation, go to our Consultation page and choose your preferred time slot." },
    { question: "nutrition tips", answer: "We regularly share healthy nutrition tips on our blog. Check it out!" },
    { question: "working hours", answer: "We are available 24/7 online, and our clinic operates from 9AM to 7PM, Mon-Sat." },
    { question: "contact", answer: "You can contact us via the Contact page or email us at support@nutricare.com." },
    { question: "payment", answer: "We accept UPI, credit/debit cards, and net banking for payments." },
    { question: "custom diet", answer: "Yes, we offer custom diet plans tailored to allergies, goals, and health conditions." },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAnswer = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    const match = qaPairs.find(pair => lowerMsg.includes(pair.question));
    return match
      ? match.answer
      : "Sorry, I didn't understand that. Try one of the suggestions below.";
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMsg = {
      from: 'user',
      text: userInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const botMsg = {
      from: 'bot',
      text: getAnswer(userInput),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setUserInput('');
    setSuggestions([]);
  };

  React.useEffect(() => {
    const input = userInput.toLowerCase();
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    const matched = qaPairs.filter(pair =>
      pair.question.toLowerCase().includes(input)
    );

    setSuggestions(input && matched.length === 0 ? qaPairs : matched);
  }, [userInput]);

  if (!showChatbot) {
    return (
      <button
        onClick={toggleChatbot}
        className="fixed z-50 bottom-6 right-6 cursor-pointer group transition-all duration-300 hover:rotate-12"
      >
        <div className="relative p-4 bg-indigo-600 rounded-full shadow-xl hover:bg-indigo-700 animate-bounce">
          <LuMessageSquare className="w-8 h-8 text-white" />
          <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            1
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className='fixed z-50 bottom-6 right-6 w-80 h-[550px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up'>
      {/* Header */}
      <div className='bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 flex justify-between items-center'>
        <div className='flex items-center space-x-3'>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center">
              <span className="text-white text-2xl">🤖</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className='font-semibold text-white text-lg'>NutriBot</h1>
            <p className='text-xs text-indigo-100'>Online 24/7</p>
          </div>
        </div>
        <button
          onClick={toggleChatbot}
          className='text-white hover:text-indigo-200 transition-colors p-1'
        >
          <ImCross className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Body */}
      <div className='flex-1 p-4 bg-gray-50 overflow-y-auto'>
        <div className='space-y-4'>
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start ${msg.from === 'user' ? 'justify-end' : ''} space-x-2`}
            >
              {msg.from === 'bot' && (
                <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center'>
                  <span className='text-indigo-600 text-sm'>AI</span>
                </div>
              )}
              <div 
                className={`max-w-[85%] p-3 rounded-2xl ${
                  msg.from === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}
              >
                <p className='text-sm'>{msg.text}</p>
                <span className={`text-xs mt-1 block ${msg.from === 'user' ? 'text-indigo-100' : 'text-gray-400'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className='p-4 border-t border-gray-200 bg-white'>
        <div className='relative'>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className='w-full p-3 pr-12 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all'
          />
          <button 
            onClick={handleSend} 
            className='absolute right-3 top-3 text-indigo-600 hover:text-indigo-700 transition-colors'
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className='mt-2 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
            <p className='text-xs text-gray-500 px-3 pt-2'>Try asking about:</p>
            <ul className='max-h-40 overflow-y-auto'>
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => setUserInput(item.question)}
                  className='px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 cursor-pointer transition-colors'
                >
                  {item.question.charAt(0).toUpperCase() + item.question.slice(1)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;