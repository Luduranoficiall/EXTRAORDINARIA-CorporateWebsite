"""Generate a professional Go-to-Market plan (Markdown + HTML snippet) for BotGPT by EXTRAORDINARI.A.

This is pure Python (stdlib only). Run with:

    python generate_gotm.py

It writes to ../../../../docs/BotGPT_GoToMarket.md and docs/botgpt_landing_snippet.html
relative to this file's directory (so from repo root: ./languages/python/gotm/generate_gotm.py).
"""
from __future__ import annotations
import os
import sys
import json
import traceback
from datetime import date
from typing import Dict, Any, Optional
from pathlib import Path


PLAN: Dict[str, Any] = {
    "title": "BotGPT by EXTRAORDINARI.A. — Go-to-Market Rápida (até 30 dias)",
    "date": date.today().isoformat(),
    "overview": (
        "Plano tático para lançar um produto de chatbot comercializável em até 30 dias, "
        "priorizando time-to-market, oferta clara e entregas white-label para faturamento imediato."
    ),
    "steps": [
        {
            "heading": "Passo 1 — Escolher 1 caso de uso simples e de alta demanda",
            "details": [
                "Foque no maior ponto de dor com ticket de venda simples.",
                "Sugestões de caso de uso:",
                "  1. WhatsApp Bot de Atendimento + Vendas (restaurantes, pizzarias, clínicas, imobiliárias).",
                "  2. FAQ Inteligente para sites (captura de leads & integração CRM/WhatsApp).",
                "  3. Agendamentos automáticos (clínicas, salões, academias).",
            ],
        },
        {
            "heading": "Passo 2 — Usar tecnologia white-label / no-code",
            "details": [
                "Use plataformas prontas para montar e entregar bots em dias, não meses.",
                "Plataformas recomendadas:",
                "  • ManyChat — forte em WhatsApp/Instagram, ideal para vendas/marketing.",
                "  • Twyla / Take Blip — robustas, integração com CRMs e WhatsApp empresarial.",
                "  • Tidio — chat web com integração para WhatsApp.",
                "  • Landbot — construção de fluxos sem código para UX personalizado.",
                "Com essas plataformas é possível montar um bot em 3–7 dias.",
            ],
        },
        {
            "heading": "Passo 3 — Pacotizar e precificar",
            "details": [
                "Ofertas claras reduzem fricção de venda. Segue proposta de planos:",
                "  • Plano Essencial — R$ 97/mês: FAQ + leads + 1 canal (site ou WhatsApp).",
                "  • Plano Avançado — R$ 197/mês: FAQ + WhatsApp + agendamento + relatórios.",
                "  • Plano Premium — R$ 497/mês: Tudo + integração CRM/ERP + branding dedicado.",
                "Mesmo bot — três pacotes diferenciados por suporte e integrações.",
            ],
        },
        {
            "heading": "Passo 4 — Branding e lançamento",
            "details": [
                "Nome do produto: BotGPT by EXTRAORDINARI.A.",
                "Landing page simples com CTA 'Teste grátis por 7 dias'.",
                "Trial + formulário de feedback (metodologia EXPERIENCI.A.).",
                "Material de venda: 1 vídeo demonstrativo + 3 cases ilustrativos (pizzaria, clínica, imobiliária).",
            ],
        },
        {
            "heading": "Passo 5 — Comercialização imediata",
            "details": [
                "Atacar rede de contatos locais e prospects (ex.: SJC).",
                "Posicionamento de venda curto: 'Atendente virtual 24/7 que responde clientes, fecha pedidos e agenda serviços pelo WhatsApp — teste grátis 7 dias.'",
            ],
        },
    ],
    "summary": (
        "Resumo executivo: lançar com plataforma white-label, produto inicial focado em bot WhatsApp de atendimento + vendas, "
        "modelo simples de preços em 3 pacotes e lançamento imediato com landing page e trial de 7 dias."
    ),
}


def render_markdown(plan: Dict[str, Any]) -> str:
    lines = []
    lines.append(f"# {plan['title']}")
    lines.append("")
    lines.append(f"_Gerado em: {plan['date']}_")
    lines.append("")
    lines.append("## Visão geral")
    lines.append("")
    lines.append(plan['overview'])
    lines.append("")
    for step in plan['steps']:
        lines.append(f"### {step['heading']}")
        lines.append("")
        for d in step['details']:
            if d.strip().startswith(('•', '-', '*')) or d.strip().startswith(('1.', '2.', '3.')):
                lines.append(d)
            else:
                lines.append(f"- {d}")
        lines.append("")
    lines.append("## Resumo")
    lines.append("")
    lines.append(plan['summary'])
    lines.append("")
    lines.append("---")
    lines.append("> Para executar rapidamente: escolha 1 caso de uso, use plataforma white-label e lance com trial de 7 dias.")
    return "\n".join(lines)


def render_html_snippet(plan: Dict[str, Any]) -> str:
    # Minimal, accessible landing CTA snippet
    title = plan['title']
    cta = "Teste grátis por 7 dias"
    html = f"""
<section id="botgpt-cta" aria-labelledby="botgpt-title" class="botgpt-cta" style="background:#000;color:#fff;padding:2rem;border-radius:8px;">
  <div style="max-width:900px;margin:0 auto;">
    <h2 id="botgpt-title" style="font-size:1.5rem;margin:0 0 .5rem">{title}</h2>
    <p style="margin:0 0 1rem;">{plan['overview']}</p>
    <a href="/trial" class="btn-primary" role="button" aria-label="Iniciar teste grátis">{cta}</a>
    <p style="margin-top:.75rem;font-size:.9rem;color:#ddd">Oferta com setup rápido — entrega em 3–7 dias usando plataforma white-label.</p>
  </div>
</section>
"""
    return html


def find_repo_root(start: Optional[str] = None) -> str:
    p = Path(start or Path(__file__).resolve())
    # walk up until we find .git or package.json or README.md or pyproject.toml
    for parent in [p] + list(p.parents):
        if parent.is_dir() and (parent / '.git').exists():
            return str(parent)
        if (parent / 'package.json').exists() or (parent / 'README.md').exists() or (parent / 'pyproject.toml').exists():
            return str(parent)
    # fallback: use current working directory
    return str(Path.cwd())


def write_output(md: str, html: str, repo_root: Optional[str] = None) -> Dict[str, str]:
    base = repo_root or find_repo_root()
    docs_dir = Path(base) / 'docs'
    docs_dir.mkdir(parents=True, exist_ok=True)

    md_path = docs_dir / 'BotGPT_GoToMarket.md'
    html_path = docs_dir / 'botgpt_landing_snippet.html'

    # Write safely with UTF-8
    md_path.write_text(md, encoding='utf-8')
    html_path.write_text(html, encoding='utf-8')

    return {'markdown': str(md_path), 'html': str(html_path)}


def main() -> int:
    try:
        md = render_markdown(PLAN)
        html = render_html_snippet(PLAN)
        out = write_output(md, html)
        print('Generated:')
        print(' - Markdown:', out['markdown'])
        print(' - HTML snippet:', out['html'])
        return 0
    except Exception as exc:
        print('ERROR: Failed to generate files.', file=sys.stderr)
        traceback.print_exc()
        return 2


if __name__ == '__main__':
    sys.exit(main())
