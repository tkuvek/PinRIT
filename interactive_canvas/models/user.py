from sqlalchemy import Column, String, Integer, insert

from utils.db_conn import Base


class User(Base):
    __schema__ = 'pinRIT'
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    metamask_id = Column(String)

    def __repr__(self):
        return "<User(id='{}', username='{}', password='{}', metamask_id='{})>".format(
            self.id,
            self.username,
            self.password,
            self.metamask_id
        )


def get_user(session, uname):
    user = session.query(User).filter_by(username=uname).first()
    print(user)
    return user


def create_user(session, uname, pword):
    user = session.execute(insert(User.__table__).values(
                        username=uname,
                        password=pword
                    ))