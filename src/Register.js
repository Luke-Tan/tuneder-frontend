import { useEffect, useState } from 'react'
import { Card, Form, Input, Button, Checkbox } from 'antd';
import Register from './Register'
import firebase from "firebase/app";
import "firebase/auth";
import axios from 'axios'

const Demo = ({setIsLoggedIn}) => {
  const [playlists, setPlaylists] = useState([1,1,1])

  const onFinish = (values: any) => {
  	const { name,email,password,instagram,facebook } = values
  	console.log(values)
  	let playlistLinks = []
    for(let i = 0; i < playlists.length; i++){
    	const playlist = values["playlist" + i]
    	playlistLinks.push(playlist)
    }

    console.log(playlists)

	firebase.auth().createUserWithEmailAndPassword(email, password)
	  .then((userCredential) => {
	    // Signed in 
	    const user = userCredential.user;
	    console.log(user)
		axios.post('http://tuneder.herokuapp.com/createuser', {
		    name,
		    id: user.uid,
		    playlists:playlistLinks,
		    socials: {
		    	facebook,
		    	instagram
		    }
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	  })
	  .catch((error) => {
	    const errorCode = error.code;
	    const errorMessage = error.message;
	    alert(error.message)
	  });
  };

  const onFinishFailed = (errorInfo: any) => {
   
  };

  const addPlaylist = () => {
  	setPlaylists([...playlists, 1])
  }

 

  return (
	  	<div style={{height:'100%',alignItems: 'center', justifyContent:'center'}}>
		  	<Card style={{width: '60%'}}>
			    <Form
			      name="basic"
			      initialValues={{ remember: true }}
			      onFinish={onFinish}
			      onFinishFailed={onFinishFailed}
			    >
			      <Form.Item
			        label="Email"
			        name="email"
			      >
			        <Input id="email"/>
			      </Form.Item>

			      <Form.Item
			        label="Password"
			        name="password"
			      >
			        <Input.Password id="password"/>
			      </Form.Item>
			      <Form.Item
			        label="Name"
			        name="name"
			      >
			        <Input id="name"/>
			      </Form.Item>
			      <Form.Item
			        label="Instagram"
			        name="instagram"
			      >
			        <Input id="instagram"/>
			      </Form.Item>

			      <Form.Item
			        label="Facebook"
			        name="facebook"
			      >
			        <Input id="facebook"/>
			      </Form.Item>

			      {
			      	playlists.map((playlist, index) => {
				      return(<Form.Item
				      	key={"playlist" + (index +1)}
				        label={"Playlist " + (index + 1)}
				        name={"playlist" + (index +1)}
				      >
				        <Input id={"playlist" + (index +1)}/>
				      </Form.Item>)
			      	})
			      }
				  <Button onClick={addPlaylist} style={{left: '25px'}} type="primary">
				  	Add Playlist
				  </Button>
			      <Form.Item style={{marginTop:'20px'}}>
			        <Button style={{left: '25px'}} type="primary" htmlType="submit">
			          Register
			        </Button>
			      </Form.Item>

			    </Form>  		
		  	</Card>  		
	  	</div>
  );
};

export default Demo