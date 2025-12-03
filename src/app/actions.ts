"use server";

import { z } from "zod";
import { generateJournalingPrompts } from "@/ai/flows/ai-journaling-prompts";
import { getPersonalizedMoodInsights } from "@/ai/flows/personalized-mood-insights";
import { JournalEntry } from "@/lib/types";

const getPromptsSchema = z.object({
  mood: z.string(),
});

export async function getJournalingPromptsAction(input: { mood: string }) {
  const validatedInput = getPromptsSchema.safeParse(input);
  if (!validatedInput.success) {
    throw new Error("Invalid input for generating journaling prompts.");
  }

  try {
    const result = await generateJournalingPrompts(validatedInput.data);
    return result.prompts;
  } catch (error) {
    console.error("Error generating journaling prompts:", error);
    return [];
  }
}

const getInsightsSchema = z.object({
  entries: z.array(
    z.object({
      date: z.string(),
      mood: z.string(),
      text: z.string(),
    })
  ),
});

export async function getPersonalizedInsightsAction(input: {
  entries: JournalEntry[];
}) {
  const validatedInput = getInsightsSchema.safeParse(input);
  if (!validatedInput.success) {
    throw new Error("Invalid input for getting personalized insights.");
  }
  
  const moodData = validatedInput.data.entries.map(entry => ({ date: entry.date.split('T')[0], mood: entry.mood }));
  const journalEntries = validatedInput.data.entries.map(entry => ({ date: entry.date.split('T')[0], text: entry.text }));

  try {
    const result = await getPersonalizedMoodInsights({ moodData, journalEntries });
    return result;
  } catch (error) {
    console.error("Error getting personalized insights:", error);
    return { insights: "Could not generate insights at this time.", recommendations: "Please try again later." };
  }
}
