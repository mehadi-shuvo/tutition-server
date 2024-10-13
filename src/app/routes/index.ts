import { Router } from 'express';
import { userRouter } from '../../modules/user/user.route';
import { teacherRoutes } from '../../modules/teacher/teacher.route';
import { studentRoute } from '../../modules/student/student.route';
import { postRouts } from '../../modules/post/post.route';
import { districtRoute } from '../../modules/districts/districts.routes';
import { blogRoutes } from '../../modules/blog/blog.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/teacher',
    route: teacherRoutes,
  },
  {
    path: '/student',
    route: studentRoute,
  },
  {
    path: '/post',
    route: postRouts,
  },
  {
    path: '/district',
    route: districtRoute,
  },
  {
    path: '/blog',
    route: blogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
