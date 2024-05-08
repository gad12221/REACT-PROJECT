import { createBrowserRouter } from "react-router-dom";
import Register from "./Register.tsx";
import Login from "./Login.tsx";
import Cards from "./Cards.tsx";
import Error from "./Error.tsx";
import Root from "../layouts/Root.tsx";
import Card from "./Card.tsx";
import Playground from "./Playground.tsx";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.tsx";
import PlayGroundd from "./PlayGroundd.tsx";
import Profile from "./Profile.tsx";
import CreateCard from "./CreateCard.tsx";
import PlayGrounddd from "./PlayGrounddd.tsx";

import MyFav from "./MyFav.tsx";
import CardEdit from "./CardEditor.tsx";
import LikedCards from "./LikedCards.tsx";
import MyCards from "./MyCards.tsx";
import AdminProtector from "../components/ProtectedRoute/AdminProtector.tsx";
import SandBox from "./SandBox.tsx";
import UserEditor from "./UserEditor.tsx";
import About from "./About.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Cards /> },
      { path: "/register", element: <Register /> },
      { path: '/about', element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/cards", element: <Cards /> },
      { path: "/cards/:id", element: <Card /> },
      /*  { path: "/playGroundd", element: <PlayGroundd /> }, */
      { path: "/playGrounddd", element: <PlayGrounddd /> },
      {
        path: "/playground", element: (
          <ProtectedRoute>
            <Playground />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile", element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/createCard", element: (
          <ProtectedRoute>
            <CreateCard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myFav", element: (
          <ProtectedRoute>
            <MyFav />
          </ProtectedRoute>
        ),
      },
      {
        path: "/mycards", element: (
          <ProtectedRoute>
            <MyCards />
          </ProtectedRoute>
        )
      },
      {
        path: '/cardEdit/:id', element: (
          <ProtectedRoute>
            <CardEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: '/sandbox', element: (

          <AdminProtector>
            <SandBox />
          </AdminProtector>)

      },
      {
        path: '/usereditor/:id', element: (

          <AdminProtector>
            <UserEditor />
          </AdminProtector>
        )
      },

      {
        path: '/likedCards', element: <LikedCards />
      }
    ],
  },
]);

export default router