import {TeamOverview, Teams, UserOverview} from '@Pages';

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
