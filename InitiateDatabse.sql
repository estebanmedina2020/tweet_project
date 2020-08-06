CREATE TABLE user
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
);

CREATE TABLE tweets
(
    id SERIAL PRIMARY KEY,
    content VARCHAR(120) NOT NULL,
    date TIMESTAMP,
    authorId INT references users(id)
);