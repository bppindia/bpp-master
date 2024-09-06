import React, { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import PrivateRoute from './privateRoute';  // Import the private route component

const DashboardLayout = lazy(() => import('@/components/layout/dashboard-layout'));
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));
const StudentDetailPage = lazy(() => import('@/pages/students/StudentDetailPage'));
const FormPage = lazy(() => import('@/pages/form'));
const NotFound = lazy(() => import('@/pages/not-found'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <PrivateRoute>  {/* Protecting dashboard routes */}
          <DashboardLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        { element: <DashboardPage />, index: true },
        { path: 'Enroll', element: <StudentPage /> },
        { path: 'student/details', element: <StudentDetailPage /> },
        { path: 'form', element: <FormPage /> },
      ]
    }
  ];

  const publicRoutes = [
    { path: '/login', element: <SignInPage />, index: true },
    { path: '/404', element: <NotFound /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
