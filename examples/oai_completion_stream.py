import os
from openai import OpenAI

if __name__ == "__main__":

    # Create OpenAI client. By default fetches $OPENAI_API_KEY.
    client = OpenAI()

    # Assign completion parameters.
    role = "user"
    prompt = "spit a few bars about relaxing out back in the pool on a lazy Sunday."
    model = "gpt-4o"
    is_stream = True

    # Get completion from API.
    completion = client.chat.completions.create(
        messages=[
            {
                "role": role,
                "content": prompt,
            }
        ],
        model=model,
        stream=is_stream, # Staggered text effect like in ChatGPT UI
    )

    if is_stream:
        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                print(chunk.choices[0].delta.content, end="")
    else:
        print(completion.choices[0].message.content)

    
    
