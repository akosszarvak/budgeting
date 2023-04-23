import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Spinner = lazy(() => import("./components/Spinner"));

function App() {
  const { user } = useAuthContext();
  return (
    <div className="px-auto mx-auto flex min-h-screen min-h-screen flex-col bg-slate-50 dark:bg-gray-900">
      <Router>
        <div className="container mx-auto bg-slate-50">
          <Header />
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/transactions"
                element={user ? <Transactions /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
            </Routes>
          </Suspense>
        </div>
      </Router>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
