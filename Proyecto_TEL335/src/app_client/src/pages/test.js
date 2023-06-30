import React, { useState } from 'react';
import axios from 'axios';
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
  const [backendError, setError] = useState(null)

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

  //For sign up Form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //Form login form
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setSingupForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //For sign up submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/user/signup', formData)
      .then(response => {
        console.log('Registration successful:', response.data);
      })
      .catch(error => {
        console.error('Registration error:', error);
      });
    
  };
  //For login submit
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/user/login', loginForm)
      .then(response => {
        console.log('Logged successful:', response.data);
      })
      .catch(error => {
        if (error.response) {
          setError(JSON.stringify(error.response.data))
          console.error('Login error:', error.response.data);
        } else {
          setError(error.response.data)
          console.log(error)
          console.error('Error:', error.message);
        }
      });
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
            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' name='email' type='email' value={FormData.email} onChange={handleLoginChange}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' name='password' type='password' value={FormData.password} onChange={handleLoginChange}/>

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
            {backendError && <div className="text-danger">{backendError}</div>}
            
          </form>

          <p className="text-center">Not a member? <a href="#!">Register</a></p>

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
            <MDBInput wrapperClass='mb-4' label='Name' id='form1' name='name' type='text' value={FormData.Name} onChange={handleInputChange} />
            <MDBInput wrapperClass='mb-4' label='Username' id='form1' name='username' type='text' value={FormData.username} onChange={handleInputChange}/>
            <MDBInput wrapperClass='mb-4' label='Email' id='form1' name='email' type='email' value={FormData.email} onChange={handleInputChange}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form1' name='password' type='password' value={FormData.password} onChange={handleInputChange}/>

            <div className='d-flex justify-content-center mb-4'>
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
            </div>

            <MDBBtn className="mb-4 w-100">Sign uppp</MDBBtn>
          </form>


        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default LoginRegister;