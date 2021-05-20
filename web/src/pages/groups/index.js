import React from "react";
import Router, { useRouter } from "next/router";
import SectionTitle from "../../components/section-title";
import Widget from "../../components/widget";
import Datatable from "../../components/datatable";
import userGroupService from "../../services/userGroup";

export default function Workschedules({ allUserGroup }) {
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
          Cell: (props) => <a href={`/groups/${props.value}`}>{props.value}</a>,
        },
        {
          Header: "Name",
          accessor: "name",
        },
      ],
      []
    );
    const data = React.useMemo(() => allUserGroup, []);
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
  const allUserGroup = await userGroupService.get_UserGroups();

  return {
    props: {
      allUserGroup,
    },
  };
};
