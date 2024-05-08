import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers, updateUser, usersUrl } from "../services/auth";
import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { RegisterUser } from "../@types/types";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { showErrorDialog, showSuccessDialog } from "../UI/dialogs";

const SandBox = () => {
  const [usersApi, setUsersApi] = useState([]);
  const navigate = useNavigate();
  const userLink = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users';

  // Call getAllUsers() when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsersApi(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const onDeleteUser = (id: string) => {
    deleteUser(id).then((res) => {
      console.log(res)
      showSuccessDialog("Deleted", "User deleted Successfully").then(() => {

      })
      fetchUsers().catch((err) => console.log(err))
    })
  }

  const onUpdateUser = (id: string, data: RegisterUser) => {
    updateUser(id, data).then((res) => {
      console.log(res)
    }).catch((err) => console.log(err))
  };

  return (
    <div className="sandBox flex flex-col justify-center items-center p-7 rounded-md text-center bg-gray-400 m-0.1 dark:bg-slate-700 relative drop-shadow-md">
      <Stack direction="column" spacing={8}>
        {usersApi.map((u) => (
          <div className="flex flex-col justify-center items-center p-7 rounded-md text-center bg-gray-400 m-0.1 dark:bg-slate-800 relative drop-shadow-md" key={u._id}>
            <img className="w-20 h-15 object-cover mt-3 rounded-full" src={u.image.url} alt="" />
            <h2>First Name: {u.name.first}</h2>
            <h2>Last Name: {u.name.last}</h2>
            <h1 className={u.isAdmin ? "text-red-600" : ""}>{u.isAdmin ? "is Admin - True (unRemovable)" : "Admin - False"}</h1>
            <h1 >{u.isBusiness ? "isBusiness" : "notBusiness"}</h1>

            <div className="flex justify-center items-center gap-5 mt-2">

              <button onClick={() => {
                onUpdateUser(u, u._id);
                navigate(`/userEditor/${u._id}`);
              }}>
                <LuPencil />
              </button>
              <button onClick={() => onDeleteUser(u._id)}><FaRegTrashCan className="text-red-600" /></button>

            </div>

          </div>
        ))}
      </Stack>
    </div>
  );
};

export default SandBox;