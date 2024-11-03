import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'
import './App.css';
import ColumnChart from './components/ColumnChart';
import Filter from './components/Filter';
import Header from './components/Header';
import Sparkline1 from './components/Sparkline1';
import Sparkline2 from './components/Sparkline2';
import TimeSeries from './components/TimeSeries';

function App() {
  const [data, setData] = useState([])
  const [filteredTotalData, setFilteredTotalData] = useState([])

  const handleDataFromChild = (receivedData) => {
    console.log(receivedData)
    handleFilter(receivedData.startDate, receivedData.endDate)
  };
  const handleFilter = (startDate, endDate) => {
    // Convert the input dates to Date objects
    var start = startDate;
    var end = endDate;
    console.log(start)
    console.log(end)

    // Filter the data between the two dates
    const filteredData = data.filter((item) => {
      const arrival = new Date(item.arrivalDate);
      return arrival >= start && arrival <= end;
    });

    console.log("Filtered Data:", filteredData);
    setFilteredTotalData(filteredData)

  };
  
  useEffect(() => {
    fetch('/hotel_bookings_1000.csv')
      .then((response) => response.text())
      .then((csvText) => {
        // Parse CSV data using PapaParse
        Papa.parse(csvText, {
          header: true, // Set to true if your CSV has headers
          skipEmptyLines: true,
          complete: (result) => {
            const sortedData = result.data
              .map((item) => ({
                ...item,
                arrivalDate: new Date(
                  item.arrival_date_year,
                  new Date(`${item.arrival_date_month} 1`).getMonth(), // Convert month to a number
                  item.arrival_date_day_of_month
                ),
              }))
              .sort((a, b) => a.arrivalDate - b.arrivalDate);
            setData(sortedData);
          },
        });
      });
  }, []);
  return (
    <div className='app'>
      <div className='app-container'>
        <Header />
        <Filter sendDataToParent={handleDataFromChild} />
        <TimeSeries data={filteredTotalData} />
        <ColumnChart data={filteredTotalData} />
        <Sparkline1 data={filteredTotalData} type="adults" />
        <Sparkline2 data={filteredTotalData} title="children" />
      </div>
    </div>
  );
}

export default App;
