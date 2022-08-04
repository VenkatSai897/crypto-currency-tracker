import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import axios from 'axios'
const Crypto = createContext()
const CryptoContext = ({children}) => {
    const[currency,setCurrency] = useState("INR");
    const [symbol,setSymbol] = useState("₹");
    const [currencies,setCurrencies] = useState([]);
    const [symbols,setSymbols] = useState([])
    const [filtered,setFiltered] = useState([])
    useEffect(() => {
      const getCurrency_1 = async () => {
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin"
        );
        let y = Object.keys(data['market_data']['current_price'])
        console.log(y)
        let k = []
        let p = []
        for (var i = 0;i<y.length;i++){
          if(getSymbolFromCurrency(y[i].toUpperCase())){
            k.push(y[i].toUpperCase());
            p.push(getSymbolFromCurrency(y[i].toUpperCase()));
          }
        }
        setCurrencies(k);
        setSymbols(p);
        setFiltered(k.filter((item)=>item!=="USD"&&item!=="INR"));
      };
      getCurrency_1();
    }, []);
    useEffect(()=>{
        if(currencies.length>0){
        let index = currencies?.indexOf(currency);
        console.log(index);
        setSymbol(symbols[index]);
        }
    },[currency]);
  return (
    <Crypto.Provider value={{currency,symbol,setCurrency,filtered}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () =>{
     return useContext(Crypto);
};
