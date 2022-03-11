import eventsRouter from '@modules/events/routes/events.routes';
import adminRouter from '@modules/users/routes/admin.user.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/events', eventsRouter);
routes.use('/admin', adminRouter);

export default routes;
