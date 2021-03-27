import { useEffect, useState } from 'react'
import { Card, Form, Input, Button, Checkbox } from 'antd';
import Register from './Register'
import firebase from "firebase/app";
import "firebase/auth";
import axios from 'axios'

const Demo = ({setIsLoggedIn}) => {
  const [playlists, setPlaylists] = useState([1,1,1])

  const onFinish = (values: any) => {
  };

  const onFinishFailed = (errorInfo: any) => {
   
  };

  const addPlaylist = () => {
  	setPlaylists([...playlists, 1])
  }

  const register = () => {
  	const email = document.getElementById('username').value
  	const password = document.getElementById('password').value
	firebase.auth().createUserWithEmailAndPassword(email, password)
	  .then((userCredential) => {
	    // Signed in 
	    const user = userCredential.user;
	    console.log(user)
	    let playlists = []
	    for(let i = 0; i < playlists.length; i++){

	    }
		axios.post('http://localhost:4000', {
		    firstName: 'Fred',
		    lastName: 'Flintstone'
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

	    setIsLoggedIn(true)
	    
	  })
	  .catch((error) => {
	    const errorCode = error.code;
	    const errorMessage = error.message;
	    alert(error.message)
	  });

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
			        name="username"
			      >
			        <Input id="username"/>
			      </Form.Item>

			      <Form.Item
			        label="Password"
			        name="password"
			      >
			        <Input.Password id="password"/>
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
			        <Button onClick={register} style={{left: '25px'}} type="primary" htmlType="submit">
			          Register
			        </Button>
			      </Form.Item>

			    </Form>  		
		  	</Card>  		
	  	</div>
  );
};

export default Demo