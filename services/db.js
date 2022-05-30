const pg = require("pg");

const config = {
  user: process.env.USER,
  database: process.env.DATABASE,
  port: 5432,
  max: 10,
  idleTimoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("connected to the database");
});

const createTables = () => {
  const userTable = `CREATE TABLE IF NOT EXISTS
      users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        email VARCHAR(30) NOT NULL,
        password VARCHAR(50) NOT NULL,
        name VARCHAR(30) NOT NULL,
        location VARCHAR(50),
        bio VARCHAR(128),
        avatar VARCHAR(128)
      )`;
  const postTable = `CREATE TABLE IF NOT EXISTS
    posts(
      post_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users (user_id),
      image VARCHAR(128) NOT NULL,
      location VARCHAR(50),
      caption VARCHAR(300),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`;
  const commentTable = `CREATE TABLE IF NOT EXISTS
      comments(
        comment_id SERIAL PRIMARY KEY,
        post_id INT REFERENCES posts (post_id),
        author_id INT REFERENCES users (user_id),
        author_avatar VARCHAR(128),
        text VARCHAR(100),
        reply_id INT REFERENCES comments (comment_id)
      )`;

  const relationshipTable = `CREATE TABLE IF NOT EXISTS
      relationships(
        follow_id SERIAL PRIMARY KEY,
        follower_id INT REFERENCES users(user_id),
        following_id INT REFERENCES users(user_id)
      )`;
  const postLikes = `CREATE TABLE IF NOT EXISTS
      post_likes(
        like_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        post_id INT REFERENCES posts (post_id)
      )`;
  const commentLikesTable = `CREATE TABLE IF NOT EXISTS
      comment_likes(
        like_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        comment_id INT REFERENCES comments(comment_id)
      )`;

  pool
    .query(userTable)
    .then((res) => {
      console.log(res, "response FROM USER TABLE");
      return pool.query(postTable);
    })
    .then((res) => {
      console.log(res, "response from POST TABLE");
      return pool.query(commentTable);
    })
    .then((res) => {
      console.log(res, "response from COMMENT TABLE");
      return pool.query(relationshipTable);
    })
    .then((res) => {
      console.log(res, "response from RELATIONSHIP TABLE");
      return pool.query(postLikes);
    })
    .then((res) => {
      console.log(res, "response from POST-LIKES TABLE");
      return pool.query(commentLikesTable);
    })
    .then((res) => {
      console.log(res, "RESPONSE FROM COMMENT-LIKES TABLE");
      pool.end();
    })
    .catch((err) => {
      console.log(err, "ERROR!!!!!!");
      pool.end();
    });
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});
//export pool and createTables to be accessible  from an where within the application
module.exports = {
  createTables,
  pool,
};

require("make-runnable");
