import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Loader2 } from 'lucide-react';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { getChatResponse } from '../lib/openai/assistant';
import { SuggestedQuestions } from './SuggestedQuestions';
import { SentynelLogo } from './SentynelLogo';
import type { ChatMessage } from '../lib/openai/types';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { selectedStore } = useStoreSelection();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input);
  };

  const sendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setInput('');
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const storeContext = selectedStore 
        ? `For Store #${selectedStore.id} with sales of $${(selectedStore.sales/1000000).toFixed(1)}M and ${selectedStore.customers} customers: ${message}`
        : message;

      const response = await getChatResponse(storeContext);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {!isOpen ? (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 p-4 bg-[#00FF9C] rounded-full shadow-lg hover:bg-[#00FF9C]/90 transition-colors"
        >
          <SentynelLogo />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-6 w-96 h-[500px] bg-dark-950/95 rounded-xl shadow-xl backdrop-blur-lg border border-dark-800/50 flex flex-col z-[100]"
        >
          <div className="p-4 border-b border-dark-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-[#00FF9C] rounded-full"
              />
              <h3 className="font-medium">Ask Sentynel AI</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-dark-800/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 && (
              <SuggestedQuestions onQuestionClick={sendMessage} />
            )}
            
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-[#00FF9C] text-dark-950'
                        : 'bg-dark-800/50'
                    }`}
                  >
                    {message.content}
                    <div className="text-xs opacity-50 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-dark-800/50 p-3 rounded-lg">
                    <Loader2 className="w-5 h-5 animate-spin text-[#00FF9C]" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-dark-800/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-dark-800/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#00FF9C]"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-[#00FF9C] rounded-lg hover:bg-[#00FF9C]/90 transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5 text-dark-950" />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};