import React,{useState} from "react";
import Datatable from "../../elements/datatable/ActionsTable";
import Widget from "../../elements/widget";
import Modal from "../../partials/modals/create-modal";
import formatDate from "../../../functions/datetime";

import {FiWatch} from 'react-icons/fi'

const SimpleShifts = ({ workschedule }) => {
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
        Cell: (props) => <span>{formatDate(props.value,"HH:mm")}</span>,
      },
      {
        Header: "Time Out",
        accessor: "timeOut",
        Cell: (props) => <span>{formatDate(props.value,"HH:mm")}</span>,
      },
      {
        Header: "Min Time In",
        accessor: "minTimeIn",
        Cell: (props) => <span>{formatDate(props.value,"HH:mm")}</span>,
      },
      {
        Header: "Max Time Out",
        accessor: "maxTimeOut",
        Cell: (props) => <span>{formatDate(props.value,"HH:mm")}</span>,
      },
      {
        Header: "Grace Period",
        accessor: "gracePeriod",
      },
      {
        Header: "Day Of Week",
        accessor: "dayOfWeek",
      },
    ],
    []
  );

  const data = React.useMemo(() => workschedule.Shifts, []);
  return <Datatable columns={columns} data={data} />;
};

const AttendanceShifts = ({workschedule}) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const [minTimeIn, setMinTime] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");

  const [maxTimeOut, setMaxTimeOut] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");

  const [dayOfWeek, setDayOfWeek] = useState("");

  const [scheduleId, setScheduleId] = useState(workschedule);

  async function  handleSave(){

    var item = {id,name,type}

    const url = publicRuntimeConfig.SERVER_URI + "api/attendance/workschedule";

    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );

    handleClear()

    router.reload()
  }

  function handleClear(){
    setType("Regular")
    setId("")

    setName("")
  }

  return(<> 

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
                <div className="form flex flex-wrap w-full">
                  
                  <div className="w-full  mb-4">
                    <div className="form-element-inline">
                      <div className="form-label">Name</div>
                      <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        className="form-input"
                        placeholder="Enter something..."
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
        <SimpleShifts  workschedule = {workschedule}/>
      </Widget>      
    </>
  )
}

export default AttendanceShifts;
