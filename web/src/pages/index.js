import Widget1 from "../components/dashboard/widget-1";
import Section from "../components/dashboard/section";
import SectionTitle from "../components/dashboard/section-title";
import { FiActivity, FiUsers, FiExternalLink, FiClock } from "react-icons/fi";
import { Bar1 } from "../components/dashboard/bar-chart";
import { Donut1 } from "../components/dashboard/donut-chart";
import { Line1 } from "../components/dashboard/line-chart";
import Dropdown1 from "../components/widgets/dropdown-1";
import Markets from "../components/dashboard/markets";
import { List } from "../components/dashboard/list";
import Tasks from "../components/tasks";
import { Timeline1 } from "../components/timelines";
import { parseCookies } from 'nookies'

const Index = () => {
  return (
    <>
      <SectionTitle title="Overview" subtitle="Dashboard" />
      
    </>
  );
};

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

  return {
    props: {}
  }
}

export default Index;
