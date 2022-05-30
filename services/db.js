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
  const schoolTable = `CREATE TABLE IF NOT EXISTS
      fuck(
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(128) NOT NULL,
        student_age INT NOT NULL,
        student_class VARCHAR(128) NOT NULL,
        parent_contact VARCHAR(128) NOT NULL,
        admission_date VARCHAR(128) NOT NULL
      )`;
  pool
    .query(schoolTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// const firstTest = () => {
//   const usersTable = `CREATE TABLE IF NOT EXISTS
//     users(
//       user_id UUID DEFAULT gen_random_uuid(),
//       username VARCHAR(20) NOT NULL,
//       email VARCHAR(150) NOT NULL,
//       password VARCHAR(50) NOT NULL,
//       name VARCHAR(30) NOT NULL,
//       location VARCHAR(50),
//       bio VARCHAR(128),
//       avatar VARCHAR(128),
//       PRIMARY KEY (user_id)
//     )`;
//   const postsTable = `CREATE TABLE IF NOT EXISTS
//     posts(
//       post_id INT GENERATED ALWAYS AS IDENTITY,
//       user_id UUID NOT NULL,
//       image VARCHAR(128) NOT NULL,
//       location VARCHAR(50),
//       caption VARCHAR(300),
//       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//       PRIMARY KEY(post_id),
//       CONSTRAINT fk_user
//         FOREIGN KEY(user_id)
//           REFERENCES users(user_id)
//     )`;
//   const commentsTable = `CREATE TABLE IF NOT EXISTS
//       comments(
//         comment_id INT GENERATED ALWAYS AS IDENTITY,
//         post_id INT NOT NULL,
//         author_id UUID NOT NULL,
//         author_avatar VARCHAR(128),
//         text VARCHAR(100) NOT NULL,
//         reply_to INT,
//         PRIMARY KEY(comment_id),
//         CONSTRAINT fk_author
//           FOREIGN KEY(author_id)
//             REFERENCES users(user_id)
//       )`;
//   const followsTable = `CREATE TABLE IF NOT EXISTS
//         follows(
//           follow_id INT GENERATED ALWAYS AS IDENTITY,
//           follower_id UUID NOT NULL,
//           following_id UUID NOT NULL,
//           PRIMARY KEY(follow_id),
//           FOREIGN KEY (follower_id) REFERENCES users(user_id),
//           FOREIGN KEY (following_id) REFERENCES users(user_id)
//         )`;
//   // const postLikes = `CREATE TABLE IF NOT EXISTS
//   //         postLikes(
//   //           like_id INT GENERATED ALWAYS AS IDENTITY,
//   //           user_id UUID NOT NULL,
//   //           post_id UUID NOT NULL,
//   //           PRIMARY KEY(like_id),
//   //           FOREIGN KEY (user_id) REFERENCES users(user_id),
//   //           FOREIGN KEY (post_id) REFERENCES posts(post_id)
//   //         )
//   // `;
//   // const commentLikesTable = `CREATE TABLE IF NOT EXISTS
//   //         commentLikes(
//   //           like_id INT GENERATED ALWAYS AS IDENTITY,
//   //           user_id UUID NOT NULL,
//   //           comment_id UUID NOT NULL,
//   //           PRIMARY KEY(like_id),
//   //           FOREIGN KEY (user_id) REFERENCES users(user_id),
//   //           FOREIGN KEY (comment_id) REFERENCES comments(comment_id)
//   //         )`;

//   pool.query(usersTable, (err, res) => {
//     console.log("fucl");
//     console.log(err, res, "users");
//     pool.query(postsTable, (err, res) => {
//       console.log(err, res, "posts");
//       pool.query(commentsTable, (err, res) => {
//         console.log(err, res, "comments");
//         pool.query(followsTable, (err, res) => {
//           console.log(err, res, "follows");
//           pool.end;
//         });
//       });
//     });
//   });

//   // pool
//   //   .query(usersTable)
//   //   .then((res) => {
//   //     console.log(res, "yp");
//   //   })
//   //   .catch((err) => {
//   //     console.log(err, "users table ERROR");
//   //     pool.end();
//   //   });
//   // pool
//   //   .query(postsTable)
//   //   .then((res) => {
//   //     console.log(res);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err, "posts table ERROR");
//   //     pool.end();
//   //   });
//   // pool
//   //   .query(commentsTable)
//   //   .then((res) => {
//   //     console.log(res);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err, "COMMENTS TABLE ERRROR");
//   //     pool.end();
//   //   });
//   // pool
//   //   .query(followsTable)
//   //   .then((res) => {
//   //     console.log(res);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err, "follows TABLE ERRROR");
//   //     pool.end();
//   //   });
// };
pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});
console.log("yooo");
//export pool and createTables to be accessible  from an where within the application
module.exports = {
  createTables,
  pool,
};

require("make-runnable");
