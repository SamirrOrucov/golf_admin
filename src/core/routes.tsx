import Layout from '@/core/layout';
import { Navigate, RouteObject } from 'react-router';

import SignInForm from '@/core/sign-in-form';
import Contact from '@/core/contact';
import Country from '@/core/Country/country';
import AddCountry from '@/core/Country/Add/index.jsx';
import UpdateCountry from '@/core/Country/Update/index.jsx';
import PrivateRoute from './private-route';

type RouteWithAuth = RouteObject & {
  auth?: boolean;
};

const routes: RouteWithAuth[] = [
  {
    path: '/',
    element: <Layout />,
    auth: true,
    children: [
      {
        index: true,
        element: <div>Dashboard</div>
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/country',
        element: <Country />
      },
      {
        path: '/country/add',
        element: <AddCountry />
      }, {
        path: '/country/edit/:id',
        element: <UpdateCountry />
      },
    ]
  },
  {
    path: '/sign-in',
    element: <SignInForm />
  },

  {
    path: '*',
    element: <Navigate to="/404" />
  }
];

const authMap = (routes: RouteWithAuth[]) => {
  return routes.map(route => {
    if (route?.auth) {
      route.element = <PrivateRoute>{route.element}</PrivateRoute>;
    }

    if (route?.children) route.children = authMap(route.children);

    return route;
  });
};

export default authMap(routes);
