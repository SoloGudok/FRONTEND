import Header from "./components/Header";
import Footer from "./components/Footer";

import { Outlet } from "react-router-dom";

function Layout({ title, footermessage }) {
  return (
    <>
      <Header title={title} />
      <Outlet />
      <Footer message={footermessage} />
    </>
  );
}
export default Layout;
