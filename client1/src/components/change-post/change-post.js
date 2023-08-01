


import React, { useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import styles from "./change-post.module.css";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postServices } from '../../http/post-services';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const ChangePost = () => {
  const { user } = useSelector((state) => state.authReducer);
  const userId = user._id;
  const { postId } = useParams();
  const navigate = useNavigate();
  
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await postServices.getPostById(postId);
        const { description } = response.data;
       
        setValue("description", description);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [postId, setValue]);

  const handleUpdatePost = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append('owner', userId);
     
      formData.append('description', data.description);

      const updateData = await postServices.updatePost(postId, formData);
      console.log("response update>>>>", updateData);
      navigate(`/posts`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(handleUpdatePost)} encType="multipart/form-data">
        <TextField
          className={styles.field}
          label="Description"
          multiline
          rows={5}
          fullWidth
          {...register("description")}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Обновить пост
        </Button>
      </form>
    </Paper>
  );
};

export default ChangePost;