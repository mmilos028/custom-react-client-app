import Dashboard from "@material-ui/icons/Dashboard";
import LoginPage from "../views/LoginPage/LoginPage";

const loginRoutes = [
  {
    path: "/login",
    sidebarName: "Login",
    navbarName: "Login",
    icon: Dashboard,
    component: LoginPage
  },
  {    
    redirect: true, 
    to: "/login"
  }
];

export default loginRoutes;
