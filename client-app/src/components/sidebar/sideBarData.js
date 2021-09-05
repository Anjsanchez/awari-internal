import EmojiFoodBeverageTwoToneIcon from "@material-ui/icons/EmojiFoodBeverageTwoTone";
import DashboardTwoToneIcon from "@material-ui/icons/DashboardTwoTone";
import BallotTwoToneIcon from "@material-ui/icons/BallotTwoTone";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import LocalMallTwoToneIcon from "@material-ui/icons/LocalMallTwoTone";
import AccountBalanceWalletTwoToneIcon from "@material-ui/icons/AccountBalanceWalletTwoTone";
import LocalOfferTwoToneIcon from "@material-ui/icons/LocalOfferTwoTone";
import ShoppingBasketTwoToneIcon from "@material-ui/icons/ShoppingBasketTwoTone";
export const sideBarData = [
  {
    title: "General",
    id: 0,
    subNav: [
      {
        subTitle: "Dashboard",
        icon: <DashboardTwoToneIcon />,
        path: "/",
        id: 1,
      },
    ],
  },
  {
    title: "Reservation",
    id: 16,
    subNav: [
      {
        subTitle: "Active Bookings",
        icon: <BallotTwoToneIcon />,
        path: "/a/reservation-management/reservations",
        id: 17,
      },
    ],
  },
  {
    title: "Commerce",
    id: 18,
    subNav: [
      {
        subTitle: "Shop",
        icon: <EmojiFoodBeverageTwoToneIcon />,
        path: "/a/commerce-management/shop",
        id: 19,
      },
      {
        subTitle: "Cart Item",
        icon: <ShoppingBasketTwoToneIcon />,
        path: "/a/commerce-management/cart",
        id: 20,
      },
    ],
  },
  {
    title: "Resource Management",
    id: 2,
    subNav: [
      {
        subTitle: "Users",
        icon: <AccountCircleTwoToneIcon />,
        id: 3,
        subNav: [
          { title: "Employees", path: "/a/user-management/employees", id: 4 },
          {
            title: "Customers",
            path: "/a/user-management/customers",
            id: 5,
          },
        ],
      },
      {
        subTitle: "Rooms",
        icon: <HomeTwoToneIcon />,
        id: 6,
        subNav: [
          {
            title: "Variants",
            path: "/a/room-management/room-variants",
            id: 7,
          },
          {
            title: "Rooms",
            path: "/a/room-management/rooms",
            id: 8,
          },
          {
            title: "Pricings",
            path: "/a/room-management/room-pricings",
            id: 9,
          },
        ],
      },
      {
        subTitle: "Products",
        icon: <LocalMallTwoToneIcon />,
        id: 10,
        subNav: [
          {
            title: "Category",
            path: "/a/product-management/category",
            id: 11,
          },
          {
            title: "Products",
            path: "/a/product-management/products",
            id: 12,
          },
        ],
      },
    ],
  },
  {
    title: "System Functionality",
    id: 13,
    subNav: [
      {
        subTitle: "Payments",
        icon: <AccountBalanceWalletTwoToneIcon />,
        id: 14,
        path: "/a/system-functionality/payments",
      },
      {
        subTitle: "Discounts",
        icon: <LocalOfferTwoToneIcon />,
        id: 15,
        path: "/a/system-functionality/discounts",
      },
    ],
  },
];
