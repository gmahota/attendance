import React, { useState } from "react";
import Datatable from "../../elements/datatable/ActionsTable";
import { Selects } from "../../elements/forms/selects";
import Widget from "../../elements/widget";
import { UnderlinedTabs} from "../../elements/tabs";
import Modal from "../../partials/modals/create-modal";
import formatDate from "../../../functions/datetime";
import Datetime from "react-datetime";

import { FiWatch } from "react-icons/fi";
import List from "./list"

const TotalResume =({shifts})=>{

  let total= 0;

  console.log(shifts)

  if(!!shifts){
    total =
      shifts.
        reduce(
          (sum, currentValue) => sum + currentValue.dayOfWeek,0
            //troca timeOut - timeIn
        )
  }

  const listResume = [{title:"Total",value:total}];

  return(
  <>
    <Widget title="Resume" >
      <List items={listResume} />
    </Widget>
  </>)
}

const tabs = [
  {
    index: 0,
    title: "Monday",
    active: true,
    content: <div key="2" week="2" >dick</div>,
  },
  {
    index: 1,
    title: "Tuesday",
    active: false,
    content: <div key="3" week="3" ></div>,
  },
  {
    index: 2,
    title: "Wednesday",
    active: false,
    content: <div key="4" week="4" ></div>,
  },
  {
    index: 3,
    title: "Thursday",
    active: false,
    content: <div key="5" week="5" ></div>,
  },
  {
    index: 4,
    title: "Friday",
    active: false,
    content: <div key="6" week="6" >burro</div>,
  },
  {
    index: 5,
    title: "Saturday",
    active: false,
    content: <div key="7" week="7" ></div>,
  },
  {
    index: 6,
    title: "Sunday",
    active: false,
    content: <div key="1" week="1" >Merda</div>,
  }
];

const DayOfWeek= ({week}) =>{
  return (<>Fuck You</>)
} 

const Calendar = ({shifts})=>{
  return (
    <>
      <Widget title="Calendar">
      <div className="flex flex-wrap">
          <div className="w-full">
            <UnderlinedTabs tabs={tabs} />
          </div>
        </div>
      </Widget>
    </>
  )
}

const AttendanceShiftsAdHoc = ({ workschedule }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const [minTimeIn, setMinTimeIn] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");

  const [maxTimeOut, setMaxTimeOut] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");

  const [dayOfWeek, setDayOfWeek] = useState("");

  const [scheduleId, setScheduleId] = useState(workschedule.id);

  async function handleSave() {
    var item = {
      name,
      description,
      type,
      timeIn,
      timeOut,
      minTimeIn,
      maxTimeOut,
      gracePeriod,
      dayOfWeek,
      scheduleId
    };

    const url = publicRuntimeConfig.SERVER_URI + "api/attendance/shift";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    handleClear();

    router.reload();
  }

  function handleClear() {
    setType("Regular");
    setId("");

    setName("");
  }

  function handleDayOfWeekChange(value) {
    setDayOfWeek(value);
  }

  let itemsDayOfWeek = {
    label: "Day Off Week",
    name: "type",
    type: "select",
    placeholder: "Day Off Week",
    options: [
      { value: "2", name: "Monday", label: "Monday" },
      { value: "3",name: "Tuesday",label: "Tuesday",},
      { value: "4", name: "Wednesday", label: "Wednesday" },
      { value: "5", name: "Thursday", label: "Thursday" },
      { value: "6", name: "Friday", label: "Friday" },
      { value: "7", name: "Saturday", label: "Saturday" },
      { value: "1", name: "Sunday", label: "Sunday" }
    ],
    onValueChange: handleDayOfWeekChange,
  };

  return (
    <>
      <div class="grid grid-cols-2">
        <div class="md:w-32"><TotalResume shifts={workschedule.Shifts} /></div>
        <div class="md"><Calendar shifts={workschedule.Shifts} /></div>
      </div>
    </>
  );
};

export default AttendanceShiftsAdHoc;
