'use server';

/**
 * @fileOverview Analyzes mood data and journal entries to provide personalized insights and recommendations.
 *
 * - getPersonalizedMoodInsights - A function that processes mood data and journal entries to provide insights.
 * - PersonalizedMoodInsightsInput - The input type for the getPersonalizedMoodInsights function.
 * - PersonalizedMoodInsightsOutput - The return type for the getPersonalizedMoodInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedMoodInsightsInputSchema = z.object({
  moodData: z
    .array(z.object({
      date: z.string().describe('Date of the mood entry (YYYY-MM-DD).'),
      mood: z.string().describe('The mood selected by the user.'),
    }))
    .describe('Array of mood entries with date and mood.'),
  journalEntries: z
    .array(z.object({
      date: z.string().describe('Date of the journal entry (YYYY-MM-DD).'),
      text: z.string().describe('The content of the journal entry.'),
    }))
    .describe('Array of journal entries with date and text.'),
});
export type PersonalizedMoodInsightsInput = z.infer<typeof PersonalizedMoodInsightsInputSchema>;

const PersonalizedMoodInsightsOutputSchema = z.object({
  insights: z.string().describe('Personalized insights based on mood data and journal entries.'),
  recommendations: z.string().describe('Personalized recommendations for improving mental well-being.'),
});
export type PersonalizedMoodInsightsOutput = z.infer<typeof PersonalizedMoodInsightsOutputSchema>;

export async function getPersonalizedMoodInsights(
  input: PersonalizedMoodInsightsInput
): Promise<PersonalizedMoodInsightsOutput> {
  return personalizedMoodInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedMoodInsightsPrompt',
  input: {schema: PersonalizedMoodInsightsInputSchema},
  output: {schema: PersonalizedMoodInsightsOutputSchema},
  prompt: `You are a mental well-being expert. Analyze the provided mood data and journal entries to identify patterns and provide personalized insights and recommendations for improving the user's mental well-being.

Mood Data:
{{#each moodData}}
  - Date: {{date}}, Mood: {{mood}}
{{/each}}

Journal Entries:
{{#each journalEntries}}
  - Date: {{date}}, Text: {{text}}
{{/each}}

Based on this information, provide insights into the user's mood patterns and offer specific, actionable recommendations.

Insights:

Recommendations:
`,
});

const personalizedMoodInsightsFlow = ai.defineFlow(
  {
    name: 'personalizedMoodInsightsFlow',
    inputSchema: PersonalizedMoodInsightsInputSchema,
    outputSchema: PersonalizedMoodInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
