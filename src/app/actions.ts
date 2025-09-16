'use server';

import {
  autoVerificationRequest,
  type AutoVerificationRequestInput,
} from '@/ai/flows/auto-verification-request';

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
