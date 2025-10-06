import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from .models import init_db, get_session, Sample
from .crypto import generate_rsa_keypair, hybrid_encrypt, hybrid_decrypt, generate_fernet_key, encrypt_fernet, decrypt_fernet
import base64


def create_app(test_config=None):
    app = Flask(__name__)
    if test_config:
        app.config.update(test_config)
    CORS(app)

    @app.route('/collect', methods=['POST'])
    def collect():
        data = request.get_json(force=True)
        value = data.get('value')
        if value is None:
            return jsonify({'error': 'missing value'}), 400
        with get_session() as s:
            s.add(Sample(value=float(value)))
            s.commit()
        return jsonify({'status': 'ok'}), 201

    @app.route('/analyze', methods=['GET'])
    def analyze():
        with get_session() as s:
            rows = s.query(Sample).all()
            vals = [r.value for r in rows]
        if not vals:
            return jsonify({'count': 0})
        import statistics
        res = {
            'count': len(vals),
            'mean': statistics.mean(vals),
            'std': statistics.pstdev(vals),
            'min': min(vals),
            'max': max(vals)
        }
        return jsonify(res)

    @app.route('/encrypt', methods=['POST'])
    def encrypt():
        data = request.get_json(force=True)
        text = data.get('value')
        if text is None:
            return jsonify({'error':'missing value'}), 400
        # generate ephemeral AES key and wrap with RSA
        rsa_pub, rsa_priv = generate_rsa_keypair()
        cipher_b64, wrapped_key_b64 = hybrid_encrypt(text.encode('utf-8'), rsa_pub)
        return jsonify({'cipher': cipher_b64, 'wrapped_key': wrapped_key_b64, 'private_key': base64.b64encode(rsa_priv).decode()})

    @app.route('/decrypt', methods=['POST'])
    def decrypt():
        data = request.get_json(force=True)
        cipher_b64 = data.get('cipher')
        wrapped_key_b64 = data.get('wrapped_key')
        priv_b64 = data.get('private_key')
        if not all([cipher_b64, wrapped_key_b64, priv_b64]):
            return jsonify({'error':'missing fields'}), 400
        plaintext = hybrid_decrypt(cipher_b64, wrapped_key_b64, priv_b64)
        return jsonify({'plaintext': plaintext.decode('utf-8')})

    return app


# convenience
if __name__ == '__main__':
    init_db()
    app = create_app()
    app.run(host=os.environ.get('FLASK_HOST','0.0.0.0'), port=int(os.environ.get('FLASK_PORT',5000)))
