import Header from "./components/Header";
import Footer from "./components/Footer";

import { Outlet, useLocation  } from "react-router-dom";

function Layout({ title, footermessage }) {
  const location = useLocation();

  const hideHeaderOnPages = ["/firstPage"];
  const shouldHideHeader = hideHeaderOnPages.includes(location.pathname);

  return (

    <div className="layout">
      {/* FirstPage가 아닐 때만 헤더 표시 */}
      {!shouldHideHeader && <Header />}

      {/* <Header title={title} /> */}
      <main className="content">
        <Outlet />
      </main>
      <Footer message={footermessage} />
    </div>
  );
}
export default Layout;
