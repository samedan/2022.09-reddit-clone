import React from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Grid } from "@mui/material";
import { off } from "process";

interface IFormInput {
  username: string;
  lastName: string;
  iceCreamType: { label: string; value: string };
}

export default function Signup() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  // const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Form submmitted");
    console.log(data);
  };

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <TextField
            id="username"
            label="Username"
            variant="standard"
            error={errors.username ? true : false}
            type="text"
            helperText={errors.username ? errors.username.message : null}
            {...register("username", {
              required: { value: true, message: "Please enter a username" },
              minLength: {
                value: 3,
                message: "Please enter a username between 3-16 characters",
              },
              maxLength: {
                value: 16,
                message: "Please enter a username between 3-16 characters",
              },
            })}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            error={errors.email ? true : false}
            type="email"
            helperText={errors.email ? errors.email.message : null}
            {...register("email", {
              required: { value: true, message: "Please enter a valid email" },
            })}
          />
        </Grid>
        <Grid item>
          <TextField
            id="password"
            label="Password"
            variant="standard"
            error={errors.password ? true : false}
            type="password"
            helperText={errors.password ? errors.password.message : null}
            {...register("password", {
              required: { value: true, message: "Please enter a password" },
              minLength: {
                value: 8,
                message: "Please enter a password with at least 8 characters",
              },
            })}
          />
        </Grid>
        <Grid>
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
