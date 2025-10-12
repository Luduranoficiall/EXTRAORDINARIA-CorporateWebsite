import os

def status():
    key = os.getenv('STRIPE_KEY') or os.getenv('STRIPE_SECRET')
    if key:
        return {'available': True, 'details': 'Stripe key found.'}
    return {'available': False, 'details': 'Stripe key not set.'}

# Minimal charge creation placeholder
def create_payment_intent(amount_cents: int, currency: str = 'brl'):
    if not (os.getenv('STRIPE_KEY') or os.getenv('STRIPE_SECRET')):
        raise RuntimeError('Stripe not configured')
    # In real system use stripe SDK to create payment intent
    return {'id': 'pi_123', 'client_secret': 'secret_123'}
