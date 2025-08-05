import React, { useState } from 'react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your dental supplies assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('price') || input.includes('cost')) {
      return 'I can help you with pricing information. What specific product are you interested in? We offer competitive prices on all dental equipment and supplies.';
    }
    
    if (input.includes('delivery') || input.includes('shipping')) {
      return 'We offer 24-hour delivery within Nairobi and nationwide shipping. Delivery is free for orders within Nairobi above KES 10,000.';
    }
    
    if (input.includes('dental chair')) {
      return 'We have a wide range of dental chairs from basic models to premium units. Prices start from KES 180,000. Would you like me to show you our current selection?';
    }
    
    if (input.includes('student kit')) {
      return 'Our student kits are perfect for BDS and KMTC students. Complete kits start from KES 25,000 and include all essential instruments for clinical practice.';
    }
    
    if (input.includes('warranty') || input.includes('guarantee')) {
      return 'All our products come with manufacturer warranties. Dental chairs have 2-year warranties, and most equipment comes with 1-year coverage.';
    }
    
    return 'Thank you for your question! For specific product information or detailed assistance, please call us at 0703 416 433 or visit our store at Mepalux Plaza, River Road.';
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
      >
     <span className="text-lg">✕</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
      {/* Header */}
      <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Dental Assistant</h3>
          <p className="text-xs text-primary-200">Online now</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-primary-200"
        >
     <span>➤</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-sm ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-primary-600 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}