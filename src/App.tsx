import * as React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {AppContextProvider} from '@ContextProvider';

import routes from './routes';

const withAppContext = (Wraped: React.ComponentType) => (
    <AppContextProvider>
        <Wraped />;
    </AppContextProvider>
);

const App: React.FC = () => {
    const router = createBrowserRouter(routes.map(({
        path,
        component,
    }) => ({
        path,
        element: withAppContext(component),
    })));

    return <RouterProvider router={router} />;
};

export default App;
