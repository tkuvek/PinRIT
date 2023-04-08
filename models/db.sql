CREATE SCHEMA pinRIT;

CREATE TABLE pinRIT.user (
    id serial,
    username character varying UNIQUE,
    password character varying,
    metamask_id character varying,
    CONSTRAINT user_id PRIMARY KEY (id)
);

CREATE TABLE pinRIT.purchase (
    id serial,
    uname character varying,
    pixel_id integer,
    pdate date DEFAULT now(),
    CONSTRAINT purchase_id PRIMARY KEY (id),
    CONSTRAINT purchase_user_id FOREIGN KEY (uname) REFERENCES pinRIT.user(username)
);
