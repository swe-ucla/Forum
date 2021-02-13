DROP DATABASE IF EXISTS sweforumdb; 
CREATE DATABASE sweforumdb;
\c sweforumdb;


CREATE TABLE subforums (
  forum_id SERIAL PRIMARY KEY,
  forum_name VARCHAR(200)
);

CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  email_verified BOOLEAN,
  date_created DATE,
  last_login DATE
);

CREATE TABLE posts (
  pid SERIAL PRIMARY KEY,
  forum_id INT REFERENCES subforums(forum_id),
  title VARCHAR(255),
  body VARCHAR,
  user_id INT REFERENCES users(uid),
  username VARCHAR REFERENCES users(username),
  date_created TIMESTAMP,
  date_last_updated TIMESTAMP
);

CREATE TABLE comments (
  cid SERIAL PRIMARY KEY,
  comment VARCHAR,
  username VARCHAR REFERENCES users(username),
  user_id INT REFERENCES users(uid),
  post_id INT REFERENCES posts(pid),
  parent_comment_id INT REFERENCES comments(cid),
  date_created TIMESTAMP,
  date_last_updated TIMESTAMP
);


