// // src/features/auth/pages/SetPasswordPage.tsx
// import { useParams } from "react-router-dom";
// import { SetPasswordForm } from "../components/SetPasswordForm";

// const SetPasswordPage = () => {
//   const { token } = useParams<{ token: string }>();

//   if (!token) return <div>טוקן לא נמצא.</div>;

//   return <SetPasswordForm token={token} />;
// };

// export default SetPasswordPage;


import { useSearchParams } from "react-router-dom";
import SetPasswordForm from "../components/SetPasswordForm";
import { Typography, Container } from "@mui/material";

const SetPasswordPage=()=> {
  const [params] = useSearchParams();
  const token = params.get("token");

  if (!token) {
    return <Typography color="error">קישור שגוי - אין טוקן.</Typography>;
  }

  return (
    <Container sx={{ mt: 8 }}>
      <SetPasswordForm token={token} />
    </Container>
  );
}

export default SetPasswordPage;
