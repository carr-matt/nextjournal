import { OpenAI } from '@langchain/openai';
import { z } from 'zod';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the overall mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
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

const getPrompt = async (content) => {
  const formattedInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{formattedInstructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { formattedInstructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analyze = async (content) => {
  const input = await getPrompt(content);
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const result = await model.invoke(input);

  try {
    return parser.parse(result);
  } catch (e) {
    console.log(e);
  }
};
