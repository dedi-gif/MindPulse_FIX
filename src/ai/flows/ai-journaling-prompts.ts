'use server';
/**
 * @fileOverview AI-powered journaling prompts generator based on mood.
 *
 * - generateJournalingPrompts - A function to generate journaling prompts.
 * - GenerateJournalingPromptsInput - The input type for the generateJournalingPrompts function.
 * - GenerateJournalingPromptsOutput - The return type for the generateJournalingPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJournalingPromptsInputSchema = z.object({
  mood: z
    .string()
    .describe('The current mood of the user, e.g., happy, sad, anxious.'),
});
export type GenerateJournalingPromptsInput = z.infer<
  typeof GenerateJournalingPromptsInputSchema
>;

const GenerateJournalingPromptsOutputSchema = z.object({
  prompts: z
    .array(z.string())
    .describe('An array of journaling prompts tailored to the user\'s mood.'),
});
export type GenerateJournalingPromptsOutput = z.infer<
  typeof GenerateJournalingPromptsOutputSchema
>;

export async function generateJournalingPrompts(
  input: GenerateJournalingPromptsInput
): Promise<GenerateJournalingPromptsOutput> {
  return generateJournalingPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateJournalingPromptsPrompt',
  input: {schema: GenerateJournalingPromptsInputSchema},
  output: {schema: GenerateJournalingPromptsOutputSchema},
  prompt: `You are a helpful AI assistant designed to generate journaling prompts based on the user's mood. Generate 3 distinct and thought-provoking prompts tailored to the user's current mood: {{{mood}}}. The prompts should encourage reflection and deeper exploration of feelings. Return the prompts as a JSON array of strings.`,
});

const generateJournalingPromptsFlow = ai.defineFlow(
  {
    name: 'generateJournalingPromptsFlow',
    inputSchema: GenerateJournalingPromptsInputSchema,
    outputSchema: GenerateJournalingPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
