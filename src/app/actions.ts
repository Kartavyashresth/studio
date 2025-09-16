'use server';

import {
  autoVerificationRequest,
  type AutoVerificationRequestInput,
} from '@/ai/flows/auto-verification-request';
import {
  verifyCertificate,
  type VerifyCertificateInput,
} from '@/ai/flows/verify-certificate';
import {
    askChatbot,
    type ChatbotInput,
} from '@/ai/flows/chatbot';


export async function generateVerificationRequest(
  input: AutoVerificationRequestInput
) {
  try {
    // Simulate a delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 1500));
    const result = await autoVerificationRequest(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating verification request:', error);
    return {
      success: false,
      error: 'Failed to generate verification request. Please try again.',
    };
  }
}

export async function checkCertificateAuthenticity(input: VerifyCertificateInput) {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const result = await verifyCertificate(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error verifying certificate:', error);
        return {
            success: false,
            error: 'Failed to verify certificate. Please try again.',
        };
    }
}

export async function getChatbotResponse(input: ChatbotInput) {
    try {
        const result = await askChatbot(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error getting chatbot response:', error);
        return {
            success: false,
            error: 'Sorry, I am having trouble connecting. Please try again later.',
        };
    }
}
