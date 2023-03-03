import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Social } from "../Social/Social"
import "./Layout.scss";

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {/* <Social /> */}
      {children}
      <Footer />
    </div>
  );
};
