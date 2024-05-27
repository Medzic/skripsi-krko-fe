import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div>
      <div>
        <Calendar
          onChange={onChange}
          value={date}
        />
      </div>
      <div>
        <p> {date.toDateString()}</p>
      </div>
    </div>
  );
};

export default MyCalendar;
