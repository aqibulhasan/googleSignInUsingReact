import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

function App() {
    const [profile, setProfile] = useState([]);
    const [token, setToken] = useState([]);
    const clientId =
        "228665443829-0ei08fbh04okh1fd7nbju4lvj7oc1c3i.apps.googleusercontent.com";
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            });
        };
        gapi.load("client:auth2", initClient);
    });

  const onSuccess = (res) => {
    console.log(res);
    console.log(res.tokenObj);
      setProfile(res.profileObj);
      setToken(res.tokenObj);
    };

    const onFailure = (err) => {
        console.log("failed", err);
    };

    const logOut = () => {
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <p>{token.id_token}</p>

                    <br />
                    <br />
                    <GoogleLogout
                        clientId={clientId}
                        buttonText="Log out"
                        onLogoutSuccess={logOut}
                    />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                />
            )}
        </div>
    );
}
export default App;
