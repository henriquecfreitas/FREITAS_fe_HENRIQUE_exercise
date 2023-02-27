import TeamOverview from '@Pages/TeamOverview';
import Teams from '@Pages/Teams';
import UserOverview from '@Pages/UserOverview';

const routes = [
  {
      path: '/',
      component: Teams,
  },
  {
      path: '/team/:teamId',
      component: TeamOverview,
  },
  {
      path: '/user/:useId',
      component: UserOverview,
  },
];

export default routes;
