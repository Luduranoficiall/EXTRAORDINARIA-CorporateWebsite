import sqlite3
import pandas as pd

try:
    import dash
    from dash import html, dcc
    from dash.dependencies import Input, Output
except Exception:
    dash = None

if dash is None:
    print('Dash library is not installed. Install with: pip install dash')
else:
    app = dash.Dash(__name__)
    app.layout = html.Div([
        html.H1('Data Dashboard'),
        dcc.Interval(id='interval', interval=5000),
        html.Div(id='stats')
    ])

    @app.callback(Output('stats', 'children'), [Input('interval','n_intervals')])
    def update(_):
        conn = sqlite3.connect('languages/python/data.db')
        df = pd.read_sql_query('SELECT value FROM samples', conn)
        conn.close()
        if df.empty:
            return html.P('No data')
        return html.Pre(df.describe().to_string())

    if __name__ == '__main__':
        app.run_server(debug=True, port=8050)
