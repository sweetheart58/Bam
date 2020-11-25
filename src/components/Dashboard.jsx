import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/Context";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const [state, dispatch] = useContext(Context);
  const [isAuth, setAuth] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (state === undefined) {
      history.push("/");
    } else {
      setAuth(true);
    }
  }, [history, state]);
  if (isAuth) {
    return <div>Hi {state.username}</div>;
  } else {
    return <div>Please login with your google account</div>;
  }
};

export default Dashboard;
