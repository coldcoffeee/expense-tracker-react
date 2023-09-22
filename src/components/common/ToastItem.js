import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import styles from "./ToastItem.module.css";

const ToastItem = ({ status, message }) => {
  console.log(
    status === "error"
      ? styles.error
      : status === "info"
      ? styles.info
      : status === "success"
      ? styles.success
      : styles.completed
  );
  return (
    <>
      <ToastContainer
        className={`${styles.toastContainer} p-3 text-white`}
        position="top-center"
        style={{ zIndex: 1, marginTop: "10vh" }}
      >
        <Toast
          className={`bg-${
            status === "success"
              ? "success"
              : status === "error"
              ? "danger"
              : status === "info"
              ? "primary"
              : "secondary"
          }`}
          // className={
          //   status === "error"
          //     ? styles.error
          //     : status === "info"
          //     ? styles.info
          //     : status === "success"
          //     ? styles.success
          //     : styles.completed
          // }
        >
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ToastItem;
