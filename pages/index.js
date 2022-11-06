import { ConnectButton } from '@rainbow-me/rainbowkit';
import { generateChallenge, authenticate, getDefaultProfileRequest } from '../Utils/utils';
import { useAccount, useSignMessage, useSigner  } from 'wagmi'
import { getAuthenticationToken, setAuthenticationToken } from '../Utils/helper';
import { useEffect, useState, useContext } from 'react';
import {WalletContext} from '../components/common/WalletContext';



export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const {setToken, setUser, token, user} = useContext(WalletContext);
  const { signMessageAsync } = useSignMessage();

  useEffect(() =>{
    if(token && address){
      const profile = getDefaultProfileRequest(address)
      setUser(profile)
        console.log(profile);
        setToken(token);
      }
  },[token])

  useEffect(() => {
    if(address){
      const token = getAuthenticationToken();
      console.log({token})
      setToken(token);
    }
  }, [token || address])


  const signIn = async() =>{
    try{
      if (isDisconnected) {
        return alert('Please connect your wallet first');
      }
      let token = await getAuthenticationToken()
      if(token){
        setToken(token);
        console.log(token);
        return;
      }
      const challenge = await generateChallenge(address);
      console.log({ challenge });
      const signature = await signMessageAsync({ message: challenge });
      console.log({ signature });
      const accessToken = await authenticate(address, signature);
      console.log({ accessToken });
      setAuthenticationToken(accessToken)
      setToken(accessToken);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div>
      
          <ConnectButton />
          <button onClick={signIn}>Login with LENS</button>
    </div>
  )
}
