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

    signInWithPopup(auth, gitHubProvider)
      .then( result =>{
        const user = result.user
        setUser(user);
        console.log(user);

      })
      .catch(error =>{
        console.error(error);
      

      })
    }

  

  return (
    <div className="App">
     { user.uid ?
      <button onClick={handleSignOut}>Sign out</button>
      :
       <>
       <button onClick={handleGoogleSignIn}>Google Sign in</button>
       <button onClick={handleGitHubSignIn} >Git hub sign in</button>
       </>
       
      
     }
      { user.uid &&
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
