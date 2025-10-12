import os

def status():
    if os.getenv('SALESFORCE_TOKEN'):
        return {'available': True, 'details': 'Salesforce token present.'}
    return {'available': False, 'details': 'Salesforce not configured.'}

# placeholder function to push lead to Salesforce
def push_lead(name, email, company=None):
    if not os.getenv('SALESFORCE_TOKEN'):
        raise RuntimeError('Salesforce not configured')
    return {'pushed': True, 'id': 'sf_123'}
