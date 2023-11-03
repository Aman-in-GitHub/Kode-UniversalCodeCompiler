import { Suspense, lazy } from 'react';

import { Route, Routes } from 'react-router-dom';

const LogIn = lazy(() => import('./pages/LogIn'));
const Home = lazy(() => import('./pages/Home'));
const Compiler = lazy(() => import('./pages/Compiler'));
const Error = lazy(() => import('./pages/Error'));

import Navbar from './elements/Navbar';
import Loader from './elements/Loader';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<Loader />}>
              <LogIn />
            </Suspense>
          }
        />
        <Route
          path="compiler"
          element={
            <Suspense fallback={<Loader />}>
              <Compiler />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
