import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import moment from 'moment'
import ClearIcon from '@mui/icons-material/Clear';
import styles from "./cart-item.module.css"
import CreateIcon from '@mui/icons-material/Create'

const CartItem = (props) => {
    const { description,created,_id, user, removePost, updatePost} = props
    const date=created
  const formatDate = (date) => moment(date).format('DD, MMMM YYYY');
  const deletePost=()=>{
    removePost(_id)
  }
  const updateHandlePost = ()=>{
    updatePost(_id)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar src={user.avatarUrl} sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        
        title={user.fullName}
        subheader={formatDate(date)}
      />
     
      <div className={styles.card_content}>
       
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
     
      <CardActions style={{display:"flex", justifyContent:"space-around"}} disableSpacing>
        
        <IconButton aria-label="share">
          <CreateIcon onClick={updateHandlePost} />
        </IconButton>
        
          <IconButton aria-label="settings">
            <ClearIcon onClick={deletePost} />
          </IconButton>
        
        
      </CardActions>
    </Card>
  )
}

export default CartItem