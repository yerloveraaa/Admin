import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function JMDatePicker() {
  const [startDate, setStartDate] = useState(new Date());

const handleDateChange = (date) => {
    setStartDate(date)
}
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="Pp"
      />
    </div>
  );
}
