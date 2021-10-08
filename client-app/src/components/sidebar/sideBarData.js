import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import BallotTwoToneIcon from "@material-ui/icons/BallotTwoTone";
import LocalMallTwoToneIcon from "@material-ui/icons/LocalMallTwoTone";
import DashboardTwoToneIcon from "@material-ui/icons/DashboardTwoTone";
import AssessmentTwoToneIcon from "@material-ui/icons/AssessmentTwoTone";
import LocalOfferTwoToneIcon from "@material-ui/icons/LocalOfferTwoTone";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import ShoppingBasketTwoToneIcon from "@material-ui/icons/ShoppingBasketTwoTone";
import EmojiFoodBeverageTwoToneIcon from "@material-ui/icons/EmojiFoodBeverageTwoTone";
import AccountBalanceWalletTwoToneIcon from "@material-ui/icons/AccountBalanceWalletTwoTone";
import AnnouncementTwoToneIcon from "@material-ui/icons/AnnouncementTwoTone";
export const sideBarData = [
  {
    title: "General",
    id: 101,
    subNav: [
      {
        subTitle: "Dashboard",
        icon: <DashboardTwoToneIcon />,
        path: "/",
        id: 1,
      },
      {
        subTitle: "Approval Request",
        icon: <AnnouncementTwoToneIcon />,
        path: "/a/general/approval-request",
        id: 17,
      },
    ],
  },

  {
    title: "Reservation",
    id: 102,
    subNav: [
      {
        subTitle: "Active Bookings",
        icon: <BallotTwoToneIcon />,
        path: "/a/reservation-management/reservations",
        id: 2,
      },
    ],
  },
  {
    title: "Report",
    id: 109,
    subNav: [
      {
        subTitle: "Booking History",
        icon: <AssessmentTwoToneIcon />,
        id: 110,
        subNav: [
          {
            title: "By Booking",
            path: "/a/reservation-management/report/booking-history/header",
            id: 14,
          },
          {
            title: "By Transaction",
            path: "/a/reservation-management/report/booking-history/transaction",
            id: 15,
          },
          {
            title: "By Room",
            path: "/a/reservation-management/report/booking-history/room",
            id: 16,
          },
        ],
      },
    ],
  },
  {
    title: "Commerce",
    id: 103,
    subNav: [
      {
        subTitle: "Shop",
        icon: <EmojiFoodBeverageTwoToneIcon />,
        path: "/a/commerce-management/shop",
        id: 3,
      },
      {
        subTitle: "Cart Item",
        icon: <ShoppingBasketTwoToneIcon />,
        path: "/a/commerce-management/cart",
        id: 4,
      },
    ],
  },
  {
    title: "Resource Management",
    id: 104,
    subNav: [
      {
        subTitle: "Users",
        icon: <AccountCircleTwoToneIcon />,
        id: 105,
        subNav: [
          { title: "Employees", path: "/a/user-management/employees", id: 5 },
          {
            title: "Customers",
            path: "/a/user-management/customers",
            id: 6,
          },
        ],
      },
      {
        subTitle: "Rooms",
        icon: <HomeTwoToneIcon />,
        id: 106,
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
            title: "Pricing",
            path: "/a/room-management/room-pricings",
            id: 9,
          },
        ],
      },
      {
        subTitle: "Products",
        icon: <LocalMallTwoToneIcon />,
        id: 107,
        subNav: [
          {
            title: "Category",
            path: "/a/product-management/category",
            id: 10,
          },
          {
            title: "Products",
            path: "/a/product-management/products",
            id: 11,
          },
        ],
      },
    ],
  },
  {
    title: "System Functionality",
    id: 108,
    subNav: [
      {
        subTitle: "Payments",
        icon: <AccountBalanceWalletTwoToneIcon />,
        id: 12,
        path: "/a/system-functionality/payments",
      },
      {
        subTitle: "Discounts",
        icon: <LocalOfferTwoToneIcon />,
        id: 13,
        path: "/a/system-functionality/discounts",
      },
    ],
  },
];
