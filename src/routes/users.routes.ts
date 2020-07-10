import { Router } from 'express';
import CreateUserSerivce from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserSerivce();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
