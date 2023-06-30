import React, { useState } from 'react';
//import axios from 'axios';
import { useSignup } from '../hooks/useSignup';
import { useLogin } from '../hooks/useLogin';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';


function LoginRegister() {

  const [justifyActive, setJustifyActive] = useState('tab1');
  const {signup, error, isLoading} = useSignup()
  const {login, errorLogin, isLoadingLogin} = useLogin()

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const [loginForm, setSingupForm] = useState({
    email: '',
    password: ''
  })
  

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };



    //Form signup submit
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log("acaaaa form data", formData)
      await signup(formData);
      
    };
    //For login submit
    const handleLoginSubmit = async (event) => {
      event.preventDefault();
      console.log("aca login",loginForm)
      await login(loginForm)
    };




  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

          <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' name='email' type='email' value={loginForm.email} onChange={(e) => setSingupForm({...loginForm, email: e.target.value})}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' name='password' type='password' value={loginForm.password} onChange={(e) => setSingupForm({...loginForm, password: e.target.value})}/>

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4 w-100" disabled={isLoadingLogin}>Sign in</MDBBtn>
            {errorLogin && <div className='loginError'>{errorLogin}</div>}
            
            
          </form>

          <p className="text-center">Not a member? <a href="">Register</a></p>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <div className="text-center mb-3">
            <p>Sign un with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>
          <form onSubmit={handleFormSubmit}>
            <MDBInput wrapperClass='mb-4' label='Name' id='form1' name='name' type='text' value={formData.name} onChange={(e)=> setFormData({...formData, name: e.target.value})} />
            <MDBInput wrapperClass='mb-4' label='Username' id='form1' name='username' type='text' value={formData.username} onChange={(e)=> setFormData({...formData, username: e.target.value})}/>
            <MDBInput wrapperClass='mb-4' label='Email' id='form1' name='email' type='email' value={formData.email} onChange={(e)=> setFormData({...formData, email: e.target.value})}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form1' name='password' type='password' value={formData.password} onChange={(e)=> setFormData({...formData, password: e.target.value})}/>

            <div className='d-flex justify-content-center mb-4'>
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
            </div>

            <MDBBtn className="mb-4 w-100" disabled={isLoading}>Sign uppp</MDBBtn>
            {error && <div className='signupError'>{error}</div>}
          </form>


        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default LoginRegister;