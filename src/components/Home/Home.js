import { useEffect, useState } from "react";

import ToastItem from "../common/ToastItem";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const [showToast, setShowToast] = useState({
    status: "completed",
    message: "",
  });
  useEffect(() => {
    if (location.state) {
      setShowToast({ status: "success", message: location.state.message });
      setTimeout(setShowToast, 5000, { status: "completed", message: "" });
    }
  }, [location.state]);
  return (
    <>
      {showToast.status !== "completed" && (
        <ToastItem status={showToast.status} message={showToast.message} />
      )}
      <div className="w-100 h-full d-flex fs-1 justify-content-center align-items-center text-info">
        Home
      </div>
    </>
  );
};

export default Home;
