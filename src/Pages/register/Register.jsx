import React, { useState } from "react";
import firebaseApp from '../../../services/firebase';
import { getFirestore} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [login, setLogin] = useState(false);

  const history = useNavigate();
  
  const auth = getAuth()
  const database = getFirestore(firebaseApp);

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (type == "signup") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/home");
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/home");
        })
        .catch((err) => {
          alert(err.code);
        });
    }
  };

  const handleReset = ()=>{
    history("/reset");
  }
  return (
    <div className="App">
      {/* Registration and login Screen */}
      {/* <div className="row">
        <div
          className={login == false ? "activeColor" : "pointer"}
          onClick={() => setLogin(false)}
        >
          SignUp
        </div>
        <div
          className={login == true ? "activeColor" : "pointer"}
          onClick={() => setLogin(true)}
        >
          SignIn
        </div>
      </div>
      <h1>{login ? "SignIn" : "SignUp"}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" type="text" placeholder="Password" />
        <br />
        <p onClick={handleReset}>Forgot Password?</p>
        <br />
        <button>{login ? "SignIn" : "SignUp"}</button>
      </form> */}
      <div>
        <h2>EM CONSTRUÇÃO</h2>
        <button>
          <a href="/home">HOME</a>
        </button>
      </div>
    </div>
  );
}
export default Register;