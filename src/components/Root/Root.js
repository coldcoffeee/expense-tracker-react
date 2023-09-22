// import React from "react";
// import Header from "../Header/Header";
// import Filler from "../Header/Filler";
// import Footer from "../Footer/Footer";
// import CartModal from "../CartModal/CartModal";
// import CartContextProvider from "../../context/CartContextProvider";
// import { Outlet } from "react-router-dom";

// const Root = () => {
//   const [showCart, setShowCart] = React.useState(false);

//   return (
//     <CartContextProvider>
//       <Filler />
//       <Header onShowCart={setShowCart} />
//       <CartModal show={showCart} onCloseCart={setShowCart} />
//       <Outlet />
//       <Footer />
//     </CartContextProvider>
//   );
// };

// export default Root;
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";

const Root = () => {
  return (
    <>
      <Container className={styles.mainContainer}>
        <Header />
        <Outlet />
        <Footer />
      </Container>
    </>
  );
};

export default Root;
