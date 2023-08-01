import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import styles from "./post.module.css";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { postServices } from "../../http/post-services";
import Product from "../product/product";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';


const Post = () => {
  const { user } = useSelector((state) => state.authReducer);
  const userId = user._id;
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("owner", userId);
    formData.append("description", data.description);
    try {
      const response = await postServices.createPost(formData);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Paper classes={{ root: styles.root }}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <TextField
        id="input-with-icon-textfield"
        label="TextField"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
        {...register("description", { required: true })}
      />
            
        
          <Button type="submit" size="large" variant="contained" fullWidth>
            Создать пост
          </Button>
        </form>
      </Paper>
      <div>
        <Product/>
       
      </div>
    </div>
  );
};

export default Post;