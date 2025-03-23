import Header2 from "./components/Header2";
import Footer from "./components/Footer";

import { Outlet, useLocation } from "react-router-dom";

function Layout({ title, footermessage }) {
  const location = useLocation();

  const hideHeaderOnPages = ["/firstPage"];
  const shouldHideHeader = hideHeaderOnPages.includes(location.pathname);

  return (
    <div className="layout">
      {/* FirstPage가 아닐 때만 헤더 표시 */}
      {!shouldHideHeader && <Header2 />}

      {/* <Header title={title} /> */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
