import React, { useState } from "react";

import ShiftNormal from "./normal"
import ShiftAdDoc from "./ad-hoc"

const AttendanceShifts = ({ workschedule }) => {
  return (
    <>
      {/* {
        workschedule.type === "Regulars"?
          (<ShiftNormal workschedule={workschedule} />)  :
          (<ShiftAdDoc workschedule={workschedule} />)
      } */}

      <ShiftNormal workschedule={workschedule} />

    </>
  );
};

export default AttendanceShifts;
