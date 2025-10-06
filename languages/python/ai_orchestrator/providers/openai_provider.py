import os
from typing import Any, Dict, List, Optional


class OpenAIProvider:
    def __init__(self) -> None:
        try:
            from openai import AsyncOpenAI  # type: ignore
        except Exception as e:
            raise RuntimeError("openai SDK não instalado. Instale com 'pip install openai'.") from e
        self.client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    async def chat(self, messages: List[Dict[str, Any]], tools=None, model: Optional[str] = None, temperature: Optional[float] = 0.7):
        model = model or os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        resp = await self.client.chat.completions.create(
            model=model, messages=messages, temperature=temperature or 0.7, tools=tools
        )
        return {"output": resp.choices[0].message.model_dump()}

    async def embeddings(self, inputs: List[str], model: Optional[str] = None):
        model = model or os.getenv("OPENAI_EMBEDDINGS_MODEL", "text-embedding-3-small")
        resp = await self.client.embeddings.create(model=model, input=inputs)
        return {"data": [e.embedding for e in resp.data]}

    async def moderation(self, payload: Dict[str, Any]):
        # Placeholder: use Moderations API if needed
        return {"ok": True, "note": "use OpenAI moderations here"}

    async def vision(self, payload: Dict[str, Any]):
        # Placeholder: multi-modal vision models
        return {"ok": True, "note": "vision stub"}

    async def speech(self, payload: Dict[str, Any]):
        # Placeholder: TTS/STT
        return {"ok": True, "note": "speech stub"}
