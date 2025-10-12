"""Integrações externas - stubs e detectores.
Cada módulo expõe uma função `status()` que retorna dict com keys: available (bool), details (str).
"""
from . import powerbi, stripe_integration, firebase_integration, salesforce_integration, openai_wrapper

__all__ = [
    'powerbi',
    'stripe_integration',
    'firebase_integration',
    'salesforce_integration',
    'openai_wrapper',
]
