import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {login} from '../Redux/authSlice'
// Component Imports
import LoginForm from "../components/LoginForms/LoginForm";
import ForgotPasswordForm from "../components/LoginForms/ForgotPasswordForm";
import ResetPasswordForm from "../components/LoginForms/ResetPasswordForm";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");

  const handleLoginSuccess = (email) => {
    toast.success(`Welcome back, ${email}!`);
    navigate("/admin");
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-md">
          {step === "login" && (
            <LoginForm
              dispatch={dispatch}
              loading={loading}
              error={error}
              setStep={setStep}
              onSuccess={handleLoginSuccess}
              setEmail={setEmail}
            />
          )}

          {step === "forgot" && (
            <ForgotPasswordForm
              setStep={setStep}
              email={email}
              setEmail={setEmail}
              dispatch={dispatch}
            />
          )}

          {step === "reset" && (
            <ResetPasswordForm
              setStep={setStep}
              email={email}
              dispatch={dispatch}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
