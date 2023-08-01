import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./register.module.css";
import { useForm } from "react-hook-form";
import { authServices } from "../../http/auth-services";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const data = await authServices.registerServices(values);
    navigate("/auth/sign-in")
    console.log("data>>>", data);
  };

  


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
    
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <TextField
          className={styles.field}
          type="text"
          label="FullName"
          variant="standard"
          fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите полное имя" })}
        />
        <TextField
          className={styles.field}
          type="email"
          label="E-Mail"
          variant="standard"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите Почту" })}
        />
        <TextField
          className={styles.field}
          type="password"
          label="Password"
          variant="standard"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
        />
      
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};

export default Register;