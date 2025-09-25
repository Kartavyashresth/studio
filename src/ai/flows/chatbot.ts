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

const connectWithFacultyTool = ai.defineTool(
    {
      name: 'connectWithFaculty',
      description: 'Use this tool when the user wants to speak to a faculty member or an advisor for academic matters.',
      inputSchema: z.object({
        topic: z.string().describe('The topic or reason the user wants to connect with a faculty member.'),
        conversationHistory: z.string().describe('The recent conversation history to provide context.'),
      }),
      outputSchema: z.string(),
    },
    async ({ topic, conversationHistory }) => {
      console.log(`FACULTY CONNECTION REQUEST:
      Topic: ${topic}
      History: ${conversationHistory}`);
      return 'I have forwarded your request to a faculty advisor. They will reach out to you soon.';
    }
);

const connectWithAdminTool = ai.defineTool(
    {
      name: 'connectWithAdmin',
      description: 'Use this tool when the user wants to speak to an institute admin for administrative or non-academic issues.',
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
    tools: [connectWithFacultyTool, connectWithAdminTool],
    prompt: `You are NexusBot, a friendly and helpful AI assistant for students at Nexus University. Your goal is to answer student questions and provide assistance.

    - If the user indicates they want to speak to a faculty member or advisor for academic help, use the \`connectWithFacultyTool\`.
    - If the user indicates they want to speak to an institute admin for administrative or general issues, use the \`connectWithAdminTool\`.
    - If the user just says they want to talk to a human, ask them if it's for an academic or administrative matter to clarify.

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
