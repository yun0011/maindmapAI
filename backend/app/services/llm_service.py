import os
import json
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

llm = ChatOpenAI(
    openai_api_key=OPENROUTER_API_KEY,
    openai_api_base="https://openrouter.ai/api/v1",
    model="openai/gpt-4o-2024-11-20",
    model_kwargs={"response_format": {"type": "json_object"}},
)

def generate_answer(user_input: str) -> dict:
    prompt_template = """주어진 주제에 대한 마인드맵을 생성해주세요.
주제: {question}

출력은 반드시 다음 요구사항을 만족하는 JSON 형식이어야 합니다:
1.  JSON 객체는 `nodes`와 `edges` 두 개의 키를 가져야 합니다.
2.  `nodes`는 객체 배열이어야 합니다. 각 객체는 다음을 포함해야 합니다:
    - `id`: 고유한 문자열 식별자.
    - `data`: `label` (노드의 텍스트, 문자열)을 포함하는 객체.
3.  `edges`는 객체 배열이어야 합니다. 각 객체는 다음을 포함해야 합니다:
    - `source`: 부모 노드의 `id`.
    - `target`: 자식 노드의 `id`.

루트 노드의 id는 "1"로 시작해주세요.

JSON 예시:
```json
{{
  "nodes": [
    {{"id": "1", "data": {{"label": "핵심 주제"}}}},
    {{"id": "2", "data": {{"label": "가지 1"}}}},
    {{"id": "3", "data": {{"label": "가지 2"}}}}
  ],
  "edges": [
    {{"source": "1", "target": "2"}},
    {{"source": "1", "target": "3"}}
  ]
}}
```
"""
    prompt = ChatPromptTemplate.from_template(prompt_template)
    chain = prompt | llm
    result = chain.invoke({"question": user_input})
    return json.loads(result.content)
