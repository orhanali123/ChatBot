import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateHTMLCSS(prompt: string): Promise<{ code: string; explanation: string }> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert web developer. Generate clean, modern HTML and CSS code based on user prompts. 
          Always include both HTML structure and CSS styling in a single file format. 
          Use modern CSS practices like flexbox, grid, and responsive design.
          Make the design visually appealing with proper colors, spacing, and typography.
          Include comments in the code to explain key sections.
          
          Format your response as JSON with two fields:
          - "code": The complete HTML file with embedded CSS
          - "explanation": A brief explanation of the design and features implemented`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    try {
      const parsed = JSON.parse(content);
      return {
        code: parsed.code || content,
        explanation: parsed.explanation || 'Generated HTML/CSS code based on your prompt.'
      };
    } catch {
      
      return {
        code: content,
        explanation: 'Generated HTML/CSS code based on your prompt.'
      };
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate code. Please try again.');
  }
}

export { openai };