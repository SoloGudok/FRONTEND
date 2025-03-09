import Header from "./components/Header";
import Footer from "./components/Footer";

import { Outlet } from "react-router-dom";

function Layout({ title, footermessage }) {
  return (
    <div className="layout">
      <Header title={title} />
      <main className="content">
        <Outlet />
      </main>
      <Footer message={footermessage} />
    </div>
  );
}
export default Layout;
