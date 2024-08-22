import { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoSearch from './components/CryptoSearch.jsx';
import CryptoList from './components/CryptoList.jsx';
import PriceDisplay from './components/PriceDisplay.jsx';
import PriceChart from './components/PriceChart.jsx';
import DarkModeToggle from './components/DarkModeToggle.jsx';

const App = () => {
  const [cryptos, setCryptos] = useState([]);
  const [ setSelectedCrypto] = useState(null);
  const [cryptoData, setCryptoData] = useState(null);
  const [chartData, setChartData] = useState({ dates: [], prices: [] });

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        setCryptos(response.data);
      } catch (error) {
        console.error('Error fetching cryptocurrencies list:', error);
      }
    };

    fetchCryptos();
  }, []);

  const fetchCryptoData = async (cryptoId) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}`
      );
      setCryptoData(response.data.market_data);
      fetchChartData(cryptoId);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };

  const fetchChartData = async (cryptoId) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
        {
          params: { vs_currency: 'usd', days: 7 },
        }
      );
      const prices = response.data.prices.map((price) => price[1]);
      const dates = response.data.prices.map((price) =>
        new Date(price[0]).toLocaleDateString()
      );
      setChartData({ dates, prices });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const handleCryptoSelect = (cryptoId) => {
    setSelectedCrypto(cryptoId);
    fetchCryptoData(cryptoId);
  };

  return (
    <div className="App">
      <DarkModeToggle />
      <CryptoSearch onSearch={fetchCryptoData} />
      <CryptoList cryptos={cryptos} onSelect={handleCryptoSelect} />
      {cryptoData && <PriceDisplay data={cryptoData} />}
      {chartData.dates.length > 0 && <PriceChart chartData={chartData} />}
    </div>
  );
};

export default App;
