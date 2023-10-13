<<<<<<< Updated upstream
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ margin: "250px 150px" }}
      >
        <h1 className="display-6 text-primary mx-auto">
          Fuel Quote Management System
        </h1>
        <div className="d-grid gap-5 col-3 mt-2 ms-5">
          <Link to="/login" className="btn btn-primary btn-lg fs-4">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary btn-lg fs-4">
            Register
          </Link>
        </div>
      </div>
    </>
  );
=======
export default function Home() {
  return <div>Home</div>;
>>>>>>> Stashed changes
}
