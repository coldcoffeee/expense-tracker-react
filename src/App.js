import Signup from "./components/Signup/Signup";
import Root from "./components/Root/Root";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "home", element: <Home /> },
        { path: "signup", element: <Signup /> },
        { path: "profile", element: <Profile /> },
      ],
      errorElement: () => <h1>404</h1>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
