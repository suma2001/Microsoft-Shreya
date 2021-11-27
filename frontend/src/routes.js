
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Add from "@material-ui/icons/AddBoxRounded";
import Group from "@material-ui/icons/Group";
import People from "@material-ui/icons/People";
import Redeem from "@material-ui/icons/Redeem";
// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard.js";
import CreateGroup from "./views/CreateGroup/CreateGroup";
import AllGroups from "./views/AllGroups/AllGroups";
import RecommendedGroups from "./views/RecommendedGroups/RecommendedGroups";
import Profile from "./views/Profile/Profile";
import Rewards from "./views/Rewards/Rewards";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: <DashboardPage />,
    layout: "/admin",
  },
  {
    path: "/creategroup",
    name: "Create Group",
    icon: Add,
    component: <CreateGroup />,
    layout: "/admin",
  },
  {
    path: "/allgroups",
    name: "All Groups",
    icon: Group,
    component: <AllGroups />,
    layout: "/admin",
  },
  {
    path: "/recommendedgroups",
    name: "Recommended Groups",
    icon: People,
    component: <RecommendedGroups />,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: Person,
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/rewards",
    name: "Rewards",
    icon: Redeem,
    component: <Rewards />,
    layout: "/admin",
  },

];

export default dashboardRoutes;
