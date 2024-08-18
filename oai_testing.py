import os
from openai import OpenAI

if __name__ == "__main__":

    # Create OpenAI client. By default fetches $OPENAI_API_KEY.
    client = OpenAI()

    # Assign completion parameters.
    role = "user"
    prompt = "who is the best nba player of all time?"
    model = "gpt-4o"

    # Get completion from API.
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": role,
                "content": prompt,
            }
        ],
        model="gpt-4o",
    )

    print(chat_completion)
    
    