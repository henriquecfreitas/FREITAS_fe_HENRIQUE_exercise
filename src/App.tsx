import * as React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {AppContextProvider} from '@ContextProvider';

import TeamOverview from '@Pages/TeamOverview';
import Teams from '@Pages/Teams';
import UserOverview from '@Pages/UserOverview';

const App = () => {
    var router = createBrowserRouter([
        {
            path: '/',
            element: <Teams />,
        },
        {
            path: '/team/:teamId',
            element: <TeamOverview />,
        },
        {
            path: '/user/:useId',
            element: <UserOverview />,
        },
    ]);
    return (
        <AppContextProvider>
            <RouterProvider router={router} />;
        </AppContextProvider>
    )
};

export default App;
