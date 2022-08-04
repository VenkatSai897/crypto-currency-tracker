import {
  LinearProgress,
  makeStyles,
  Typography,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../Config/api";
import { numberWithCommas } from "../components/Banner/Carousel";
import { CryptoState } from "../CryptoContext";
import DOMPurify from "dompurify";
import "./CoinPage.css";

import getSymbolFromCurrency from "currency-symbol-map";
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    // borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Lato",
  },
  description: {
    width: "80%",
    fontFamily: "Lato",
    // justifyContent:"center",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // border: "3px solid green",
    alignItems: "center",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      // alignItems:"center",
      justifyContent: "center",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(data);
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="coin-container">
        <div className="content">
          <h1>{coin?.name}</h1>
        </div>
        <div className="content">
          <div className="rank">
            <span className="rank-btn">Rank # {coin?.market_cap_rank}</span>
          </div>
          <div className="info">
            <div className="coin-heading">
              <img src={coin?.image.small} alt="" />
              <p>{coin?.name}</p>
              <p>{coin?.symbol.toUpperCase()}/USD</p>
            </div>
            <div className="coin-price">
              <h1>
                {symbol}{" "}

                  {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)) + " M"}

              </h1>
            </div>
          </div>
        </div>

        <div className="content">
          <table>
            <thead>
              <tr>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>14d</th>
                <th>30d</th>
                <th>1yr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {
                    <p>
                      {coin?.market_data.price_change_percentage_1h_in_currency[
                        currency.toLowerCase()
                      ].toFixed(2)}
                      %
                    </p>
                  }
                </td>
                <td>
                  {
                    <p>
                      {coin?.market_data.price_change_percentage_24h_in_currency[
                        currency.toLowerCase()
                      ].toFixed(2)}
                      %
                    </p>
                  }
                </td>
                <td>
                  {
                    <p>
                      {coin?.market_data.price_change_percentage_7d_in_currency[
                        currency.toLowerCase()
                      ].toFixed(2)}
                      %
                    </p>
                  }
                </td>
                <td>
                  {
                    <p>
                      {coin?.market_data.price_change_percentage_14d_in_currency[
                        currency.toLowerCase()
                      ].toFixed(2)}
                      %
                    </p>
                  }
                </td>
                <td>
                  {
                    <p>
                      {coin?.market_data.price_change_percentage_30d_in_currency[
                        currency.toLowerCase()
                      ].toFixed(2)}
                      %
                    </p>
                  }
                </td>
                <td>
                  {
                    <p>
                      {coin?.market_data.price_change_percentage_1y_in_currency[
                        currency.toLowerCase()
                      ].toFixed(2)}
                      %
                    </p>
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="content">
          <div className="stats">
            <div className="left">
              <div className="row">
                <h4>24 Hour Low</h4>
                <p>
                  {symbol}
                  {coin?.market_data.low_24h[
                    currency.toLowerCase()
                  ].toLocaleString()}
                </p>
              </div>
              <div className="row">
                <h4>24 Hour High</h4>
                <p>
                  {symbol}
                  {coin?.market_data.high_24h[
                    currency.toLowerCase()
                  ].toLocaleString()}
                </p>
              </div>
            </div>
            <div className="right">
              <div className="row">
                <h4>Market Cap</h4>
                <p>
                  {symbol}
                  {coin?.market_data.market_cap[
                    currency.toLowerCase()
                  ].toLocaleString()}
                </p>
              </div>
              <div className="row">
                <h4>Circulating Supply</h4>
                <p>{coin?.market_data.circulating_supply}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="about">
            <h3>About</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  coin.description ? coin.description.en : ""
                ),
              }}
            ></p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CoinPage;
