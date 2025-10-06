import click
from .models import init_db
from .app import create_app
import os

@click.group()
def cli():
    pass

@cli.command()
def init_db_cmd():
    init_db()
    click.echo('Initialized DB')

@cli.command()
@click.option('--host', default='0.0.0.0')
@click.option('--port', default=5000)
def run(host, port):
    init_db()
    app = create_app()
    app.run(host=host, port=port)

@cli.command()
def gen_keys():
    from .crypto import generate_rsa_keypair
    pub, priv = generate_rsa_keypair()
    os.makedirs('keys', exist_ok=True)
    open('keys/public.pem','wb').write(pub)
    open('keys/private.pem','wb').write(priv)
    click.echo('Keys written to keys/ (public.pem, private.pem)')

if __name__ == '__main__':
    cli()
