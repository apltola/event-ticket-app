/*
  check if user's request headers has cookie with valid jwt
  if not, return null
  if yes, return currentUser info from jwt
  this route is needed because React App cannot access the cookie to validate auth
*/

import express from 'express';
import { currentUser } from '@allutickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
