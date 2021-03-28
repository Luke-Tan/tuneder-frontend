import './App.css'
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import axios from 'axios'

import Chat from './Chat'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SelectedListItem({user, isHidden}) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.post('http://tuneder.herokuapp.com/matches', {
      swiper: user
    }).then(function (response) {
      const resp = response.data
      const matches = []
      resp.forEach(match => {
        matches.push(match)
      });
      console.log(matches);
      console.log(selectedIndex)
      setMatches(matches);
    }).catch(err => {
      console.log(err);
    })
  }, [])


  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={'matches-page'} style={{display: `${isHidden == 1 ? 'flex' : 'none'}`}}>
      <div style={{flex: 1, width:'100%', padding: '5%', flexDirection:'row',display:'flex'}}>
        <List style={{
          height:'100%',
          padding:'0',
          borderTopLeftRadius:'20px',borderBottomLeftRadius:'20px',
          width:'256px', alignSelf:'flex-start',backgroundColor:'white',
          }}component="nav" aria-label="main mailbox folders">
          {matches.map((match,index) => 
            <ListItem
              style={{paddingLeft: '44px', 'paddingRight': '44px'}}
              button
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemText primary={match.name} />
            </ListItem>
          )}
        </List>  
        <Chat user={user} chatee={matches.length == 0 ? 'null' : matches[selectedIndex].id}/>
      </div>
    </div>
  );
}