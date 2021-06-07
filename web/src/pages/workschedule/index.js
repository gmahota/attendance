import React,{useState} from "react";
import Router, { useRouter } from "next/router";
import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";
import { TextInput } from "../../components/elements/forms/text-inputs";
import { Selects } from "../../components/elements/forms/selects";
import { Radios } from "../../components/elements/forms/radios";
import Modal from "../../components/partials/modals/create-modal";
import workService from "../../services/workschedule";
import { parseCookies } from 'nookies'

import {FiClock} from 'react-icons/fi'

export default function Workschedules({ allWorkschedules }) {
  const router = useRouter();

  const [type, setType] = useState("Normal");

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  let itemsReport = {
    label: "Type",
    name: "type",
    type: "radio",
    placeholder: "Scheduler Type",
    options: [
      { value: "Normal", name: "Normal", label: "Normal" },
      { value: "MultipleIn", name: "MultipleIn", label: "MultipleIn" },
      { value: "Extra", name: "Extra", label: "Extra" },
    ],
    onValueChange: handleWorkschedulesType,
  };

  function handleWorkschedulesType(value) {
    setType(value);
  }

  const Simple = () => {
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
      ],
      []
    );
    const data = React.useMemo(() => allWorkschedules, []);
    return <Datatable columns={columns} data={data} link="/workschedule" />;
  };

  return (
    <>
      <SectionTitle title="Tables" subtitle="Workschedules" />
      <Widget
        title=""
        description=""
        right={
          <Modal
            title="Create New Work Schedule"
            icon={
              <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                <FiClock size={18} className="stroke-current text-red-500" />
              </span>
            }
            body={
              <form>
                <div className="form flex flex-wrap w-full">
                  <div className="w-full  mb-4">
                    <div className="form-element-inline">
                      <div className="form-label">Id</div>
                      <input
                        name="id"
                        type="number"
                        className="form-input"
                        placeholder="Enter something..."
                      />
                    </div>
                  </div>
                  <div className="w-full  mb-4">
                    <div className="form-element-inline">
                      <div className="form-label">Name</div>
                      <input
                        name="id"
                        type="text"
                        className="form-input"
                        placeholder="Enter something..."
                      />
                    </div>
                  </div>

                  <div className="w-full  mb-4">
                    <Radios item={itemsReport} selected={type} />
                  </div>
                </div>
              </form>
            }
            buttonTitle="Save"
            buttonClassName="btn btn-default btn-rounded bg-green-500 hover:bg-red-600 text-white"
          />
        }
      >
        <Simple />
      </Widget>
    </>
  );
}

export const getServerSideProps= async (ctx) => {
  const { ['attendance.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  //await apiClient.get('/users')


  const allWorkschedules = await workService.get_Workschedules();
  console.log(allWorkschedules)
  return {
    props: {
      allWorkschedules,
    },
  };
}