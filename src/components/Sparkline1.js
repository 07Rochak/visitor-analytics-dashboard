import React from 'react';
import Chart from 'react-apexcharts';

const Sparkline1 = ({ data, type }) => {
  const chartData = data.map(entry => (type === 'adults' ? entry.adults : entry.children));

  const options = {
    chart: {
      id: `${type}-sparkline`,
      sparkline: {
        enabled: true
      }
    },
    tooltip: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    colors: [type === 'adults' ? '#008ffc' : '#008ffc']
  };

  return (
    <div className='parent-container'>
      <h2>Sparkline Series - Number of Adult visitors per day within selected filter</h2>
      <div className='graph-section'>
        <Chart
          options={options}
          series={[{ name: type, data: chartData }]}
          type="line"
          height="100"
        />
      </div>
    </div>
  );
};

export default Sparkline1;