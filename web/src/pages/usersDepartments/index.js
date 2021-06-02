import React from "react";
import Router, { useRouter } from "next/router";
import moment from "moment";
import SectionTitle from "../../components/section-title";
import Widget from "../../components/widget";
import Datatable from "../../components/datatable";
import userDepartmentService from "../../services/userDepartment";
import { parseCookies } from 'nookies'

export default function UserDepartments({ allUserDepartments }) {
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
            <a href={`/usersDepartments/${props.value}`}>{props.value}</a>
          ),
        },
        {
          Header: "Name",
          accessor: "name",
        }
      ],
      []
    );
    const data = React.useMemo(() => allUserDepartments, []);
    return <Datatable columns={columns} data={data} />;
  };

  return (
    <>
      <SectionTitle title="Tables" subtitle="User's Groups" />
      <Widget
        title=""
        description={
          
        }
      >
        <Simple />
      </Widget>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { ['attendance.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const allUserDepartments = await userDepartmentService.get_UserDepartments();

  return {
    props: {
      allUserDepartments,
    },
  };
};
