import React, { useState } from "react";

import getConfig from "next/config";

import Validation from "../attendance-reports/filter-validation";
import Alert from "../alerts";
import {
  TextInput,
  InvalidTextInput,
  ValidTextInput,
} from "../forms/text-inputs";

import { Radios } from "../forms/radios";

import { Selects } from "../forms/selects";

import Datepicker from "../datepicker";
import { FiSearch } from "react-icons/fi";
import { AiFillFileExcel } from "react-icons/ai";

import { get_AttendaceReport } from "../../services/attendanceReports";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const FilterReport = ({
  message = null,
  allUsers,
  allUserDepartments,
  allGroups,
}) => {
  const [name, setName] = useState("Punchdaily");
  const [type, setType] = useState("Punchdaily");
  const [listGroups, setListGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [user, setUser] = useState("");
  const [userDepartment, setUserDepartment] = useState("");

  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const [dateBegin, setDateBegin] = useState(firstDay);
  const [dateEnd, setDateEnd] = useState(lastDay);

  function handlerName(value) {
    setName(value);
  }

  function handleReportType(value) {
    setType(value);
    setName(value);
  }

  function handleUserDepartmentsChange(value) {
    setUserDepartment(value);
  }

  function handleGroupChange(value) {
    setGroup(value);
  }

  function handleUserChange(value) {
    setUser(value);
  }

  function onChangeDateBegin(value) {
    setDateBegin(value);
  }

  function onChangeDateEnd(value) {
    setDateEnd(value);
  }

  async function handlerSearch() {
    let data = {
      name,
      type,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
    };

    if (user.length > 0) {
      data.user = user;
    }

    if (group.length > 0) {
      data.group = group;
    }

    const report = await get_AttendaceReport(data);

    window.open(publicRuntimeConfig.SERVER_URI + report.file, "_blank");
  }

  async function handlerDownloadExcel() {
    let data = {
      name,
      type,
      dateBegin: dateBegin,
      dateEnd: dateEnd,
    };

    if (user.length > 0) {
      data.user = user;
    }

    if (group.length > 0) {
      data.group = group;
    }

    if (userDepartment.length > 0) {
      data.department = userDepartment;
    }

    console.log(data);

    const report = await get_AttendaceReport(data);

    window.open(publicRuntimeConfig.SERVER_URI + report.file, "_blank");
  }

  let itemsReport = {
    label: "Report Type",
    name: "type",
    type: "radio",
    placeholder: "Report Type",
    options: [
      { value: "Punchdaily", name: "PunchDaily", label: "Punch Daily" },
      { value: "Punchlog", name: "Punchlog", label: "Punch Log" },
    ],
    onValueChange: handleReportType,
  };

  let itemsGroup = {
    label: "User Group",
    name: "userGroup",
    type: "select",
    placeholder: "Group User",
    options: [{ key: "All", value: "", label: "All" }],
    onValueChange: handleGroupChange,
  };

  let itemsUserDepartments = {
    label: "User Department",
    name: "userDepartment",
    type: "select",
    placeholder: "User Department",
    options: [{ key: "All", value: "", label: "All" }],
    onValueChange: handleUserDepartmentsChange,
  };

  let itemsUsers = {
    label: "User",
    name: "user",
    type: "select",
    options: [{ key: "All", value: "", label: "All" }],
    placeholder: "Users",
  };

  allUsers.forEach((item) => {
    itemsUsers.options.push({
      key: item.id,
      value: item.id,
      label: item.name,
    });
  });

  allUserDepartments.forEach((item) => {
    itemsUserDepartments.options.push({
      key: item.id,
      value: item.id,
      label: item.name,
    });
  });

  allGroups.forEach((item) => {
    itemsGroup.options.push({
      key: item.id,
      value: item.id,
      label: item.name,
    });
  });

  return (
    <>
      <div className="form flex flex-wrap w-full">
        <div className="w-full">
          <div className="w-full lg:w-1/2">
            <TextInput
              label="Name"
              value={name}
              placeholder="Enter you name"
              onTextChange={handlerName}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <Radios item={itemsReport} selected={type} />
          </div>
          <div className="w-full lg:w-1/2">
            <Selects
              item={itemsGroup}
              selected={group}
              onSelectChange={handleGroupChange}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <Selects
              item={itemsUserDepartments}
              selected={userDepartment}
              onSelectChange={handleUserDepartmentsChange}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <Selects
              item={itemsUsers}
              selected={user}
              onSelectChange={handleUserChange}
            />
          </div>
          <div className="flex flex-wrap w-full">
            <div className="w-full lg:w-1/3">
              <Datepicker
                title="Begin"
                current={dateBegin}
                onChangeCurrent={onChangeDateBegin}
              />
            </div>

            <div className="w-full lg:w-1/3">
              <Datepicker
                title="End"
                current={dateEnd}
                onChangeCurrent={onChangeDateEnd}
              />
            </div>
          </div>
          <div className="w-full flex flex-row">
            <div className="space-x-2">
              <button
                className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded"
                onClick={handlerDownloadExcel}
              >
                <AiFillFileExcel className="stroke-current mr-2" />
                <span>Download</span>
              </button>
            </div>

            <div className="space-x-2">
              <button
                className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded"
                onClick={handlerSearch}
              >
                <FiSearch className="stroke-current mr-2" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterReport;
