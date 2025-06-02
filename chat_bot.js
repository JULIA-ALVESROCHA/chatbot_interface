import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';

const ChattyAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('welcome'); // 'welcome', 'chat', 'capabilities'
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const messagesEndRef = useRef(null);

  // Customizable properties (easily editable in Figma)
  const config = {
    brandName: "Geolume",
    brandColor: "from-blue-600 to-blue-500",
    accentColor: "blue-600",
    userName: "Amigo",
    botAvatar: "🌍",
    welcomeEmoji: "👋",
    notificationDot: true,
    animationDuration: "300ms"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Clear messages after a short delay to show the refresh animation
    setTimeout(() => {
      setMessages([]);
      setCurrentView('welcome');
      setIsRefreshing(false);
    }, 800);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response with typing animation
    setTimeout(() => {
      const aiResponses = [
        "Obrigada pela sua mensagem! Estou aqui para te ajudar com geografia!",
        "Que pergunta interessante! Deixe-me te ajudar com isso.",
        "Fico feliz em te auxiliar. O que você gostaria de saber sobre geografia?",
        "Ótima pergunta! Posso te ajudar a explorar esse tópico geográfico.",
        "Entendo sua dúvida. Aqui está o que posso te explicar sobre geografia..."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiResponse = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleQuickStart = () => {
    setCurrentView('chat');
    const welcomeMessage = {
      id: Date.now(),
      text: `Olá ${config.userName}! ${config.botAvatar} Como posso te ajudar hoje?`,
      sender: 'ai',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const handleQuickTopic = (topic) => {
    setCurrentView('chat');
    const userMessage = {
      id: Date.now(),
      text: topic,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: `Ótima pergunta sobre ${topic.toLowerCase()}! Ficarei feliz em te ajudar a explorar este tópico. Que aspecto específico você gostaria de saber mais?`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const quickSuggestions = [
    "Com o que você pode me ajudar?",
    "Me fale sobre relevo brasileiro",
    "Como funcionam os climas?",
    "Dicas para a olimpíada de geografia"
  ];

  const renderWelcomeScreen = () => (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/2 right-12 w-12 h-12 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 relative z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 bg-gradient-to-br ${config.brandColor} rounded-full flex items-center justify-center shadow-sm`}>
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-semibold text-gray-900">{config.brandName}</span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Welcome Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center justify-center p-6 text-center relative z-10 min-h-full">
          <div className={`w-24 h-24 bg-gradient-to-br ${config.brandColor} rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce`}>
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌍</span>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sou o</h2>
          <h2 className={`text-2xl font-bold bg-gradient-to-r ${config.brandColor} bg-clip-text text-transparent mb-1`}>
            Geolume {config.welcomeEmoji}
          </h2>
          
          <p className="text-gray-600 mb-2">Sua assistente na Olimpíada</p>
          <p className="text-gray-600 mb-8">Brasileira de Geografia!</p>
          
          <button 
            onClick={handleQuickStart}
            className={`w-full bg-gradient-to-r ${config.brandColor} text-white py-3 px-6 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
          >
            Iniciar Conversa
          </button>

          {/* Capabilities Preview */}
          <div className="mt-6 w-full">
            <p className="text-sm text-gray-500 mb-3">Como posso te ajudar:</p>
            <button
              onClick={() => setCurrentView('capabilities')}
              className={`w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 text-left border border-gray-100`}
            >
              <div className="flex items-center gap-2">
                <Sparkles size={16} className={`text-${config.accentColor}`} />
                <span className="text-sm font-medium text-gray-700">Ver Todas as Habilidades</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Veja tudo que posso fazer por você</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCapabilitiesScreen = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
        <button 
          onClick={() => setCurrentView('welcome')}
          className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <span className="font-semibold text-gray-900">{config.brandName}</span>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Content - Scrollable with min-height */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 min-h-full flex flex-col">
          <div className="text-center flex-1">
            <div className={`w-16 h-16 bg-gradient-to-br ${config.brandColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-6">Minhas Habilidades</h3>
            <div className="space-y-4 text-left">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-700 mb-1">📚 Ajudar com a Olimpíada de Geografia</p>
                <p className="text-xs text-gray-500">Dicas, estratégias e conteúdos para você se preparar</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-700 mb-1">📋 Ajuda com regulamento e cronograma</p>
                <p className="text-xs text-gray-500">Tire suas dúvidas sobre regras e prazos da olimpíada</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">Estou aqui para te ajudar com a Olimpíada de Geografia!</p>
          </div>
        </div>
      </div>

      {/* Input - Fixed at bottom */}
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-3 hover:bg-gray-100 transition-colors">
          <input 
            type="text"
            placeholder="Pergunte qualquer coisa..."
            className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
                setCurrentView('chat');
              }
            }}
          />
          <button 
            onClick={() => {
              handleSendMessage();
              setCurrentView('chat');
            }}
            className={`w-8 h-8 bg-gradient-to-r ${config.brandColor} rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 hover:scale-110`}
            disabled={!inputValue.trim()}
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderChatScreen = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
        <button 
          onClick={() => setCurrentView('welcome')}
          className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="text-center">
          <h3 className="font-semibold text-gray-900">Olá, {config.userName}</h3>
          <p className="text-sm text-gray-500">Como posso ajudar?</p>
        </div>
        <button 
          onClick={handleRefresh}
          className={`p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105 ${isRefreshing ? 'animate-spin' : ''}`}
          disabled={isRefreshing}
        >
          <RefreshCw size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Messages - Scrollable area with proper height calculation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(540px - 140px)' }}>
          {messages.map((message, index) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-300`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                message.sender === 'user' 
                  ? `bg-gradient-to-r ${config.brandColor} text-white` 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-300">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl shadow-sm">
                <div className="flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <span className="text-xs text-gray-500 ml-2">digitando...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

      {/* Input - Fixed at bottom */}
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-3 hover:bg-gray-100 transition-colors">
          <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <span className="text-lg text-gray-500">+</span>
          </button>
          <input 
            type="text"
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            onClick={handleSendMessage}
            className={`w-8 h-8 bg-gradient-to-r ${config.brandColor} rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50`}
            disabled={!inputValue.trim()}
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 font-['Urbanist']">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 bg-gradient-to-r ${config.brandColor} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative`}
        >
          <MessageCircle size={24} className="text-white group-hover:scale-110 transition-transform" />
          {config.notificationDot && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full animate-pulse">
              <div className="absolute inset-1 bg-white rounded-full"></div>
            </div>
          )}
          
          {/* Floating animation rings */}
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-gradient-to-r from-blue-600 to-blue-500"></div>
        </button>
      )}

      {/* Chat Window - Total 540px height maintained */}
      {isOpen && (
        <div className="w-80 h-[540px] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform animate-in slide-in-from-bottom-8 zoom-in-95 flex flex-col">
          {currentView === 'welcome' && renderWelcomeScreen()}
          {currentView === 'capabilities' && renderCapabilitiesScreen()}
          {currentView === 'chat' && renderChatScreen()}
        </div>
      )}
    </div>
  );
};

export default ChattyAI;