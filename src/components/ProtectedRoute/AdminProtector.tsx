import { useContext } from "react";
import { FCC } from "../../@types/types";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AdminProtector: FCC = ({ children }) => {
  const { isAdmin } = useContext(AuthContext);

  if (!isAdmin) {
    return <Navigate to={"/"} replace />;
  }


  return (
    <>
      <div>
        {children}
      </div>
    </>
  );
};
export default AdminProtector