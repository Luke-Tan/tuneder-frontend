import React , {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Cards from './Cards'
import Matches from './Matches'
import firebase from 'firebase'
import Badge from '@material-ui/core/Badge';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs({user}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [notifications, setNotifications] = React.useState(0)
  let matches = undefined
  const db = firebase.firestore();

  useEffect(() => {
	  db.collection('users').doc(user)
	      .onSnapshot((doc) => {
	      	  console.log(doc.data())
	          const data = doc.data();
	          const matches = data.matches
	          updateNotifications(matches)
	      });
  }, [])

  const updateNotifications = (newMatches) => {
  	if(matches !== undefined){
  		if(matches.length !== newMatches.length){
  			setNotifications(newMatches.length - matches.length);
  			matches = newMatches
  		}
  	} else {
  		matches = newMatches
  	}
  }

  const handleChange = (event, newValue) => {
  	if(newValue == 2){
	    firebase.auth().signOut().then(() => {
	      // Sign-out successful.
	    }).catch((error) => {
	      // An error happened.
	    });
  	}
    setValue(newValue);
  };


  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Discover" {...a11yProps(0)} />
          <Tab label={<Badge badgeContent={notifications} color="secondary">
			    People
			</Badge>} {...a11yProps(1)} />
          <Tab style={{position: 'absolute', right: 0}} label="Logout"/>
        </Tabs>
      </AppBar>
      <Cards user={user} isHidden={value}/>
      <Matches user={user} isHidden={value} notifs={notifications}/>
    </>
  );
}