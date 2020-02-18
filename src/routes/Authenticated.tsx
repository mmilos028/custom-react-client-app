// core components/views
import CreateMemberCardPage from '../views/authenticated/CreateMemberCardPage/CreateMemberCardPage';
import RedeemPage from '../views/authenticated/RedeemPage/RedeemPage';
import CashierReportPage from '../views/authenticated/CashierReportPage/CashierReportPage';
import HistoryReportPage from '../views/authenticated/HistoryReportPage/HistoryReportPage';

//import PrintMemberCardPage from '../views/authenticated/PrintMemberCardPage/PrintMemberCardPage';

const authenticatedRoutes = [
  {
    path: "/authenticated/create-member-card",
    sidebarName: "Attendant",
    navbarName: "Attendant",
    icon: "content_paste",
    component: CreateMemberCardPage
  },
  {
    path: "/authenticated/redeem",
    sidebarName: "Attendant",
    navbarName: "Attendant",
    icon: "content_paste",
    component: RedeemPage
  },
  {
    path: "/authenticated/report",
    sidebarName: "Attendant",
    navbarName: "Attendant",
    icon: "content_paste",
    component: CashierReportPage
  },
  {
    path: "/authenticated/history",
    sidebarName: "Attendant",
    navbarName: "Attendant",
    icon: "content_paste",
    component: HistoryReportPage
  },
  /*{
    path: "/authenticated/print-member-card",
    sidebarName: "Attendant",
    navbarName: "Attendant",
    icon: "content_paste",
    component: PrintMemberCardPage
  },*/
  {    
    redirect: true, 
    to: "/login"
  }
];

export default authenticatedRoutes;
