import { Outlet } from "react-router-dom";

const AuthPage = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <Outlet />
      </div>
    </div>
  </div>
);

export default AuthPage;
