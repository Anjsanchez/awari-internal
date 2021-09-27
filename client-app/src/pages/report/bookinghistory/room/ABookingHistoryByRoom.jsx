import moment from "moment";
import "./../css/BookingHistory.css";
import { useSnackbar } from "notistack";
import BhByRoomsbody from "./BhByRoomsbody";
import { useMountedState } from "react-use";
import BhByRoomDrawer from "./BhByRoomDrawer";
import SpinLoader from "../../../../common/Spin";
import React, { useState, useEffect } from "react";
import BookingHistoryHeader from "./../../Common/BookingHistoryHeader";
import { getRoles } from "./../../../../utils/services/pages/RoleService";
import { getRooms } from "./../../../../utils/services/pages/rooms/RoomService";
import { getEmployees } from "./../../../../utils/services/pages/EmployeeService";
import { getTransRooms } from "./../../../../utils/services/pages/trans/TransRoomService";
import { getRoomVariants } from "./../../../../utils/services/pages/rooms/RoomVariantService";
import { getDiscounts } from "./../../../../utils/services/pages/functionality/DiscountService";

const ABookingHistoryByRoom = () => {
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [rooms, setRooms] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [transLines, setTransLines] = useState([]);
  const [roomVariant, setRoomVariants] = useState([]);
  const [employeeRole, setEmployeeRoles] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);
  const [filteredTransLines, setFilteredTransLines] = useState([]);
  const [isFilterDrawerShow, setIsFilterDrawerShow] = useState(false);
  //Filters
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    fromDate: moment().startOf("month"),
    toDate: moment().endOf("month"),
  });

  const onFilterShow = () => setIsFilterDrawerShow(!isFilterDrawerShow);

  useEffect(() => {
    //..

    async function GetTransHeader() {
      try {
        const { data } = await getTransRooms();

        if (!isMounted()) return;

        setTransLines(data.listRecords);
      } catch (error) {
        enqueueSnackbar("0013: An error occured while calling the server.", {
          variant: "error",
        });
      }
    }

    async function getRoomData() {
      try {
        const { data } = await getRooms(true);
        const { data: variants } = await getRoomVariants(true);
        const { listRecords } = data;
        const { listRecords: listVariants } = variants;

        const sorted = listRecords.sort((a, b) =>
          a.roomLongName.localeCompare(b.roomLongName)
        );

        const sortedvariant = listVariants.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        const roomData = [];
        const variantsData = [];

        sorted.map((n) => {
          return roomData.push({
            name: n.roomLongName,
            key: n._id,
            text: n.roomLongName,
            value: n.roomLongName,
            variant: n.roomVariant.name,
          });
        });

        sortedvariant.map((n) => {
          return variantsData.push({
            name: n.name,
            key: n._id,
            text: n.name,
            value: n.name,
          });
        });

        if (!isMounted()) return;

        setRooms(roomData);
        setRoomVariants(variantsData);
      } catch (error) {
        enqueueSnackbar("0015: An error occured while calling the server.", {
          variant: "error",
        });
      }
    }

    async function GetEmployees() {
      try {
        const { data } = await getEmployees(true);
        const { data: listRoles } = await getRoles(true);
        const { listRecords } = data;

        const sorted = listRecords.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );

        const sorterRoles = listRoles.sort((a, b) =>
          a.rolename.localeCompare(b.rolename)
        );

        const empData = [];
        const RolesData = [];

        sorted.map((n) => {
          return empData.push({
            name: n.firstName + " " + n.lastName,
            key: n.id,
            text: n.firstName,
            value: n.firstName,
            role: n.role.rolename,
          });
        });

        sorterRoles.map((n) => {
          return RolesData.push({
            text: n.rolename,
            value: n.rolename,
          });
        });

        if (!isMounted()) return;

        setEmployees(empData);
        setEmployeeRoles(RolesData);
      } catch (error) {
        enqueueSnackbar("0014: An error occured while calling the server.", {
          variant: "error",
        });
      }
    }

    async function fetchDiscounts() {
      try {
        const { data } = await getDiscounts(true);
        const { listRecords } = data;

        const sorted = listRecords.sort((a, b) => a.name.localeCompare(b.name));

        const discData = [];

        sorted.map((n) => {
          return discData.push({
            name: n.name,
            key: n._id,
            text: n.name,
            value: n.name,
          });
        });

        if (!isMounted()) return;

        setInitialLoadForm(true);
        setDiscounts(discData);
      } catch (error) {
        enqueueSnackbar("0011: An error occured while calling the server.", {
          variant: "error",
        });
      }
    }

    GetTransHeader();
    getRoomData();
    GetEmployees();
    fetchDiscounts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setInitialLoadForm(false);

    const tranx = [...transLines];

    const filterDate = () => {
      const fromDateClone = selectedDate.fromDate
        .clone()
        .format("YYYY-MM-DD 00:00:00");
      const toDateClone = selectedDate.toDate
        .clone()
        .format("YYYY-MM-DD 23:59:00");

      const flteredDate = tranx.filter((item) =>
        moment(item.createdDate).isBetween(fromDateClone, toDateClone)
      );

      return flteredDate;
    };

    const filteredDate = filterDate();

    const filteredEmployee = filteredDate.filter((item) => {
      if (selectedEmployee.length === 0) return filteredDate;
      return selectedEmployee.includes(item.user.id);
    });

    const filteredRooms = filteredEmployee
      .filter((n) => n.room !== null)
      .filter((item) => {
        if (selectedRoom.length === 0) return filteredEmployee;
        return selectedRoom.includes(item.room._id);
      });

    const filteredVariant = filteredRooms.filter((item) => {
      if (selectedVariant.length === 0) return filteredRooms;
      return selectedVariant.includes(item.room.roomVariantId);
    });

    const filteredDiscounts = filteredVariant
      .filter((n) => {
        if (selectedDiscount.length === 0) return filteredVariant;
        return n.discount !== null;
      })
      .filter((item) => {
        if (selectedDiscount.length === 0) return filteredVariant;
        return selectedDiscount.includes(item.discount._id);
      });

    setFilteredTransLines(filteredDiscounts);
    setInitialLoadForm(true);
    //..
  }, [
    selectedRoom,
    selectedEmployee,
    selectedVariant,
    selectedDiscount,
    selectedDate,
    transLines,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderBody = () => {
    if (!initialLoadForm) {
      return <SpinLoader />;
    }

    return <BhByRoomsbody filteredTrans={filteredTransLines} />;
  };
  return (
    <>
      <BookingHistoryHeader
        title="By Booking - Room"
        onFilterShow={onFilterShow}
      />
      <BhByRoomDrawer
        onFilterShow={onFilterShow}
        isFilterDrawerShow={isFilterDrawerShow}
        rooms={rooms}
        roomVariants={roomVariant}
        employees={employees}
        discounts={discounts}
        employeeRole={employeeRole}
        setSelectedDate={setSelectedDate}
        setSelectedEmployee={setSelectedEmployee}
        setSelectedProduct={setSelectedRoom}
        setSelectedVariant={setSelectedVariant}
        setSelectedDiscount={setSelectedDiscount}
      />
      {renderBody()}
    </>
  );
};

export default ABookingHistoryByRoom;
