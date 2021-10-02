import Data from "./Data";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { auth, provider } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  const sigIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        setUser(user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      {user ? (
        <>
          <Header photoURL={user.photoURL} />
          <div className="App">
            <Sidebar />
            <Data />
          </div>
        </>
      ) : (
        <div className="login">
          <img
            src="https://assets.99sme.sg/images/detailed/512/logo_lockup_drive_icon_vertical.png"
            alt="img"
            width="200px"
          />
          <button onClick={sigIn}>Login</button>
        </div>
      )}
    </>
  );
}

export default App;
