import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

import "./App.css";
import app from "./Firebase/firebaseinint";
const auth = getAuth(app);

function App() {
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider()
  const [user, setUser] = useState({});
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error("error : '", error);
      });
  };
  const handleSignOut = () =>{
    signOut(auth)
    .then(() =>{
      setUser({})
    })
    
    .catch(() =>{
    setUser({})
    })
  }
  const handleGitHubSignIn = () =>{
    // https://simple-firebase-authetic-b2640.firebaseapp.com/__/auth/handler?apiKey=AIzaSyCSD0QG-5_bu2kqzP6bVh7KfcdJrcO9R8c&appName=%5BDEFAULT%5D&authType=signInViaPopup&redirectUrl=http%3A%2F%2Flocalhost%3A3000%2F&v=9.12.1&eventId=8339814815&providerId=github.com
    console.log('called handleGitHubSignIn');
    signInWithPopup(auth, gitHubProvider) 
      .then( result =>{
        const user = result.user
        console.log(user);

      })
      .catch(error =>{
        console.error(error);
      

      })
    }

  

  return (
    <div className="App">
     { user.email ?
      <button onClick={handleSignOut}>Sign out</button>
      :
       <>
       <button onClick={handleGoogleSignIn}>Google Sign in</button>
       <button onClick={handleGitHubSignIn} >Git hub sign in</button>
       </>
       
      
     }
      { user.email &&
        <div>
       <h3>user name : {user.displayName}</h3> 
        <p>email address : {user.email}</p>
        <img src= {user.photoURL} alt="" />
      </div>
      }
    </div>
  );
}

export default App;
