import os

def status():
    if os.getenv('FIREBASE_CREDENTIALS'):
        return {'available': True, 'details': 'FIREBASE_CREDENTIALS present'}
    return {'available': False, 'details': 'FIREBASE_CREDENTIALS not set.'}

# placeholder for push notifications or firestore usage
def send_push(to, title, body):
    if not os.getenv('FIREBASE_CREDENTIALS'):
        raise RuntimeError('Firebase not configured')
    return {'sent': True}
