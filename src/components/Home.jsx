import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { Context } from "../store/Context";
import config from "../config.json";

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();
  const responseHandler = (response) => {
    const { givenName, imageUrl } = response.profileObj;
    const payload = {
      username: givenName,
      imageUrl,
    };
    dispatch({ type: "LOGIN", payload });
    history.push("/connect");
  };
  return (
    <GoogleLogin
      clientId={config.GOOGLE_CLIENT_ID}
      buttonText="Login"
      onSuccess={responseHandler}
      onFailure={responseHandler}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Home;
