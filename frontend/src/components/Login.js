import React from 'react'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

function Login() {

    const responseSuccessGoogle=  googleData=>{
        



       axios({
           method:"POST",
           url:"http://localhost:8070/user/googlelogin",
           body: JSON.stringify({
            token: googleData.tokenId
            
   
        }),
        headers: {
            "Content-Type": "application/json"
          }
})
    }

    const responseFailureGoogle=(response)=>{
        console.log("Not success"+response);
    }
    return (
        <div>
             <GoogleLogin
     clientId="412393827843-tnn3gfd4qjnuhb2oohinrc09svdvvr9o.apps.googleusercontent.com"
    buttonText="Login with Google"
    onSuccess={responseSuccessGoogle}
    onFailure={responseFailureGoogle}
    cookiePolicy={'single_host_origin'}
  />
        </div>
    )
}

export default Login
