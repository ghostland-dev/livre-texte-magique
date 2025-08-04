import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { MainApp } from "@/components/MainApp";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  if (isAuthenticated) {
    return <MainApp />;
  }

  return (
    <>
      {authMode === "login" ? (
        <LoginForm
          onSuccess={() => setIsAuthenticated(true)}
          onToggleMode={() => setAuthMode("signup")}
        />
      ) : (
        <SignupForm
          onSuccess={() => setIsAuthenticated(true)}
          onToggleMode={() => setAuthMode("login")}
        />
      )}
    </>
  );
};

export default Index;
