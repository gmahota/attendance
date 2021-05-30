import React, { useState } from "react";

import Datatable from "../datatable";

import { FiEdit } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import moment from "moment";

export default function AttendancePunchLog ({ allPunchLog }) {
  
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Name",
        accessor: "userName",
      },
      {
        Header: "Group",
        accessor: "userGroup",
      },
      {
        Header: "Entrada Shift",
        accessor: "entradashift",
        Cell:(props) => <span>{moment(props.value).format()}</span>
      },
      {
        Header: "Entrada",
        accessor: "entrada",
      },
      {
        Header: "Saida Shift",
        accessor: "saidashift",
      },
      {
        Header: "Saida",
        accessor: "saida",
      },
      {
        Header: "Total Delay",
        accessor: "totalDelay",
      },
      {
        Header: "",
        accessor: "id",
        Cell: (props) => <FiEye className="stroke-current mr-2" />,
      },
    ],
    []
  );
  const data = React.useMemo(() => allPunchLog, []);
  return <Datatable columns={columns} data={data} />;

  
}

