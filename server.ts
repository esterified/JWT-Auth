import express from 'express';
import 'dotenv/config';

import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

const posts = [
  {
    username: 'Fayed',
    title: 'Post 1',
  },
  {
    username: 'Fayed2',
    title: 'Post 12',
  },
  {
    username: 'Dev',
    title: 'Post 2',
  },
];

app.get('/posts', authenticateToken, (req: any, res: any) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  console.log(process.env.ACCESS_TOKEN_SECRET, '11');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: any, user: any) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000);
