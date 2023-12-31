import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { getAllUsers } from '../Firebase/fbUsers';
import { Button } from '@material-ui/core';
import { LogOutUser } from '../Firebase/Authentication';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase'; 
import { chatMessages } from '../Firebase/userChat';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '98%',
    height: '90vh',
    margin:  "12px"
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const Chat = () => {
  const [users,setUsers] = useState([]);
  const [connectedUser,setConnectedUser] = useState(null);
  const [input,setInput] = useState(null);

  const classes = useStyles();

  const navigate = useNavigate();

  useEffect(()=>{
  getAllUsers()
  .then((_users) => {
    const filteredUsers = _users.filter((fUser)=> fUser.email!==auth.currentUser.email) 
    setUsers(filteredUsers)
  })
  .catch(error => console.error(error));
  },[]) 

  const handleLogout = () =>{
    LogOutUser();
    navigate('/');
  }

  const handleListClick= (listUser) =>{
    setConnectedUser(listUser)
  }

  const hadleChange = (e) =>{
    setInput(e.target.value)
  }

  const handleSend =async() =>{ 
    chatMessages(auth?.currentUser?.email,connectedUser?.email,input)
    setInput(null);
  }

  return (
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h4" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary={auth.currentUser.userName}></ListItemText>
                        <Button variant="outlined" onClick={()=>handleLogout()}>Logout</Button>
                    </ListItem>
                </List>
                <Divider />
                <Typography variant="h6" className="header-message">All Users</Typography>
                <Divider />
                <List>
                    {
                      users.map((fbuser)=><ListItem button onClick={()=>handleListClick(fbuser)}key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary={fbuser.userName}>{fbuser.userName}</ListItemText>
                        <ListItemText secondary={fbuser.isOnline ? 'online' : 'offline'} align="right"></ListItemText>
                    </ListItem>
                      )
                    }
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                            <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container style={{padding: '10px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" onChange={(e)=>hadleChange(e)} fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon onClick={()=>handleSend()} /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;