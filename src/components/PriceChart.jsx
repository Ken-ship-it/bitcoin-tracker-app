import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const PriceChart = ({ chartData }) => {
  if (!chartData || !chartData.dates || !chartData.prices) {
    return <div>No data available</div>;
  }

  const data = {
    labels: chartData.dates,
    datasets: [
      {
        label: 'Price (USD)',
        data: chartData.prices,
        fill: false,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }}
    />
  );
};

PriceChart.propTypes = {
  chartData: PropTypes.shape({
    dates: PropTypes.arrayOf(PropTypes.string).isRequired,
    prices: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
};

export default PriceChart;