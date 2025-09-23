'use server';

/**
 * @fileOverview An AI chatbot to assist students.
 *
 * - askChatbot - A function that handles the chatbot conversation.
 * - ChatbotInput - The input type for the askChatbot function.
 * - ChatbotOutput - The return type for the askChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const connectWithAdminTool = ai.defineTool(
    {
      name: 'connectWithAdmin',
      description: 'Use this tool when the user wants to speak to a faculty member, advisor, or human admin.',
      inputSchema: z.object({
        topic: z.string().describe('The topic or reason the user wants to connect with an admin.'),
        conversationHistory: z.string().describe('The recent conversation history to provide context.'),
      }),
      outputSchema: z.string(),
    },
    async ({ topic, conversationHistory }) => {
      console.log(`INSTITUTE ADMIN CONNECTION REQUEST:
      Topic: ${topic}
      History: ${conversationHistory}`);
      return 'I have passed your message along to the Institute Admin. They will get back to you shortly.';
    }
);


const ChatbotInputSchema = z.object({
  message: z.string(),
  history: z.array(z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
  })).optional(),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.string();
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

const prompt = ai.definePrompt({
    name: 'chatbotPrompt',
    tools: [connectWithAdminTool],
    prompt: `You are NexusBot, a friendly and helpful AI assistant for students at Nexus University. Your goal is to answer student questions and provide assistance.

    If the user indicates they want to speak to a human, faculty member, or advisor, use the \`connectWithAdmin\` tool to escalate their request.

    Keep your answers concise and helpful.
    `,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async ({ message, history }) => {
    const { output } = await prompt({
        prompt: message,
        history,
    });
    return output!;
  }
);


export async function askChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
    return chatbotFlow(input);
}
