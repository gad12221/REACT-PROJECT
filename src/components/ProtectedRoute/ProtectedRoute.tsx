import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Navigate } from "react-router-dom";
import { FCC } from "../../@types/types";

const ProtectedRoute: FCC = ({ children }) => {

  // const { isLoggedIn } = useContext(AuthContext);
  const isLoggedIn = localStorage.getItem('token');

  if (!isLoggedIn) {
    return <Navigate to={"/"} replace />
  }




  return (
    <>
      <div>
        {children}
      </div>
    </>
  )
}

export default ProtectedRoute