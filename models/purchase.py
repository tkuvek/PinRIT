from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, Date, insert, update, String, cast
from sqlalchemy.orm import relationship, backref

from utils.db_conn import Base
from .user import User


class Purchase(Base):
    __schema__ = 'pinRIT'
    __tablename__ = 'purchase'

    id = Column(Integer, primary_key=True)
    uname = Column(String, ForeignKey(User.username))
    pixel_id = Column(Integer)
    pdate = Column(Date)

    owner = relationship(User, backref=backref('pixels', lazy='dynamic'))

    def __repr__(self):
        return "<Purchase(id='{}', uname='{}', pixel_id='{}', pdate='{}')>".format(
            self.id,
            self.uname,
            self.pixel_id,
            self.pdate
        )


def get_pixels(session, user):
    p = session.query(Purchase).filter_by(uname=user).all()
    return p

def get_owner(session, pid):
    p = session.query(Purchase.uname).filter_by(pixel_id=pid).all()
    return p

def create_pixel(session, user, pid):
    exists = session.query(Purchase).filter_by(pixel_id=int(pid)).first()

    if exists:
        session.execute(update(Purchase.__table__)
        .where(
            Purchase.pixel_id==int(pid)
        ).values(
            uname=user,
            pdate=datetime.now()
        ))
    else:
        session.execute(insert(Purchase.__table__).values(
                uname=user,
                pixel_id=int(pid)
        ))
