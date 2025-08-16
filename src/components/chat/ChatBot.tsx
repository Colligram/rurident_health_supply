import React, { useState } from 'react';
import { FiSend, FiX, FiMessageCircle, FiPhone, FiMail, FiMapPin, FiClock, FiHelpCircle } from 'react-icons/fi';

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
      text: 'Hello! I\'m your dental supplies assistant. How can I help you today? 🦷',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'Product prices',
    'Delivery info',
    'Student kits',
    'Dental chairs',
    'Warranty details',
    'Store location'
  ];

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
    setIsTyping(true);

    // Simulate bot response with enhanced logic
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSendMessage(syntheticEvent);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('price') || input.includes('cost') || input.includes('how much')) {
      return 'Our prices are very competitive! 💰 Dental chairs start from KES 180,000, student kits from KES 25,000, and handpieces from KES 45,000. For specific pricing, please call us at 0703 416 433 or visit our store.';
    }
    
    if (input.includes('delivery') || input.includes('shipping') || input.includes('transport')) {
      return 'We offer fast delivery! 🚚 Within Nairobi: 24-hour delivery (FREE for orders above KES 10,000). Nationwide: 2-3 days delivery. We also provide installation services for major equipment.';
    }
    
    if (input.includes('dental chair') || input.includes('chair')) {
      return 'We have an excellent range of dental chairs! 🪑 From basic hydraulic models (KES 180,000) to premium digital units (KES 680,000). All chairs come with 2-year warranties and free installation in Nairobi.';
    }
    
    if (input.includes('student kit') || input.includes('student') || input.includes('learning')) {
      return 'Perfect for students! 🎓 Our complete BDS and KMTC student kits include all essential instruments. Basic kit: KES 25,000, Premium kit: KES 45,000. We offer student discounts and payment plans!';
    }
    
    if (input.includes('warranty') || input.includes('guarantee') || input.includes('service')) {
      return 'All our products come with comprehensive warranties! 🛡️ Dental chairs: 2 years, Equipment: 1-2 years, Instruments: 6 months-1 year. We also provide maintenance services and spare parts.';
    }

    if (input.includes('location') || input.includes('address') || input.includes('where') || input.includes('visit')) {
      return 'Visit us at Mepalux Plaza, River Road, Nairobi! 📍 We\'re open Monday-Saturday, 8AM-6PM. Parking available. You can also call us at 0703 416 433 for directions.';
    }

    if (input.includes('hours') || input.includes('open') || input.includes('time') || input.includes('when')) {
      return 'Our store hours: ⏰ Monday-Saturday: 8:00 AM - 6:00 PM, Sunday: 10:00 AM - 4:00 PM. For emergencies or urgent orders, please call 0703 416 433.';
    }

    if (input.includes('payment') || input.includes('pay') || input.includes('installment')) {
      return 'We accept multiple payment methods! 💳 Cash, M-Pesa, Bank Transfer, Credit/Debit Cards. We also offer installment plans for equipment above KES 100,000. Contact us for financing options.';
    }

    if (input.includes('installation') || input.includes('setup') || input.includes('install')) {
      return 'We provide professional installation! 🔧 Free installation in Nairobi for major equipment. Our certified technicians ensure proper setup and training. Installation outside Nairobi available at additional cost.';
    }

    if (input.includes('training') || input.includes('learn') || input.includes('course')) {
      return 'We offer equipment training! 📚 Free basic training with equipment purchase. Advanced courses available for dental chair operation, sterilization protocols, and equipment maintenance.';
    }

    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Hello there! 👋 Welcome to Rurident Health Supplies. I\'m here to help you with any questions about our dental equipment and supplies. What can I assist you with today?';
    }

    if (input.includes('thank') || input.includes('thanks')) {
      return 'You\'re very welcome! 😊 Is there anything else I can help you with? Remember, our team is always here to assist you at 0703 416 433.';
    }
    
    return 'Thank you for your question! 🤝 For detailed information about specific products or services, please call us at 0703 416 433, visit our store at Mepalux Plaza, River Road, or browse our online catalog. Our expert team is ready to help!';
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 animate-bounce hover:animate-none group"
        title="Chat with Dental Assistant"
      >
        <FiMessageCircle className="text-2xl group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 h-96 md:h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">🦷</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">Dental Assistant</h3>
            <p className="text-xs text-orange-100 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Online now
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-orange-200 p-2 hover:bg-white/10 rounded-full transition-all duration-200"
          title="Close chat"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-2 bg-orange-50 border-b border-orange-100">
        <p className="text-xs text-orange-600 font-medium mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-1">
          {quickQuestions.map((question) => (
            <button
              key={question}
              onClick={() => handleQuickQuestion(question)}
              className="text-xs bg-white text-orange-600 px-2 py-1 rounded-full border border-orange-200 hover:bg-orange-100 transition-colors duration-200"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-sm shadow-sm ${
                message.isBot
                  ? 'bg-white text-gray-800 border border-gray-200'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
              }`}
            >
              {message.text}
              <div className={`text-xs mt-1 ${
                message.isBot ? 'text-gray-400' : 'text-orange-100'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-lg text-sm shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Options */}
      <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
        <div className="flex justify-between items-center text-xs text-gray-600">
          <a href="tel:0703416433" className="flex items-center space-x-1 hover:text-orange-600">
            <FiPhone className="w-3 h-3" />
            <span>Call</span>
          </a>
          <a href="mailto:info@rurident.com" className="flex items-center space-x-1 hover:text-orange-600">
            <FiMail className="w-3 h-3" />
            <span>Email</span>
          </a>
          <div className="flex items-center space-x-1">
            <FiMapPin className="w-3 h-3" />
            <span>Mepalux Plaza</span>
          </div>
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-all duration-200"
          >
            <FiSend className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}