import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Loader2 } from 'lucide-react';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { getChatResponse } from '../lib/openai';
import { SuggestedQuestions } from './SuggestedQuestions';

const SentynelLogo = () => (
  <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1018.97 1031.02" className="w-6 h-6">
    <path fill="#0b0b0b" d="M517.94,983.96c-92.43,1.67-164.67-12.8-232.47-45.78C139.16,867.02,44.7,754,12.24,592.84-8.28,490.96,1.8,391.26,42.68,295.86c38.24-89.21,97.03-162.52,179.04-216.05C283.6,39.42,351.04,13.8,424.33,4.6c139.43-17.5,265.87,14.54,375.85,103.26,77.81,62.77,130.99,143.16,160.04,238.84,21.41,70.51,26.68,142.59,17.18,215.8-12.65,97.58-52.15,182.78-117.51,255.96-55.69,62.37-123.37,107.38-201.56,136.84-50.78,19.13-103.39,27.87-140.39,28.65ZM495.76,37.29c-60.51-.33-118.49,10.73-174.04,33.74-107.31,44.44-186.13,119.2-236.04,224.08-40.54,85.19-51.11,175.06-38.79,267.82,9.14,68.84,32.57,132.62,73.12,189.49,66,92.57,155.79,150.43,264.58,180.12,53.3,14.55,107.58,18.86,162.27,11.03,68.33-9.78,131.69-33.61,190.05-70.79,70.3-44.79,124.74-104.03,161.22-178.86,37.57-77.07,49.98-159.01,41.78-244.13-8.03-83.31-33.96-160.13-84.62-227.53-90-119.73-210.77-179.77-359.53-184.97Z"/>
    <path fill="#0b0b0b" d="M833.5,742.95c4.11,2.06,8.95,2.66,13.47,3.92-4.84-3.53-11.02-4.78-14.86-8.46-3.37-3.23-5.82-3.39-9.22-2.04-5.52,2.19-11.38,3.95-16.3,7.13-22.96,14.85-45.87,29.8-68.34,45.36-11.66,8.07-22.37,17.5-33.84,26.57-2.17-2.32-4-4.27-6.25-6.68,16.78-13.49,32.81-26.39,48.84-39.28-3.35,.25-5.98,1.63-8.49,3.21-14.5,9.15-28.8,18.62-43.54,27.37-4.13,2.45-9.49,2.83-14.44,4.21,7.33,11.52,15.52,24.41,23.82,37.45-7.79,3.29-12.92-1.24-15.66-5.43-3.47-5.32-8.09-6.68-13.14-8.66-9.93-3.89-19.82-7.93-29.5-12.38-3.65-1.67-6.69-4.65-10.02-7.04-4.27-4.34-8.54-8.69-12.8-13.02-.3-4.45-2.38-10-.48-13.11,2.16-3.53,7.87-4.91,12.06-7.18,2.73-1.47,5.6-2.7,8.24-4.3,24.04-14.53,48.14-28.97,71.98-43.82,5.19-3.23,10.9-6.96,9.84-15.59,4.04,1.27,7.13,2.44,10.32,3.17,1.92,.43,4.61,1.01,5.89,.07,6.22-4.54,12.09-9.57,19.11-15.26-3.91-1.08-6.56-1.99-9.29-2.54-14.47-2.91-28.98-5.69-43.44-8.64-2-.41-4.23-1.07-5.71-2.35-10.38-8.98-20.31-18.49-30.9-27.21-22.42-18.47-45.27-36.43-67.63-54.97-2.69-2.23-4.7-6.69-4.95-10.26-1.74-25.44-3.08-50.9-4.26-76.37-.5-10.72,3.32-15.58,13.72-18.78,7.05-2.17,14.33-3.74,21.2-6.38,19.17-7.37,34.59-22.37,33.19-47.97-.87-15.9-.93-31.85-1.46-47.78-.34-10.2-1.04-20.4-1.19-30.61-.05-3.45,.45-7.19,1.79-10.33,3.16-7.44,6.86-14.66,10.54-21.87,3.07-6.02,2.78-11.87-.04-17.82-3.37-7.11-6.43-14.37-10.09-21.32-3-5.71-3.38-11.29-1.02-17.17,4.01-9.98,4.14-20.46,.52-30.13-6.06-16.23-12.08-32.78-20.72-47.69-39.76-68.66-111.88-95.24-186.17-82.48,2.11,.08,4.21-.17,6.3-.14,16.15,.23,32.67-1.6,48.39,1.14,70.6,12.28,117.17,53.77,141.93,120.52,1.95,5.26-.29,7.05-5.21,7.15-4.04,.08-8.1,.56-12.12,.32-6.85-.41-7.42,3.67-6.52,8.69,.36,2.04,1.31,4.09,2.42,5.85,10.96,17.31,22.05,34.55,33.02,51.86,1.44,2.28,2.48,4.81,4.53,8.84-6.33,0-11.04-.5-15.59,.13-5.06,.71-10.62,1.42-14.82,4-6.82,4.19-12.87,9.71-18.9,15.06-1.83,1.62-2.52,4.51-3.74,6.82,2.69,1.2,5.45,3.56,8.05,3.39,7.64-.51,15.22-2.03,23.04-3.19-2.06,2.7-4.19,5.48-5.88,7.7,4.08,2.14,9.44,3.32,11.78,6.63,2.59,3.66,2.42,9.28,3.18,12.81-11.85,0-23.23-1.13-34.28,.31-11.65,1.52-21.4,8.04-30.32,18.38,6.03-1.32,10.38-2.36,14.76-3.21,13.6-2.64,27.21-5.56,40.95-.85,8.1,2.78,11.03,6.99,7.24,14.52-3.88,7.7-3.43,14.28-.17,21.55,.95,2.12,1.15,4.6,1.56,6.94,4.64,26.51-8.12,38.82-34.49,33.25-12.35-2.61-24.72-5.15-36.99-8.13-19.78-4.81-39.49-9.95-59.93-15.14-.52-.12-1.04-.25-1.56-.39v.02c-.06-.02-.12-.05-.19-.07-4.57-1.28-9.21-3.49-13.91-4.9-3.85-1.15-7.55-2.73-11.25-4.3-2.28-.85-4.55-1.71-6.81-2.59-.21-.08-.42-.23-.62-.41-.07-.03-.14-.06-.21-.08-4.68-1.7-9.58-3.08-13.88-5.67-1.53-.92-2.84-1.93-3.99-3-3.6-1.48-5.8-4.94-6.95-9.06-.64,0-1.29,.02-1.93,.03-.57-11.9-1.14-23.81-1.72-35.71-.24-2.14-.49-4.29-.73-6.43-1.17-10.22-1.22-20.33-1.89-30.55-.87-2.81-1.53-5.64-1.83-8.53-.92-2.16-1.81-4.34-2.46-6.66-.76-2.73-1.32-5.52-1.82-8.34-.9-2.51-1.77-5.03-2.5-7.6-2.14-7.51-3.73-15.53-4.5-23.45-.2-.47-.38-.95-.53-1.47-1.85-6.33-.94-13.59-1.38-20.32-.15-.84-.25-1.71-.25-2.62,0-.12,.02-.23,.02-.35-.79-1.52-.24-3.97,.79-8.63,4.87-22.04,.9-41.7-16.07-57.62-19.68-18.46-54.85-23.52-80.44-11.68-3.36,1.55-6.64,3.29-9.96,4.95,6.27-8.59,13.28-16.28,20.92-23.27,7.5-6.85,15.66-12.99,25.08-20.71-2.59,1.04-3.28,1.22-3.87,1.57-52.58,30.92-84.56,76.1-92.73,136.82-7.14,53.09,7.28,99.36,46.12,137.48,7.88,7.74,15.22,16.83,20.11,26.65,11.54,23.18,18.84,48.19,20.35,73.96,1.56,26.59,.08,53.36-.28,80.05-.03,2.07-1.23,4.64-2.74,6.09-9.1,8.73-18.18,17.52-27.76,25.71-17.95,15.33-37.15,29.32-54,45.76-9.04,8.81-18.64,12.44-30.15,14.54-11.26,2.05-22.35,5.09-33.51,7.69,0,.69,0,1.37,0,2.06,10.16,4.85,15.77,20.64,30.03,12.43,4.2,4.45,7.22,9.23,11.53,11.98,22.68,14.46,45.57,28.58,68.62,42.43,8.56,5.14,17.77,9.21,26.67,13.79,4.82,2.48,5.51,5.79,2.41,10.31-6.88,10.03-15.31,18.48-26.27,23.7-10.07,4.79-20.82,8.13-30.99,12.73-4.5,2.04-8.34,5.57-12.4,8.53-4.2,3.06-7.7,7.88-15.04,5.27,8.65-13.18,16.98-25.85,24.5-37.3-6.86-2.93-12.92-4.81-18.25-7.93-14.79-8.69-29.27-17.92-43.91-26.88-1.79-1.09-3.83-1.78-5.75-2.65-.22,.43-.44,.86-.66,1.29,15.35,12.25,30.69,24.5,46.77,37.33-6.07,2.74-9.98,2.17-14.18-1.44-23.37-20.08-47.88-38.67-74.93-53.58-9.57-5.28-19.67-9.64-29.76-13.88-2.42-1.02-5.75,.09-8.66,.22,.37,5.21-4.27,3.96-6.87,5.12-3.34,1.5-6.91,2.49-10.38,3.71,10.39,1.33,20.37-7.99,31.4,.7-9.63,2.06-18.69,4-30.11,6.44,13.59,15.44,25.68,29.47,38.11,43.21,14.18,15.68,31.04,28.5,47.23,41.87,14.92,12.33,31.67,22.45,47.72,33.61,1.97-2.49,3.13-3.69,3.99-5.08,9.68-15.68,23.01-26.31,41.05-31.17,21.25-5.73,39.2-17.22,54-33.42,3.5-3.83,6.73-4.43,11.26-2.62,12.57,5.01,25.23,9.82,38.02,14.77,23.24-43.84,58.09-60.95,106.71-46.04,4.06-30.8,8.12-61.6,12.18-92.4,.82,.11,1.63,.22,2.45,.33-1.05,8.48-2.21,16.95-3.13,25.45-2.36,21.78-4.66,43.57-6.8,65.37-.18,1.83,.4,4.84,1.64,5.54,16.77,9.59,28.28,23.79,36.36,41.52,10.14-4.23,20.06-7.72,29.35-12.45,7.2-3.66,12.69-3.2,18.18,2.66,16.79,17.93,37.77,28.7,61.17,35.18,9.13,2.53,16.16,7.98,21.8,15.38,4.17,5.46,8.22,11.01,12.5,16.74,28.04-14.5,51.86-34.11,74.67-55.11-3.28,2.2-6.56,4.4-9.85,6.59-.42-.51-.83-1.02-1.25-1.53,10.76-9.8,21.52-19.6,32.28-29.4,.47,.42,.94,.84,1.41,1.26-.81,1.15-1.62,2.31-2.46,3.48,13.97-13.36,27.18-27.41,39.88-43.6-10.57-2.45-19.19-4.44-28.68-6.64,5.61-4.6,10.18-6.71,16.42-3.58Z"/>
  </svg>
);

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
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
    const userMessage = message;
    setInput('');
    
    const newMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const storeContext = selectedStore 
        ? `For Store #${selectedStore.id} with sales of $${(selectedStore.sales/1000000).toFixed(1)}M and ${selectedStore.customers} customers: ${userMessage}`
        : userMessage;

      const response = await getChatResponse(storeContext);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response || 'I apologize, but I was unable to process your request.',
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