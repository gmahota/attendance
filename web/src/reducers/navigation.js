import {
  FiSettings,
  FiToggleLeft,
  FiList,
  FiActivity,
  FiCalendar,
  FiStar,
  FiDroplet,
  FiGrid,
  FiClock,
  FiCopy,
  FiUser,
  FiPieChart,
  FiCompass,
  FiHelpCircle,
  FiShoppingCart,
  FiHome,
} from "react-icons/fi";

const initialState = [
  {
    title: "Attendance",
    items: [
      {
        url: "/dashboard",
        icon: <FiCompass size={20} />,
        title: "Dashboard",
        items: [],
      },
      {
        url: "/",
        icon: <FiActivity size={20} />,
        title: "Reports",
        items: [
          {
            url: "/reports",
            title: "Daily Report",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <FiSettings size={20} />,
        title: "Settings",
        badge: {
          color: "bg-indigo-500 text-white",
          text: 6,
        },
        items: [
          {
            url: "/workschedule",
            title: "Workschedules",
            items: [],
          },
          {
            url: "/groups",
            title: "Groups",
            items: [],
          },
          {
            url: "/users",
            title: "Users",
            items: [],
          },
        ],
      },
    ],
  },
  {
    title: "Pages",
    items: [
      {
        url: "/",
        icon: <FiCopy size={20} />,
        title: "Authentication",
        badge: {
          color: "bg-indigo-500 text-white",
          text: 7,
        },
        items: [
          {
            url: "/contact-us-1",
            title: "Contact us",
            items: [],
          },
          {
            url: "/login-1",
            title: "Login 1",
            items: [],
          },
          {
            url: "/create-account",
            title: "Create account",
            items: [],
          },
          {
            url: "/email-confirmation",
            title: "Email confirmation",
            items: [],
          },
          {
            url: "/logout",
            title: "Logout",
            items: [],
          },
          {
            url: "/reset-password",
            title: "Reset password",
            items: [],
          },
          {
            url: "/forgot-password",
            title: "Forgot password",
            items: [],
          },
          {
            url: "/lock-screen",
            title: "Lock screen",
            items: [],
          },
          {
            url: "/subscribe",
            title: "Subscribe",
            items: [],
          },
        ],
      },
    ],
  },
  {
    title: "Docs",
    items: [
      {
        url: "/documentation",
        icon: <FiHelpCircle size={20} />,
        title: "Documentation",
        items: [],
      },
    ],
  },
];

export default function navigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
