import React from "react";
import Router, { useRouter } from "next/router";
import SectionTitle from "../../components/section-title";
import Widget from "../../components/widget";
import Datatable from "../../components/datatable";
import workService from "../../services/workschedule";

export default function Workschedules({ allWorkschedules }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
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
      ],
      []
    );
    const data = React.useMemo(() => allWorkschedules, []);
    return <Datatable columns={columns} data={data} />;
  };

  return (
    <>
      <SectionTitle title="Tables" subtitle="Workschedules" />
      <Widget
        title="List Of Workschedule"
        description={
          <span>
            Use the <code>&lt;Datatable /&gt;</code> component to create a data
            table
          </span>
        }
      >
        <Simple />
      </Widget>
    </>
  );
}

export const getStaticProps = async () => {
  const allWorkschedules = await workService.get_Workschedules();

  return {
    props: {
      allWorkschedules,
    },
  };
};
