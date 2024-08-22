import PropTypes from 'prop-types';

const CryptoList = ({ cryptos, onSelect }) => {
  return (
    <div>
      <h3>Select a Cryptocurrency</h3>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id} onClick={() => onSelect(crypto.id)}>
            {crypto.name} ({crypto.symbol.toUpperCase()})
          </li>
        ))}
      </ul>
    </div>
  );
};

CryptoList.propTypes = {
  cryptos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CryptoList;
