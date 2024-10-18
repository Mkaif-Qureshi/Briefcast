import os
from groq import Groq

os.environ['GROQ_API_KEY'] = "API_KEY"

# Initialize Groq client
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def summarize_text(text):
    # Call the Groq API to summarize the text
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Summarize the following text: {text}",
            }
        ],
        model="llama3-8b-8192",  # You can change this model as needed
    )

    # Return the summarized text from the API response
    return chat_completion.choices[0].message.content
