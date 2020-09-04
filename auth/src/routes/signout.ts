/* 
  to sign out, send back a header that's gonna tell the browser to dump the cookie
*/

import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
