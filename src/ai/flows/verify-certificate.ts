'use server';

/**
 * @fileOverview An AI flow to verify the authenticity of a certificate or supporting document.
 *
 * - verifyCertificate - A function that analyzes a document image.
 * - VerifyCertificateInput - The input type for the verifyCertificate function.
 * - VerifyCertificateOutput - The return type for the verifyCertificate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyCertificateInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "The document to be verified, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VerifyCertificateInput = z.infer<
  typeof VerifyCertificateInputSchema
>;

const VerifyCertificateOutputSchema = z.object({
  isAuthentic: z.boolean().describe('Whether the document appears to be authentic.'),
  justification: z
    .string()
    .describe(
      'The reasoning behind the authenticity judgment, highlighting key visual elements.'
    ),
  details: z.object({
      issuer: z.string().describe('The name of the organization that issued the document.'),
      recipient: z.string().describe('The name of the person who received the document.'),
      date: z.string().describe('The date the document was issued.'),
  })
});
export type VerifyCertificateOutput = z.infer<
  typeof VerifyCertificateOutputSchema
>;

export async function verifyCertificate(
  input: VerifyCertificateInput
): Promise<VerifyCertificateOutput> {
  return verifyCertificateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyCertificatePrompt',
  input: {schema: VerifyCertificateInputSchema},
  output: {schema: VerifyCertificateOutputSchema},
  prompt: `You are an expert in document and certificate verification. Analyze the following document to determine its authenticity.

  Document: {{media url=documentDataUri}}

  Carefully examine the document for signs of authenticity such as:
  - Professional layout and typography
  - Official logos, seals, or watermarks
  - Clear and consistent information (issuer, recipient, date)
  - Absence of obvious digital manipulation or artifacts

  Based on your analysis, provide a judgment on whether the certificate is authentic, a justification for your decision, and extract key details.
  `,
});

const verifyCertificateFlow = ai.defineFlow(
  {
    name: 'verifyCertificateFlow',
    inputSchema: VerifyCertificateInputSchema,
    outputSchema: VerifyCertificateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
