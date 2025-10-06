from sqlalchemy import create_engine, Column, Integer, Float, String
from sqlalchemy.orm import declarative_base, sessionmaker
import os

DB_PATH = os.environ.get('PYAPP_DB','python-app/data.db')
engine = create_engine(f'sqlite:///{DB_PATH}', connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Sample(Base):
    __tablename__ = 'samples'
    id = Column(Integer, primary_key=True, index=True)
    value = Column(Float, nullable=False)


def init_db():
    Base.metadata.create_all(bind=engine)

from contextlib import contextmanager
@contextmanager
def get_session():
    s = SessionLocal()
    try:
        yield s
    finally:
        s.close()
