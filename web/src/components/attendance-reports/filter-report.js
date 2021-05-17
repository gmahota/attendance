import React, {useState} from 'react'
import Validation from '../forms/validation'
import Alert from '../alerts'

const FilterReport = ({message = null}) => {
  const [data, onSubmit] = useState(null)
  let items = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'Enter you name'
    },
    {
      label: 'Report Type',
      name: 'type',
      type: 'text',
      placeholder: 'Report Type'
    },
    {
      label: 'User Group',
      name: 'userGroup',
      type: 'text',
      placeholder: 'Group User'
    },
    {
      label: 'User',
      name: 'user',
      type: 'text',
      placeholder: 'Group User'
    }
  ]
  return (
    <>
      <div className="flex flex-col">
        {data && message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised>
              {message}
            </Alert>
          </div>
        )}
        <Validation items={items} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export default FilterReport
