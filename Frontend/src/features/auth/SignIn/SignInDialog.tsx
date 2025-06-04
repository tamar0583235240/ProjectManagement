// src/features/auth/SignInDialog.tsx
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ForgotPasswordDialog from "../../../components/ForgotPasswordDialog";
import SignInForm from "./SignInForm";

interface SignInDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const SignInDialog: React.FC<SignInDialogProps> = ({ open, onClose, onSuccess }) => {
  const [showForgotDialog, setShowForgotDialog] = useState(false);

  const handleForgotClick = () => {
    setShowForgotDialog(true);
  };

  const handleForgotClose = () => {
    setShowForgotDialog(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Please enter your credentials to sign in.
          </Typography>
          <SignInForm onClose={onClose} onSuccess={onSuccess} onForgotClick={handleForgotClick} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <ForgotPasswordDialog open={showForgotDialog} onClose={handleForgotClose} />
    </>
  );
};

export default SignInDialog;
