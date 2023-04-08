from sqlalchemy import Column, Integer, ForeignKey, Date
from sqlalchemy.orm import relationship, backref

from ..utils.db_conn import Base, Session
from user import User


class Purchase(Base):
    __tablename__ = "purchase"
    id = Column(Integer, primary_key=True)
    user_id = Column(ForeignKey(User.id), Integer)
    pixel_id = Column(Integer)
    pdate = Column(Date)

    owner = relationship(User, backref=backref('pixels', lazy='dynamic'))

    def __repr__(self):
        return "<Purchase(id='{}', user_id='{}', pixel_id='{}')>".format(
            self.id,
            self.user_id,
            self.pixel_id,
        )

def get_all(user):
    session = Session()
    p = session.query(Purchase).filter_by(user_id=user.id).all()
    print(p)
    return p
