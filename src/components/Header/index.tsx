"use client";

import { useSession } from "../Provider";
import HomeHeader from "./HomeHeader";
import MainHeader from "./MainHeader";

const Header = () => {
  const { user } = useSession();

  return user ? <HomeHeader /> : <MainHeader />;
};

export default Header;
