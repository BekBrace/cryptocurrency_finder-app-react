import './App.css';
// install axios
// npm i axios
import Axios from 'axios';
import {useState, useEffect} from 'react';
// https://documenter.getpostman.com/view/5734027/RzZ6Hzr3?version=latest

function App() {
// Setting up the initial states using react hook 'useState'
const [search, setSearch] = useState("");
const [crypto, setCrypto] = useState([]);

// Fetching crypt data from the API only 
// once when the component is mounted
// i forgot to tell you that you may
// want to know about React  life cycle.

// code here to fetch API using useEffect
useEffect(() => {
  Axios.get(
`https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=INR`
  ).then((res) => {
    setCrypto(res.data.coins);
  });
}, []);


  return (
    <div className="App">
      <h1 className='title' >Cryptocurrency Finder</h1>
      <input 
      type="text"
      placeholder='search (only small letters) ...'
      onChange={(e)=> {
          setSearch(e.target.value)
      }}/>
      <table>
        <thead>
          <tr>
          <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Market Cap</td>
            <td>Price</td>
            <td>Available Supply</td>
          </tr>
        </thead>
       {/* Mapping all the cryptos */}
      <tbody>
      {/* filtering to check for the searched crypto */}
      {/* ------------------------------------------ */}

      {crypto
      .filter((val)=> {return val.name.toLowerCase()
      .includes(search)})
      .map((val, id)=> {
              return (
                <>
                  <tr id="id">
                    <td className="rank">{val.rank}</td>
                    <td className="logo">
                      <a href={val.websiteUrl}>
                        <img 
                        src={val.icon} 
                        alt="logo"
                        width="30px"/>
                      </a>
                      <p>{val.name}</p>
                    </td>
                    <td className="symbol">{val.symbol}</td>
                    <td>{val.marketCap}</td>
                    <td>{val.price}</td>
                    <td>{val.availableSupply}</td>
                  </tr>
                </>
              )
            }
          )}


      </tbody>
      </table>
    </div>
  );
}

export default App;
