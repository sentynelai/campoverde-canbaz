import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageSquare, X, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../lib/openai';

export const ChatAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setError(null);
    const newMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(message);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response || "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 transition-all duration-300 ease-in-out ${
      isExpanded ? 'w-[90vw] md:w-96 h-[70vh] md:h-[600px]' : 'w-12 md:w-16 h-12 md:h-16'
    }`}>
      <div className="glass rounded-xl h-full flex flex-col overflow-hidden backdrop-blur-md bg-dark-950/40 border border-dark-800/30">
        {isExpanded ? (
          <>
            <div className="p-4 border-b border-dark-800/30 flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse"></span>
                Ask Sentynel
              </h2>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-dark-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}
              
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-[#00FF9C] text-dark-950'
                        : 'bg-dark-800/50 backdrop-blur-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-dark-800/50 backdrop-blur-sm max-w-[80%] p-3 rounded-lg">
                    <Loader2 className="w-5 h-5 animate-spin text-[#00FF9C]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 border-t border-dark-800/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-dark-800/50 rounded-lg px-4 py-2 text-white placeholder-dark-400 border border-dark-700/30 focus:outline-none focus:border-[#00FF9C] transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="p-2 bg-[#00FF9C] rounded-lg hover:bg-[#00FF9C]/80 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  <Send className="w-5 h-5 text-dark-950" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full h-full flex items-center justify-center hover:bg-dark-800/30 transition-colors"
          >
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-[#00FF9C]" />
          </button>
        )}
      </div>
    </div>
  );
};