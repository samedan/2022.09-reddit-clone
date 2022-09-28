import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Grid, Snackbar, Alert } from "@mui/material";
import { useUser } from "../context/AuthContext";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import { useRouter } from "next/router";

interface IFormInput {
  username: string;
  // email: string;
  password: string;
  // iceCreamType: { label: string; value: string };
}

export default function Login() {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const [signInError, setSignInError] = useState<string>("");

  const router = useRouter();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  // const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await Auth.signIn(data.username, data.password);
      router.push("/");
    } catch (error) {
      setSignInError(error.message);
      setOpen(true);
    }
  };

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 20, backgroundColor: "gray", padding: 15 }}
      >
        <Grid item>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            error={errors.username ? true : false}
            type="text"
            style={{
              // border: "1px dashed #666666",
              backgroundColor: "#0d1218",
              color: "white",
              marginBottom: 15,
            }}
            helperText={errors.username ? errors.username.message : null}
            {...register("username", {
              // required: { value: true, message: "Please enter a username" },
              // minLength: {
              //   value: 3,
              //   message: "Please enter a username between 3-16 characters",
              // },
              // maxLength: {
              //   value: 16,
              //   message: "Please enter a username between 3-16 characters",
              // },
            })}
          />
        </Grid>

        <Grid item>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            error={errors.password ? true : false}
            type="password"
            style={{
              // border: "1px dashed #666666",
              backgroundColor: "#0d1218",
              color: "white",
            }}
            helperText={errors.password ? errors.password.message : null}
            {...register("password", {
              // required: { value: true, message: "Please enter a password" },
              // minLength: {
              //   value: 8,
              //   message: "Please enter a password with at least 8 characters",
              // },
            })}
          />
        </Grid>

        <Grid style={{ marginTop: 16 }}>
          <Button variant="contained" type="submit">
            Sign In
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {signInError}
        </Alert>
      </Snackbar>
    </form>
  );
}
