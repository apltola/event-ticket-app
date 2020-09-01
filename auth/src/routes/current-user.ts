import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('CURRENT_USER');
});

export { router as currentUserRouter };
