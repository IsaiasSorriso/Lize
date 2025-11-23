import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

SYSTEM_PROMPT = """
Você é Lize-AI, especialista em política brasileira e legislação.
Sempre responda de forma clara, educada e em texto simples.
Foque apenas em política brasileira, cidadania e leis.
"""

def handler(request):
    if request.method != "POST":
        return {"statusCode": 405, "body": "Method not allowed"}

    try:
        body = json.loads(request.data)
        user_message = body.get("message", "")

        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            "temperature": 0.5,
            "max_tokens": 500
        }

        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json=data
        )
        result = response.json()
        answer = result['choices'][0]['message']['content']

        return {"statusCode": 200, "body": json.dumps({"response": answer})}

    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
