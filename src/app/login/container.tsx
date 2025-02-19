"use client";

import React, { useState } from "react";
import { LoginPresentation } from "./presentation";

const LoginContainer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aqui você pode inserir a lógica de autenticação com shadcn ou uma API de login.
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  return (
    <LoginPresentation
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginContainer;
