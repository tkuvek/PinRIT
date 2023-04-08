import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker


Base = declarative_base()
Session = sessionmaker()

def connect_db():
    engine = create_engine("cockroachdb://pinRIT:2HMcKbOxiTQFR0tkzoLNbQ@sneaky-shrimp-6916.7tc.cockroachlabs.cloud:26257/pinrit_db")
    conn = engine.connect()

    # res = conn.execute(text("SELECT now()")).fetchall()
    # print(res)

    Session.configure(bind=engine)
