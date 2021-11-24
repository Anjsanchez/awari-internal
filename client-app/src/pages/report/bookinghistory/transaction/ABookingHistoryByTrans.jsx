import moment from "moment";
import "./../css/BookingHistory.css";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import BhByTransbody from "./BhByTransbody";
import BhByTransDrawer from "./BhByTransDrawer";
import React, { useState, useEffect } from "react";
import BookingHistoryHeader from "./../../Common/BookingHistoryHeader";
import { getRoles } from "./../../../../utils/services/pages/RoleService";
import { getEmployees } from "./../../../../utils/services/pages/EmployeeService";
import { getProducts } from "./../../../../utils/services/pages/products/ProductService";
import { getTransLines } from "./../../../../utils/services/pages/trans/TransLineService";
import { getDiscounts } from "./../../../../utils/services/pages/functionality/DiscountService";
import { getProdCategory } from "./../../../../utils/services/pages/products/ProductCategoryService";
import SpinLoader from "../../../../common/Spin";

const ABookingHistoryByTrans = () => {
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [transLines, setTransLines] = useState([]);
  const [employeeRole, setEmployeeRoles] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);
  const [filteredTransLines, setFilteredTransLines] = useState([]);
  const [isFilterDrawerShow, setIsFilterDrawerShow] = useState(false);
  //Filters
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
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
        const { data } = await getTransLines();

        if (!isMounted()) return;

        setTransLines(data.listRecords);
        setInitialLoadForm(true);
      } catch (error) {
        enqueueSnackbar("0013: An error occured while calling the server.", {
          variant: "error",
        });
      }
    }

    async function GetProducts() {
      try {
        const { data } = await getProducts(true);
        const { data: variants } = await getProdCategory(true);
        const { listRecords } = data;
        const { listRecords: listVariants } = variants;

        const sorted = listRecords.sort((a, b) =>
          a.shortName.localeCompare(b.shortName)
        );

        const sortedvariant = listVariants.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        const productData = [];
        const variantsData = [];

        sorted.map((n) => {
          return productData.push({
            name: n.shortName,
            key: n._id,
            text: n.shortName,
            value: n.shortName,
            variant: n.productCategory.name,
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

        setProducts(productData);
        setProductVariants(variantsData);
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
        enqueueSnackbar("0025: An error occured while calling the server.", {
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

        setDiscounts(discData);
      } catch (error) {
        enqueueSnackbar("0011: An error occured while calling the server.", {
          variant: "error",
        });
      }
    }

    GetTransHeader();
    GetProducts();
    GetEmployees();
    fetchDiscounts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
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

    const filteredProducts = filteredEmployee.filter((item) => {
      if (selectedProduct.length === 0) return filteredEmployee;
      return selectedProduct.includes(item.product._id);
    });

    const filteredCategory = filteredProducts.filter((item) => {
      if (selectedCategory.length === 0) return filteredProducts;
      return selectedCategory.includes(item.product.productCategoryId);
    });

    const filteredDiscounts = filteredCategory
      .filter((n) => {
        if (selectedDiscount.length === 0) return filteredCategory;
        return n.discount !== null;
      })
      .filter((item) => {
        if (selectedDiscount.length === 0) return filteredCategory;
        return selectedDiscount.includes(item.discount._id);
      });

    setFilteredTransLines(filteredDiscounts);
    //..
  }, [
    selectedProduct,
    selectedEmployee,
    selectedCategory,
    selectedDiscount,
    selectedDate,
    transLines,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderBody = () => {
    if (!initialLoadForm) {
      return <SpinLoader />;
    }

    return <BhByTransbody filteredTrans={filteredTransLines} />;
  };

  return (
    <>
      <BookingHistoryHeader
        title="By Booking - Transaction"
        onFilterShow={onFilterShow}
      />
      <BhByTransDrawer
        onFilterShow={onFilterShow}
        isFilterDrawerShow={isFilterDrawerShow}
        products={products}
        productVariants={productVariants}
        employees={employees}
        discounts={discounts}
        employeeRole={employeeRole}
        setSelectedDate={setSelectedDate}
        setSelectedEmployee={setSelectedEmployee}
        setSelectedProduct={setSelectedProduct}
        setSelectedCategory={setSelectedCategory}
        setSelectedDiscount={setSelectedDiscount}
      />
      {renderBody()}
    </>
  );
};

export default ABookingHistoryByTrans;
