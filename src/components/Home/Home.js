import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ToastItem from "../common/ToastItem";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const [showToast, setShowToast] = useState({
    status: "completed",
    message: "",
  });
  const [showProfileToast, setShowProfileToast] = useState({
    status: "completed",
    message: "",
  });

  useEffect(() => {
    if (location.state) {
      setShowToast({ status: "success", message: location.state.message });
      setTimeout(setShowToast, 5000, { status: "completed", message: "" });
    }
  }, [location.state]);

  useEffect(() => {
    const linkElem = (
      <>
        <NavLink to="/profile" className={() => "text-white"}>
          Click here
        </NavLink>{" "}
        to update your profile.
      </>
    );
    setShowProfileToast({ status: "info", message: linkElem });
    setTimeout(setShowProfileToast, 5000, { status: "completed", message: "" });
  }, []);

  return (
    <>
      {showToast.status !== "completed" && (
        <ToastItem status={showToast.status} message={showToast.message} />
      )}
      {showProfileToast.status !== "completed" && (
        <ToastItem
          status={showProfileToast.status}
          message={showProfileToast.message}
        />
      )}
      <div className="w-100 h-full d-flex fs-1 justify-content-center align-items-center text-info">
        Home
      </div>
    </>
  );
};

export default Home;
