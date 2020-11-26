import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import getWeb3 from "../getWeb3";
import { Context } from "../store/Context";
import Bam from "../abi/Bam.json";
const Connect = () => {
  const [isConnected, setConnected] = useState(null);
  const history = useHistory();

  const [state, dispatch] = useContext(Context);
  console.log("CONTEXT", state);
  const [lstate, setState] = useState({
    contract: null,
    accounts: null,
  });
  const setup = async () => {
    console.log("IN SETUP");
    console.log("CONTEXT", state);
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Bam.networks[networkId];

      const instance = new web3.eth.Contract(
        Bam.abi,
        deployedNetwork && deployedNetwork.address
      );

      dispatch({
        type: "CONTRACT",
        payload: {
          instance,
          accounts,
        },
      });

      console.log("CONTRACT", instance);

      setState({
        ...lstate,
        contract: instance,
        accounts,
      });
    } catch (e) {
      console.log("ERROR FROM SETUP -> CONNECT", e);
    }
  };

  const handleUser = async () => {
    console.log("IN HANDLE USER");
    try {
      // setup contract
      await setup();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      if (lstate.contract) {
        const res = await lstate.contract.methods.name().call();
        console.log("response", res);
        const userAddress = window.ethereum.selectedAddress;
        const user = await lstate.contract.methods
          .getUserof(userAddress)
          .call();

        console.log(user);

        if (user[2] === "") {
          history.push("/onboard");
        } else {
          //dispatch user
          dispatch({
            type: "USER",
            payload: user,
          });
          history.push("/dashboard");
        }
      }
    };

    getData();
  }, [lstate.contract]);

  useEffect(() => {
    const handleConnect = async () => {
      setConnected(false);

      async function initWeb3() {
        try {
          await handleUser();
        } catch (error) {
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.log(error);
        }
      }
      initWeb3();
    };

    handleConnect();
  }, [history]);

  if (isConnected === true || isConnected === null) {
    return <div>Connecting to your wallet...</div>;
  } else {
    return <div>Please connect to your cryptocurrency wallet</div>;
  }
};

export default Connect;
