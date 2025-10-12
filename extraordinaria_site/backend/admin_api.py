from flask import Flask, request, jsonify
import os
from integrations import powerbi, stripe_integration, firebase_integration, salesforce_integration, openai_wrapper

app = Flask(__name__)
ADMIN_KEY = os.getenv('ADMIN_KEY', 'CHANGE_ME')


def _require_admin(req):
    key = req.headers.get('X-ADMIN-KEY')
    return key == ADMIN_KEY


@app.route('/admin/status', methods=['GET'])
def status():
    if not _require_admin(request):
        return jsonify({'error':'unauthorized'}), 401
    services = {
        'powerbi': powerbi.status(),
        'stripe': stripe_integration.status(),
        'firebase': firebase_integration.status(),
        'salesforce': salesforce_integration.status(),
        'openai': openai_wrapper.status(),
    }
    return jsonify({'services': services})


@app.route('/admin/powerbi/embed', methods=['POST'])
def powerbi_embed():
    if not _require_admin(request):
        return jsonify({'error':'unauthorized'}), 401
    data = request.get_json(force=True)
    try:
        report_id = data['report_id']
        workspace_id = data['workspace_id']
        embed = powerbi.embed_report(report_id, workspace_id)
        return jsonify(embed)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/admin/stripe/create_payment', methods=['POST'])
def create_payment():
    if not _require_admin(request):
        return jsonify({'error':'unauthorized'}), 401
    data = request.get_json(force=True)
    try:
        amount = int(data.get('amount_cents', 1000))
        intent = stripe_integration.create_payment_intent(amount)
        return jsonify(intent)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/admin/salesforce/push_lead', methods=['POST'])
def push_lead():
    if not _require_admin(request):
        return jsonify({'error':'unauthorized'}), 401
    data = request.get_json(force=True)
    try:
        name = data.get('name')
        email = data.get('email')
        res = salesforce_integration.push_lead(name, email)
        return jsonify(res)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/admin/chat', methods=['POST'])
def admin_chat():
    if not _require_admin(request):
        return jsonify({'error':'unauthorized'}), 401
    data = request.get_json(force=True)
    mensagem = data.get('mensagem', '')
    idioma = data.get('idioma', 'pt')
    resp = openai_wrapper.chat(mensagem, idioma)
    return jsonify(resp)


if __name__ == '__main__':
    port = int(os.getenv('ADMIN_PORT', 5050))
    app.run(host='0.0.0.0', port=port)
