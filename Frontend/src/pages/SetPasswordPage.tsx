// src/features/auth/pages/SetPasswordPage.tsx
import { useParams } from "react-router-dom";
import { SetPasswordForm } from "../components/SetPasswordForm";

const SetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();

  if (!token) return <div>טוקן לא נמצא.</div>;

  return <SetPasswordForm token={token} />;
};

export default SetPasswordPage;
