const express = require('express');
const { TeamMember } = require('./model');

const app = express();

app.use(express.json());

app.get('/team', async (req, res, next) => {
  const team = await TeamMember.findAll();
  return res.json(team);
});

app.post('/newmember', async (req, res, next) => {
  const body = req.body;
  const newMember = await TeamMember.create({
    firstName: body.firstName,
    lastName: body.lastName,
    title: body.title,
    photoUrl: body.photoUrl,
    favoriteColor: body.favoriteColor,
    story: body.story
  });

  res.send(newMember);
});

module.exports = app;
