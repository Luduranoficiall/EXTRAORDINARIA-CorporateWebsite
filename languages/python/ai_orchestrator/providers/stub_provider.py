from typing import Any, Dict, List, Optional


class StubProvider:
    async def chat(self, messages: List[Dict[str, Any]], tools=None, model: Optional[str] = None, temperature: Optional[float] = 0.7):
        last = messages[-1]["content"] if messages else ""
        return {"output": {"role": "assistant", "content": f"(stub) Você disse: {last}"}}

    async def embeddings(self, inputs: List[str], model: Optional[str] = None):
        return {"data": [[0.0 for _ in range(8)] for _ in inputs]}

    async def moderation(self, payload: Dict[str, Any]):
        return {"allowed": True}

    async def vision(self, payload: Dict[str, Any]):
        return {"caption": "(stub) imagem processada"}

    async def speech(self, payload: Dict[str, Any]):
        return {"text": "(stub) fala convertida"}
