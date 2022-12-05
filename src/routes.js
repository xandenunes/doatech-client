/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import Publish from "views/Publish";
import Published from "views/Published";
import CadastroUsuario from "views/CadastroUsuario";
import EditaPublicacao from "views/EditaPublicacao";
import CreatePublish from "views/CreatePublish";
import Login from "views/Login"
import FilterPublish from "views/FilterPublish"
import { name } from "commander";
//import UpgradeToPro from "views/Upgrade.js";

var routes = [
  {
    path: "/dashboard",
    name: "Painel",
    icon: null,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/publish",
    name: "Publicações",
    icon: "nc-icon nc-single-copy-04",
    component: Publish,
    layout: "/admin"
  },{
    path: "/create-publish",
    name: "Criar Publicação",
    icon: "nc-icon nc-simple-add",
    component: CreatePublish,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Matérial no Portal",
    icon: null,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Disponível na zona",
    icon: null,
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notificações",
    icon: null,
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "Perfil",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Meus matérias",
    icon: null,
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Sair",
    icon: "nc-icon nc-user-run",
    component: Login,
    layout: "/login",
    },
   {
    path: "/typography",
    name: "Typography",
    icon: null,
    component: Typography,
    layout: "/admin",
    },
   {
    path: "/cadastroUsuario",
    component: CadastroUsuario,
    name:"cadastroUsuario",
    layout: "/login",
  },
  {
    path: "/published/:id",
    name: "Publicação",
    icon: null,
    component: Published,
    layout: "/admin"
  },
  {
    path: "/material/:id",
    name: "Material",
    icon: null,
    component: EditaPublicacao,
    layout: "/admin",
  },
  {
    path: "/filter/:id",
    name: "Publicações f",
    icon: null,
    component: FilterPublish,
    layout: "/admin",
  },
];
export default routes;
