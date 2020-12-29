DROP DATABASE IF EXISTS sweforumdb; 
CREATE DATABASE sweforumdb;
\c sweforumdb;


CREATE TABLE subforums (
  forum_id SERIAL PRIMARY KEY,
  forum_name VARCHAR(200)
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  email_verified BOOLEAN
);

CREATE TABLE posts (
  p_id SERIAL PRIMARY KEY,
  forum_id INT REFERENCES subforums(forum_id),
  title VARCHAR(255),
  content VARCHAR,
  user_id INT REFERENCES users(user_id),
  username VARCHAR REFERENCES users(username),
  date_created TIMESTAMP,
  data_lastUpdated TIMESTAMP
);

CREATE TABLE comments (
  c_id SERIAL PRIMARY KEY,
  post_id INT REFERENCES posts(p_id),
  parent_comment_id INT REFERENCES comments(c_id),
  content VARCHAR,
  user_id INT REFERENCES users(user_id),
  username VARCHAR REFERENCES users(username),
  date_created TIMESTAMP,
  data_lastUpdated TIMESTAMP
);


