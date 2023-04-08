from sqlalchemy import Column, String, Integer, insert, delete

from utils.db_conn import Base


class User(Base):
    __schema__ = 'pinRIT'
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    metamask_id = Column(String)

    def __repr__(self):
        return "<User(id='{}', username='{}', password='{}', metamask_id='{}')>".format(
            self.id,
            self.username,
            self.password,
            self.metamask_id
        )


def get(session):
    user = session.query(User).all()
    print(user)
    return user


def get_user(session, uname):
    user = session.query(User).filter_by(username=uname).first()
    print(user)
    return user


def create_user(session, uname, pword):
    user = session.execute(insert(User.__table__).values(
            username=uname,
            password=pword
        ))
    session.commit()

def delete_user(session, uname):
    user = session.execute(delete(User.__table__).where(
            User.username==uname
        ))
    session.commit()