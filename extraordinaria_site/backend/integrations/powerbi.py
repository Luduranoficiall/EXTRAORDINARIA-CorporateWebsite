import os

def status():
    # Detect Power BI credentials (placeholder)
    pb_key = os.getenv('POWERBI_KEY')
    if pb_key:
        return {'available': True, 'details': 'Power BI key found in environment.'}
    return {'available': False, 'details': 'POWERBI_KEY not set.'}

def embed_report(report_id: str, workspace_id: str):
    # Placeholder: return embed URL or error
    if not os.getenv('POWERBI_KEY'):
        raise RuntimeError('Power BI not configured')
    # Real implementation should call Azure/PowerBI APIs and return embed token
    return {'embedUrl': f'https://app.powerbi.com/reportEmbed?reportId={report_id}&groupId={workspace_id}', 'token': 'EMBED_TOKEN_PLACEHOLDER'}
