import React, { useState } from 'react'
import Validation from '../attendance-reports/filter-validation'
import Alert from '../alerts'
import {
  TextInput,
  InvalidTextInput,
  ValidTextInput
} from '../forms/text-inputs'

import {
  Radios
} from '../forms/radios'

import {
  Selects
} from '../forms/selects'


const FilterReport = ({ message = null }) => {
  const [name, setName] = useState("General")
  const [type, setType] = useState("General")
  const [listGroups, setListGroups] = useState([])
  const [group, setgroup] = useState('')
  const [user, setUser] = useState('')

  function handlerName(value) {
    setName(value)
  }
  function handleReportType(value) {
    setType(value)
    setName(value)
  }

  let items = [
    {
      label: 'User Group',
      name: 'userGroup',
      type: 'select',
      placeholder: 'Group User',
      options: [{ key: "All", value: "All", label: "All" },
      { key: "G001", value: "G001", label: "Group 1" },
      { key: "G002", value: "G002", label: "Group 2" },
      { key: "G003", value: "G003", label: "Group 3" },]
    },
    {
      label: 'User',
      name: 'user',
      type: 'select',
      options: [{ key: "All", value: "All", label: "All" },
      { key: "F001", value: "F001", label: "Employee 1" },
      { key: "F002", value: "F002", label: "Employee 2" },
      { key: "F003", value: "F003", label: "Employee 3" },],
      placeholder: 'Users'
    }
  ]

  let itemsReport = {
    label: 'Report Type',
    name: 'type',
    type: 'radio',
    placeholder: 'Report Type',
    options: [
      { value: "General", name: "General", label: "General" },
      { value: "Individual", name: "Individual", label: "Individual" },
      { value: "Simple", name: "Simple", label: "Simple" },
    ],
    onValueChange: handleReportType
  }

  let itemsGroup = {
    label: 'User Group',
    name: 'userGroup',
    type: 'select',
    placeholder: 'Group User',
    options: [{ key: "All", value: "All", label: "All" },
    { key: "G001", value: "G001", label: "Group 1" },
    { key: "G002", value: "G002", label: "Group 2" },
    { key: "G003", value: "G003", label: "Group 3" },]
  };

  let itemsUsers = {
    label: 'User',
    name: 'user',
    type: 'select',
    options: [{ key: "All", value: "All", label: "All" },
    { key: "F001", value: "F001", label: "Employee 1" },
    { key: "F002", value: "F002", label: "Employee 2" },
    { key: "F003", value: "F003", label: "Employee 3" },],
    placeholder: 'Users'
  };

  return (
    <>
      <form
        className="form flex flex-wrap w-full">
        <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
          <div className="w-full lg:w-1/4">
            <TextInput label='Name' value={name} placeholder='Enter you name' onTextChange={handlerName} />
          </div>
          <div className="w-full lg:w-1/4">
            <Radios item={itemsReport} selected={type} />
          </div>
          <div className="w-full lg:w-1/4">
            <Selects item={itemsGroup} selected={group} />
          </div>
          <div className="w-full lg:w-1/4">
            <Selects item={itemsUsers} selected={user} />
          </div>
        </div>
      </form>
    </>
  )
}

export default FilterReport
