// This file is machine-generated - do not edit!

'use server';

/**
 * @fileOverview Automatically identifies the approver for a submitted activity.
 *
 * - autoVerificationRequest - A function that suggests the approver for an activity.
 * - AutoVerificationRequestInput - The input type for the autoVerificationRequest function.
 * - AutoVerificationRequestOutput - The return type for the autoVerificationRequest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoVerificationRequestInputSchema = z.object({
  activityDescription: z
    .string()
    .describe('Description of the activity the student participated in.'),
  supportingDocumentDataUri: z
    .string()
    .describe(
      "A supporting document for the activity, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AutoVerificationRequestInput = z.infer<
  typeof AutoVerificationRequestInputSchema
>;

const AutoVerificationRequestOutputSchema = z.object({
  suggestedApprover: z
    .string()
    .describe(
      'The name or title of the suggested approver for the activity.'
    ),
  justification: z
    .string()
    .describe(
      'The reasoning behind the suggested approver, based on the activity description and supporting document.'
    ),
});
export type AutoVerificationRequestOutput = z.infer<
  typeof AutoVerificationRequestOutputSchema
>;

export async function autoVerificationRequest(
  input: AutoVerificationRequestInput
): Promise<AutoVerificationRequestOutput> {
  return autoVerificationRequestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoVerificationRequestPrompt',
  input: {schema: AutoVerificationRequestInputSchema},
  output: {schema: AutoVerificationRequestOutputSchema},
  prompt: `You are an AI assistant designed to identify the appropriate faculty or admin member to approve a student's activity submission.

  Based on the activity description and supporting document, determine who is best suited to verify the activity.

  Description: {{{activityDescription}}}
  Supporting Document: {{media url=supportingDocumentDataUri}}

  Provide the name or title of the suggested approver and a brief justification for your choice.
  `,
});

const autoVerificationRequestFlow = ai.defineFlow(
  {
    name: 'autoVerificationRequestFlow',
    inputSchema: AutoVerificationRequestInputSchema,
    outputSchema: AutoVerificationRequestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
