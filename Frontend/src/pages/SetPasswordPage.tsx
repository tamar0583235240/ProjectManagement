
import { useParams } from "react-router-dom";
import SetPasswordForm from "../components/SetPasswordForm";
import { Typography, Container } from "@mui/material";

const SetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();

  if (!token) {
    return <Typography color="error">Invalid link - no token.</Typography>;
  }

  return (
    <Container sx={{ mt: 8 }}>
      <SetPasswordForm token={token} />
    </Container>
  );
};

export default SetPasswordPage;
