import React, { useState } from "react";

import ShiftNormal from "./normal"
import ShiftAdDoc from "./ad-hoc"

const AttendanceShifts = ({ workscheduleId,Shifts }) => {
  
  return (
    <>
      {/* {
        workschedule.type === "Regulars"?
          (<ShiftNormal workschedule={workschedule} />)  :
          (<ShiftAdDoc workschedule={workschedule} />)
      } */}

      <ShiftNormal workscheduleId={workscheduleId} Shifts={Shifts}/>

    </>
  );
};

export default AttendanceShifts;
