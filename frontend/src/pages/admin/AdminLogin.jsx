import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { bgGradient } from "../../constants/color";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";


const LinkButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin-top: 10px; 
  padding: 12px 24px;
  color: black; 
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  border: none;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.main};
    color: white; /* Text color on hover */
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "16px",
            transition: "transform 0.3s, box-shadow 0.3s",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />

            <Button
              sx={{
                marginTop: "1rem",
              }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
          <LinkButton component={RouterLink} to="/login" underline="none" color="inherit">
            Go to Normal Login
          </LinkButton>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
