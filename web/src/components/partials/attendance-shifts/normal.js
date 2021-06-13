import React, { useState,useEffect } from "react";
import Router, { useRouter } from "next/router";
import Datatable from "../../elements/datatable/ActionsTable";
import { Selects } from "../../elements/forms/selects";
import Widget from "../../elements/widget";
import Modal from "../../partials/modals/create-modal";
import Datetime from "react-datetime";
import formatDate from "../../../functions/datetime";
import moment from "moment";
import getConfig from "next/config";

import workService from "../../../services/workschedule";
// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

import { FiWatch } from "react-icons/fi";

const ShiftsNormal = ({ workscheduleId , Shifts}) => {
  const router = useRouter();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const [minTimeIn, setMinTimeIn] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");

  const [maxTimeOut, setMaxTimeOut] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");

  const [dayOfWeek, setDayOfWeek] = useState(2);

  const [scheduleId, setScheduleId] = useState(workscheduleId);

  const [shifts,setShifts] = useState(Shifts)

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
  function handlerEdit(id){
    //router.push(`${link}/${row.values.id}/edit`
    alert(`Ola mundo ${id}`)

    const item = workschedule.Shifts.find(p=> p.id === id)

    if(!item){
      setId(id)
      setName(item.name);
      setDescription(item.description);
      setType(item.type);

      setTimeIn(item.timeIn)
      setTimeOut(item.timeOut)
      setMinTimeIn(item.minTimeIn)
      setMaxTimeOut(item.maxTimeOut)
      setGracePeriod(item.gracePeriod)
      setDayOfWeek(item.dayOfWeek)
    }
  }
  function handleClear() {
    setType("Normal");
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

  const columns = React.useMemo(
    () => [
      {
        Header: "Code",
        accessor: "id",
        Cell: (props) => (
          <a href={`/workschedule/${props.value}`}>{props.value}</a>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Time In",
        accessor: "timeIn",
        Cell: (props) => <span>{formatDate(props.value, "HH:mm")}</span>,
      },
      {
        Header: "Time Out",
        accessor: "timeOut",
        Cell: (props) => <span>{formatDate(props.value, "HH:mm")}</span>,
      },
      {
        Header: "Min Time In",
        accessor: "minTimeIn",
        Cell: (props) => <span>{formatDate(props.value, "HH:mm")}</span>,
      },
      {
        Header: "Max Time Out",
        accessor: "maxTimeOut",
        Cell: (props) => <span>{formatDate(props.value, "HH:mm")}</span>,
      },
      {
        Header: "Grace Period",
        accessor: "gracePeriod",
        Cell: (props) => <span>{formatDate(props.value, "HH:mm")}</span>
      },
      {
        Header: "Day Of Week",
        accessor: "dayOfWeek",
      },
    ],
    []
  );

  const data = React.useMemo(() => shifts, []);

  return (
    <>
      <Widget
        title=""
        description=""
        right={
          <Modal
            title="Create New Time Shifts"
            icon={
              <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                <FiWatch size={18} className="stroke-current text-red-500" />
              </span>
            }
            body={
              <form>
                <div className="form flex w-full">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-element">
                      <div className="form-label">Name</div>
                      <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="form-input"
                        placeholder="Enter The Name..."
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">Description</div>
                      <input
                        name="description"
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="form-input"
                        placeholder="Enter Description..."
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">Type</div>
                      <input
                        name="type"
                        type="text"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                        className="form-input"
                        placeholder="Enter something..."
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">minTimeIn</div>

                      <Datetime
                        defaultValue={new Date()}
                        dateFormat={false}
                        timeFormat={"HH:mm"}
                        input={true}
                        inputProps={{
                          className: "form-input",
                          placeholder: "Select date",
                        }}
                        value={minTimeIn}
                        onChange={(value) =>
                          {
                            const dateV = moment(value).toDate()
                            setMinTimeIn(dateV)        
                          } 
                        }
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">timeIn</div>

                      <Datetime
                        defaultValue={new Date()}
                        dateFormat={false}
                        timeFormat={"HH:mm"}
                        input={true}
                        inputProps={{
                          className: "form-input",
                          placeholder: "Select date",
                        }}
                        value={timeIn}
                        onChange={(value) => {
                          const dateV = moment(value).toDate()
                          setTimeIn(dateV)
                                                   
                        }}
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">timeOut</div>

                      <Datetime
                        defaultValue={new Date()}
                        dateFormat={false}
                        timeFormat={"HH:mm"}
                        input={true}
                        inputProps={{
                          className: "form-input",
                          placeholder: "Select date",
                        }}
                        value={timeOut}
                        onChange={(value) =>{
                          const dateV = moment(value).toDate()
                            setTimeOut(dateV)                            
                        }
                      }
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">maxTimeOut</div>

                      <Datetime
                        defaultValue={new Date()}
                        dateFormat={false}
                        timeFormat={"HH:mm"}
                        input={true}
                        inputProps={{
                          className: "form-input",
                          placeholder: "Select date",
                        }}
                        value={maxTimeOut}
                        onChange={(value) =>
                          {
                            const dateV = moment(value).toDate()
                            setMaxTimeOut(dateV)
                             
                          } }

                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">gracePeriod</div>
                      
                      <Datetime
                        defaultValue={new Date()}
                        dateFormat={false}
                        timeFormat={"HH:mm"}
                        input={true}
                        inputProps={{
                          className: "form-input",
                          placeholder: "Select date",
                        }}
                        value={gracePeriod}
                        onChange={(value) =>
                          {
                            const dateV = moment(value).toDate()
                            setGracePeriod(dateV)
                             
                          } }

                      />                      
                    </div>

                    <div className="form-element">
                      
                      <Selects
                        item={itemsDayOfWeek}
                        selected={dayOfWeek}
                        onSelectChange={handleDayOfWeekChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
            }
            buttonTitle="Save"
            buttonClassName="btn btn-default btn-rounded bg-green-500 hover:bg-red-600 text-white"
            handleSave={handleSave}
            handleClear={handleClear}
          />
        }
      >
        <Datatable 
          columns={columns} 
          data={data} 
          canView={false} 
          canEdit={true} 
          canDeleted={true}
          handlerEdit={handlerEdit}
          />
      </Widget>
    </>
  );
};

export default ShiftsNormal;
