import React, {useState} from 'react'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';

const Filter = ({ sendDataToParent }) => {
  const [startDate, setStartDate] = useState(dayjs('7/1/2015'));
  const [endDate, setEndDate] = useState(dayjs('7/3/2015'));
  
  const handleClick = () => {
    sendData()
  }
  const sendData = () => {
    const obj = {
      startDate: startDate,
      endDate: endDate
    }
    sendDataToParent(obj);
  };
  return (
    <div className='parent-container'>
      <h2>Select Date Range - Number of visitors per day</h2>
      <div className='date-container'>
        <LocalizationProvider className='date-picker' dateAdapter={AdapterDayjs} >
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newStartDate) => {
                newStartDate.format('DD/MM/YYYY')
                setStartDate(newStartDate)
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <h3 style={{ marginLeft: '2.5%', marginRight: '2.5%' }}>-</h3>
        <LocalizationProvider className='date-picker' dateAdapter={AdapterDayjs} >
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newEndDate) => {
                newEndDate.format('DD/MM/YYYY')
                setEndDate(newEndDate)
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <div className='button-container'>
          <Button variant="contained" onClick={handleClick}>Set</Button>
        </div>
      </div>
    </div>
  )
}

export default Filter