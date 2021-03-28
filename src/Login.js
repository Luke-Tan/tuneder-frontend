import { useEffect, useState } from 'react'
import { Card, Form, Input, Button, Checkbox } from 'antd';
import Register from './Register'
import firebase from "firebase/app";
import "firebase/auth";
import { Image } from 'antd';

export function Logo() {
  return (
    <img
      style={{marginBottom: '24px'}}
      width={400}
      src="../tunederlogo.jpeg"
    />
  );
}

const Demo = ({setIsLoggedIn}) => {
  const [isRegistering, setIsRegistering] = useState(false)

  const onFinish = (values: any) => {
  	console.log(values)
  };

  const onFinishFailed = (errorInfo: any) => {
   
  };

  const login = () => {
  	const email = document.getElementById('username').value
  	const password = document.getElementById('password').value

	firebase.auth().signInWithEmailAndPassword(email, password)
	  .then((userCredential) => {
	    // Signed in 
	    const user = userCredential.user;
	    // ...
	  })
	  .catch((error) => {
	    const errorCode = error.code;
	    const errorMessage = error.message;
	    alert(error.message)
	  });
  }

  const register = () => {
  	setIsRegistering(true)
  }

  return (
  	<>
  		{
  			isRegistering ? <Register/> :
		  	<div style={{backgroundColor:'#b6e9fb',height:'100%',alignItems: 'center', justifyContent:'center'}}>
		  		<Logo/>
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

				      <Form.Item>
				        <Button onClick={login} type="primary" htmlType="submit">
				          Login
				        </Button>

				        <Button onClick={register} style={{left: '25px'}} type="primary">
				          Don't have an account?
				        </Button>
				      </Form.Item>
				    </Form>  		
			  	</Card>  		
		  	</div>
	  	}
  	</>
  );
};

export default Demo