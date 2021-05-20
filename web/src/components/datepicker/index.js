import React, { useState } from "react";
import Datetime from "react-datetime";

const Datepicker = ({ title, current,onChangeCurrent }) => {
  const [value, setValue] = useState(current);
  const onChange = (v) => {
    
    setValue(v);
    
    onChangeCurrent(v)
  };
  return (
    <div className="form-element">
      <span className="text-sm text-default">
        <span>{title}</span>
      </span>
      <Datetime
        defaultValue={new Date()}
        dateFormat="DD-MM-YYYY"
        timeFormat={false}
        input={true}
        inputProps={{
          className: "form-input",
          placeholder: "Select date",
        }}
        value={value}
        viewMode={"days"}
        onChange={onChange}
      />
    </div>
  );
};

export default Datepicker;
