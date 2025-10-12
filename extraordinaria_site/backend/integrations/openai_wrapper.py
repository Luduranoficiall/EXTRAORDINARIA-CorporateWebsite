import os

try:
    import openai
    openai.api_key = os.getenv('OPENAI_API_KEY')
    _HAS_OPENAI = True
except Exception:
    openai = None
    _HAS_OPENAI = False


def status():
    if _HAS_OPENAI:
        return {'available': True, 'details': 'OpenAI client available.'}
    return {'available': False, 'details': 'OpenAI not configured.'}


def chat(mensagem: str, idioma: str = 'pt'):
    if not _HAS_OPENAI:
        return {'resposta': 'Fallback: OpenAI não configurado.'}
    try:
        resp = openai.ChatCompletion.create(
            model='gpt-4o',
            messages=[{'role':'system','content':'Você é um assistente especialista para EXTRAORDINARIA.'},{'role':'user','content':mensagem}],
            max_tokens=300
        )
        return {'resposta': resp.choices[0].message.content}
    except Exception as e:
        return {'resposta': f'Erro no OpenAI: {e}'}
