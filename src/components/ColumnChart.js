import React from 'react'
import Chart from "react-apexcharts";

const ColumnChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: "bar",
      zoom: {
        enabled: true, // Allows zooming if needed
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "dd/MM/yyyy", // Show only date on the X-axis
      },
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Number of Visitors",
      },
    },
    dataLabels: {
      enabled: true, // Display labels at the top of each column
      formatter: (value) => `${value}`, // Format to show only the number
    },
    tooltip: {
      x: {
        format: "dd/MM/yyyy", // Tooltip to show only date
      },
      y: {
        formatter: (value) => `${value} visitors`, // Tooltip for Y-axis
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
      data: prepareChartData(data), // Prepared data for the chart
    },
  ];
  return (
    <div className='parent-container'>
      <h2>Column Chart - Number of visitors per day</h2>
      <div className='graph-section'>
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
      </div>
    </div>
  )
}

export default ColumnChart