import { getOpenAIClient } from './client';
import { OPENAI_CONFIG } from './config';
import type { AssistantResponse } from './types';

async function pollRunStatus(threadId: string, runId: string): Promise<void> {
  const openai = getOpenAIClient();
  let attempts = 0;
  
  while (attempts < OPENAI_CONFIG.maxRetries) {
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    
    if (runStatus.status === 'completed') {
      return;
    }
    
    if (runStatus.status === 'failed') {
      throw new Error('Assistant failed to process the request');
    }
    
    attempts++;
    await new Promise(resolve => setTimeout(resolve, OPENAI_CONFIG.pollingInterval));
  }
  
  throw new Error('Maximum polling attempts reached');
}

export async function getChatResponse(message: string): Promise<AssistantResponse> {
  try {
    const openai = getOpenAIClient();

    // Create a new thread
    const thread = await openai.beta.threads.create();

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });

    // Start the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: OPENAI_CONFIG.assistantId
    });

    // Wait for the assistant to complete
    await pollRunStatus(thread.id, run.id);

    // Get the assistant's response
    const messages = await openai.beta.threads.messages.list(thread.id);
    const response = messages.data[0].content[0].text.value;

    return {
      message: response,
      threadId: thread.id
    };
  } catch (error) {
    console.error('OpenAI Assistant error:', error);
    throw error;
  }
}