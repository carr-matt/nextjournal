import { OpenAI } from 'langchain/llms/openai';
import { z } from 'zod';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the overall mood of the person who wrote the journal entry.'),
    summary: z.string().describe('brief summary of the entire journal entry.'),
    negative: z
      .boolean()
      .describe('does the journal entry contain negative emotions?'),
    color: z
      .string()
      .describe(
        'a hexadecimal color code that represents the mood of the journal entry, such as #ffec23 for yellow to represent happiness.'
      ),
  })
);

export const analyze = async (prompt) => {
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const result = await model.invoke(prompt);
  console.log(result);
};
