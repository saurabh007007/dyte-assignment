import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthForm } from "./components/Auth/AuthForm";
import { QRCodeGenerator } from "./components/QRCode/QRCodeGenerator";
import { supabase } from "./lib/supabase";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route
            path="/auth"
            element={session ? <Navigate to="/" /> : <AuthForm />}
          />
          <Route
            path="/"
            element={session ? <QRCodeGenerator /> : <Navigate to="/auth" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
