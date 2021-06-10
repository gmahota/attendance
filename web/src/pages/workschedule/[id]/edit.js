import React from "react";
import SectionTitle from "../../../components/elements/section-title";
import Router, { useRouter } from "next/router";

import Widget from "../../../components/elements/widget";
import Datatable from "../../../components/elements/datatable/ActionsTable";
import { TextInput } from "../../../components/elements/forms/text-inputs";
import { Selects } from "../../../components/elements/forms/selects";
import { Radios } from "../../../components/elements/forms/radios";
import Modal from "../../../components/partials/modals/create-modal";

import { parseCookies } from 'nookies'

import {FiClock} from 'react-icons/fi'

import workService from "../../../services/workschedule";

export default function Workschedules({ workschedule }) {
  return (
    <>
      <SectionTitle title="Tables" subtitle="Workschedules" />
      <Widget
        title=""
        description=""
        right={
          <Modal
            title="Edit Work Schedule"
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
                      <div className="form-label">Code</div>
                      <p>ID:{id}</p>
                      {/* <input
                        name="id"
                        type="text"
                        value={id}
                        onChange={event => setId(event.target.value)}
                        className="form-input"
                        placeholder="Enter something..."
                      /> */}
                    </div>
                  </div>
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

                  <div className="w-full  mb-4">
                    <Radios item={itemsReport} selected={type} />
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
        <Simple />
      </Widget>
    </>
  );
}

export const getStaticPaths = async (req) => {
  try {
    const workschedules = await workService.get_Workschedules();

    const paths = workschedules?.map((item) => {
      return { params: { id: item.id.toString() } };
    });

    return {
      paths,
      fallback: true,
    };
  } catch (e) {
    console.log(e);

    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps = async (context) => {
  try {
    const { id } = context.params;

    const workschedule = await workService.get_Workschedule(id[0]);

    return {
      props: {
        workschedule: workschedule,
      },
      revalidate: 10,
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        workschedule: null,
      },
      revalidate: 10,
    };
  }
};
