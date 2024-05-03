import userController from '../controllers/userController';
import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.send('home page');
});

router.get('/api/users', userController.getUsers);

export default router;
