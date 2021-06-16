import React from "react";
import Router, { useRouter } from "next/router";
import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";

import Datatable from "../../../components/elements/datatable";
import userService from "../../../services/user";

export default function Workschedules({ user }) {
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
        {
          Header: "Type",
          accessor: "type",
        },
        {
          Header: "Time In",
          accessor: "timeIn",
          Cell: (props) => <span>{getDateTime(props.value)}</span>,
        },
        {
          Header: "Time Out",
          accessor: "timeOut",
          Cell: (props) => <span>{getDateTime(props.value)}</span>,
        },
        {
          Header: "Grace Period",
          accessor: "gracePeriod",
        },
        {
          Header: "Day Of Week",
          accessor: "dayOfWeek",
        },
      ],
      []
    );
    const data = React.useMemo(() => workschedule.Shifts, []);
    return <Datatable columns={columns} data={data} />;
  };

  return (
    <>
      <SectionTitle title="Tables" subtitle={`User - ${user.name}`} />
      <Widget
        title="Details"
        description={
          <span>
            {user.name} <code>&lt;Shifts, assign... /&gt;</code>
          </span>
        }
      >
        {/* <Simple /> */}
      </Widget>
    </>
  );
}


export const getServerSideProps = async (context) => {
  try {
    const { id } = context.params;

    const user = await userService.get_User(id[0]);

    return {
      props: {
        user: user,
      },
      revalidate: 10,
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        user: null,
      },
      revalidate: 10,
    };
  }
};
