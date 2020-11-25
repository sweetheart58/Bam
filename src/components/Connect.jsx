import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getWeb3 from "../getWeb3";

const Connect = () => {
  const [isConnected, setConnected] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const currentAddress = window.ethereum.selectedAddress;
    if (currentAddress) {
      setConnected(true);
      history.push("/dashboard");
    } else {
      setConnected(false);
      console.log("not connected");
      async function initWeb3() {
        try {
          const web3 = await getWeb3();
          history.push("/dashboard");
        } catch (error) {
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.log(error);
        }
      }
      initWeb3();
    }
  }, [history]);
  if (isConnected === true || isConnected === null) {
    return <div>Connecting to your wallet...</div>;
  } else {
    return <div>Please connect to your cryptocurrency wallet</div>;
  }
};

export default Connect;
