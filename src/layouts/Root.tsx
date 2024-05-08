// src/layouts/Root.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Root = () => {
  // state that we will share with the entire app:

  return (
    <div className="flex flex-col min-h-screen text-blue-500">
      <Header />
      <main className="flex-1 dark:bg-gray-600">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;