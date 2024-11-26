import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from './components/ui/sonner';
import Header from './components/ui/custom/Header';
import App from './App.jsx';
import CreateTrip from './create-trip';
import ViewTrip from './view-trip/[tripId]/ViewTrip';
import MyTrips from './my-trips';

// Layout Component to Persist Header
function Layout() {
  return (
    <>
      <Header /> {/* Persistent Header */}
      <Toaster />
      <Outlet /> {/* Render the routed component */}
    </>
  );
}

// Router Configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Wrap routes with the Layout
    children: [
      { path: '/', element: <App /> },
      { path: '/create-trip', element: <CreateTrip /> },
      { path: '/view-trip/:tripId', element: <ViewTrip /> },
      { path: '/my-trips', element: <MyTrips /> },
    ],
  },
]);

// Render Application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
