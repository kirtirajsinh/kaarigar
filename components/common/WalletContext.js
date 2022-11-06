import React, {useState, useEffect, createContext} from 'react'
import { useAccount, useProvider, useSigner } from 'wagmi'
import {getLocalToken, setLocalToken} from '../../Utils/helper'

export const WalletContext = createContext([])

 const WalletProvider = ({children}) => {
    const { address,isDisconnected } = useAccount({
        onConnect ({ address, connector, isReconnected }) {
          console.log('onConnect', address, connector, isReconnected)
        }
      })
      const [token, setToken] = useState(null)
      const [user, setUser] = useState(null)

      useEffect(() => {
        if(isDisconnected){
          setToken(null)
          setUser(null)
        }
      },[isDisconnected])

      // useEffect(() => {
      //   console.log('signer isError isLoading', signer, isError, isLoading)
      //   if (signer && address) {
      //     refetchToken()
      //   }
      // }, [signer, address])

      const refetchToken = async () => {
        let existingToken = null
        let verified = false
        // return;
        try {
          existingToken = getLocalToken()
          console.log(existingToken)
          if (existingToken) {
            setToken(existingToken)
          }
        } catch (error) {
          console.log(error)
        }
        
      }
  return (
  <WalletContext.Provider value={{token, setToken, user, setUser}}>
    {children}
  </WalletContext.Provider>
    )
}

export default WalletProvider

