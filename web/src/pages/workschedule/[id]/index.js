import React from "react";
import Router, { useRouter } from "next/router";
import moment from "moment";

import SimpleShifts from "../../../components/partials/attendance-shifts";

import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";
import workService from "../../../services/workschedule";
import Datatable from "../../../components/elements/datatable/ActionsTable";
import { UnderlinedTabs} from "../../../components/elements/tabs";

export default function Workschedules({ workschedule, allUsers , allGroups}) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  const TabShifts = () =><div workschedule={workschedule}/>;

  const TabUsers = ({ allUsers }) => <SimpleUsers allUsers={allUsers} />;

  const TabGroupUsers = ({ allGroups }) => (
    <SimpleTabGroupUsers allGroups={allGroups} />
  );

  const tabs = [
    {
      index: 0,
      title: "Shifts",
      active: true,
      content: <TabShifts schedule={workschedule} />,
    },
    {
      index: 1,
      title: "Users",
      active: false,
      content: <TabUsers allUsers={allUsers} />,
    },
    {
      index: 2,
      title: "Groups",
      active: false,
      content: <TabGroupUsers allGroups={allGroups} />,
    },
  ];

  const SimpleUsers = ({ allUsers }) => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Code",
          accessor: "id",
          Cell: (props) => <a href={`/users/${props.value}`}>{props.value}</a>,
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "User Group",
          accessor: "userGroup",
          Cell: (props) => (
            <a href={`/groups/${props.value?.name}`}>{props.value?.name}</a>
          ),
        },
        {
          Header: "Schedule",
          accessor: "schedule",
          Cell: (props) => (
            <a href={`/workschedule/${props.value?.name}`}>
              {props.value?.name}
            </a>
          ),
        },
      ],
      []
    );
    const data = React.useMemo(() => allUsers, []);
    return <Datatable columns={columns} data={data} />;
  };

  const SimpleTabGroupUsers = ({ allGroups }) => {

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
    const data = React.useMemo(() => allGroups, []);
    return <Datatable columns={columns} data={data} />;
  };

  return (
    <>
      <SectionTitle
        title="Tables"
        subtitle={`Workschedule - ${workschedule.id}. ${workschedule.name}`}
      />
      <Widget title="" description="">
        <div className="flex flex-wrap">
          <div className="w-full">
            <UnderlinedTabs tabs={tabs} />
          </div>
        </div>
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
    console.log(workschedule)

    const users = await workService.get_Workschedule_Users(id[0]);

    const groups = await workService.get_Workschedule_Groups(id[0]);
    
    return {
      props: {
        workschedule: workschedule,
        allUsers: users || [],
        allGroups: groups || []
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        workschedule: null,
        allUsers: [],
        allGroups: []
      },
      revalidate: 10,
    };
  }
};
