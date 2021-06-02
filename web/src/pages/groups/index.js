import React from "react";
import Router, { useRouter } from "next/router";
import moment from "moment";
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
        ,
        {
          Header: "Created Att",
          accessor: "createdAt",
          Cell:(props) => <span>{moment(props.value).format('DD-MM-YYYY HH:mm:ss')}</span>
        },
        {
          Header: "Update Att",
          accessor: "updatedAt",
          Cell:(props) => <span>{moment(props.value).format('DD-MM-YYYY HH:mm:ss')}</span>
        },
        {
          Header: "Parent Id",
          accessor: "parent_id",
          Cell: (props) => (
            <a href={`/usersDepartments/${props.value}`}>{props.value}</a>
          ),
        }
      ],
      []
    );
    const data = React.useMemo(() => allUserGroup, []);
    return <Datatable columns={columns} data={data} />;
  };

  return (
    <>
      <SectionTitle title="List Of" subtitle="User Groups" />
      <Widget
        title=""
        description=""
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
