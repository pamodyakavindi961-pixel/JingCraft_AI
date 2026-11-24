import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import AboutPage from '../pages/about/AboutPage'
import DesignStudioPage from '../pages/design-studio/DesignStudioPage'
import HeritagePage from '../pages/heritage/HeritagePage'
import HomePage from '../pages/home/HomePage'
import MuseumPage from '../pages/museum/MuseumPage'
import DesignSystemPage from '../pages/design-system/DesignSystemPage'
import LoginPage from '../pages/auth/LoginPage'

// Keep page routes centralized for easier maintenance.
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/museum',
        element: <MuseumPage />,
      },
      {
        path: '/design-studio',
        element: <DesignStudioPage />,
      },
      {
        path: '/heritage',
        element: <HeritagePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        // Internal design system preview route for development and testing.
        path: '/design-system',
        element: <DesignSystemPage />,
      },
    ],
  },
])

export default router
