import React from "react";
import Router, { useRouter } from "next/router";

import workService from "../../../services/workschedule";

export default function Workschedules({ workschedule }) {
  return <h1>Ola Mundo {workschedule.name}</h1>
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
