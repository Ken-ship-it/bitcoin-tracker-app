import PropTypes from 'prop-types';

const PriceDisplay = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h2>{data.name} ({data.symbol.toUpperCase()})</h2>
      <p>Current Price: ${data.current_price.toLocaleString()}</p>
      <p>24h Change: {data.price_change_percentage_24h}%</p>
      <p>Market Cap: ${data.market_cap.toLocaleString()}</p>
      <p>Trading Volume: ${data.total_volume.toLocaleString()}</p>
    </div>
  );
};

PriceDisplay.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    current_price: PropTypes.number.isRequired,
    price_change_percentage_24h: PropTypes.number.isRequired,
    market_cap: PropTypes.number.isRequired,
    total_volume: PropTypes.number.isRequired,
  }).isRequired,
};

export default PriceDisplay;