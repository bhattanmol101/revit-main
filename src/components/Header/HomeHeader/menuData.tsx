import { Menu } from "@/src/types/menu";
import { BusinessIcon, ForumIcon, HomeIcon } from "../../Icons";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    icon: <HomeIcon size={26} />,
    path: "/home",
  },
  {
    id: 2,
    title: "Forums",
    icon: <ForumIcon size={28} className="-mb-0.5" />,
    path: "/forums",
  },
  {
    id: 3,
    title: "Business",
    icon: <BusinessIcon size={28} className="-mb-0.5" />,
    path: "/business",
  },
];

export default menuData;
