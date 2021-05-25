import React from "react";
import Router, { useRouter } from "next/router";
import SectionTitle from "../../components/section-title";
import Widget from "../../components/widget";
import Datatable from "../../components/datatable";
import userDepartmentService from "../../services/userDepartments";

export default function Departments({ allDeparments }) {
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
            <a href={`/departments/${props.value}`}>{props.value}</a>
          ),
        },
        {
          Header: "Name",
          accessor: "name",
        },
      ],
      []
    );
    const data = React.useMemo(() => allDeparments, []);
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
  const allUserDepartments = await userDepartmentService.get_UserDepartments();

  return {
    props: {
      allUserDepartments,
    },
  };
};
