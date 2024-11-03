import React from 'react'
import Chart from "react-apexcharts";

const TimeSeries = (props) => {
  const chartOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: true, // Enables zoom on the chart
      },
    },
    xaxis: {
      type: "datetime", // X-axis with date values
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Number of Visitors",
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yyyy", // Date format for tooltip
      },
      y: {
        formatter: (value) => `${value} visitors`, // Tooltip format for Y-axis
      },
    },
  };
  const prepareChartData = (data) => {
    return data.map((entry) => {
      const totalVisitors =
        parseInt(entry.adults || 0, 10) +
        parseInt(entry.children || 0, 10) +
        parseInt(entry.babies || 0, 10);
  
      return {
        x: new Date(entry.arrivalDate).getTime(), // X-axis as timestamp
        y: totalVisitors, // Y-axis as total number of visitors
      };
    });
  };

  const chartSeries = [
    {
      name: "Number of Visitors",
      data: prepareChartData(props.data), // Prepared data for the chart
    },
  ];
  return (
    <div className='parent-container'>
      <h2>Time Series</h2>
      <div className='graph-section'>
        <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
      </div>
    </div>
  )
}

export default TimeSeries