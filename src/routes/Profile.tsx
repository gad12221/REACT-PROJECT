import { useEffect, useState } from "react";
import auth from "../services/auth";
import { RegisterUser } from "../@types/types";
import { Stack } from "@mui/material";

const Profile = () => {
  const userId = localStorage.getItem("user_id") ?? "no user id";
  const [user, setUser] = useState<RegisterUser>();

  useEffect(() => {
    auth
      .userDetails(userId)
      .then((res) => {
        setUser(res.data);

      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="sandBox flex flex-col justify-center items-center p-7 rounded-md text-center bg-gray-400 m-0.1 dark:bg-slate-700 relative drop-shadow-md">
      <Stack direction="column" spacing={8}>
        <div>
          {/* <img className="w-20 h-15 object-cover mt-3 rounded-full" src={user.image.url} alt="" /> */}
          <h2>First Name: {user?.name.first}</h2>
          <h2>Last Name: {user?.name.last}</h2>
          <h2>Email: {user?.email}</h2>
          <h2>Phone: {user?.phone}</h2>
          <h2>Address: {user?.address.city}</h2>
          <h2>Country: {user?.address.country}</h2>
          <h1 className={user?.isAdmin ? "text-red-600" : ""}>{user?.isAdmin ? "Admin - True" : ""}</h1>
          <h1 >{user?.isBusiness ? "isBusiness" : "Not A Business"}</h1>

          <div className="flex justify-center items-center gap-5 mt-2">

          </div>

        </div>

      </Stack>
    </div>
  );
};

export default Profile;