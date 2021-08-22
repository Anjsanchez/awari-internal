import { useSnackbar } from "notistack";
import { Card, Grid } from "@material-ui/core";
import DiscountList from "./DiscountList";
import DiscountForm from "./DiscountForm";
import { useMountedState } from "react-use";
import { RiBillFill } from "react-icons/ri";
import DiscountDisplay from "./DiscountDisplay";
import SpinLoader from "./../../../common/Spin";
import React, { useState, useEffect } from "react";
import MSearchBar from "../../../common/form/MSearchBar";
import FormHeader from "../../../common/form/FormHeader";
import MPagination from "../../../common/form/MPagination";
import { store } from "../../../utils/store/configureStore";
import { writeToken } from "../../../utils/store/pages/users";
import { getDiscounts } from "../../../utils/services/pages/functionality/DiscountService";

const Discounts = () => {
  const isMounted = useMountedState();
  const [discountPerPage] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
  const [discount, setDiscount] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDiscount, setSearchDiscount] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState({});
  const [filteredDiscount, setFilteredDiscount] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  // Get current posts
  const indexOfLastDiscount = currentPage * discountPerPage;
  const indexOfFirstDiscount = indexOfLastDiscount - discountPerPage;
  const restrictedDiscount = filteredDiscount.slice(
    indexOfFirstDiscount,
    indexOfLastDiscount
  );

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await getDiscounts();
        const { token, listRecords } = data;

        const sortedDiscount = listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (!isMounted()) return;

          setDiscount(sortedDiscount);
          setFilteredDiscount(sortedDiscount);
          setInitialLoadForm(true);
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setDiscount([]);
          setFilteredDiscount([]);
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    paginate(null, 1);
    discount
      .filter((val) => {
        if (searchDiscount === "") return val;
        if (val.name.toLowerCase().includes(searchDiscount.toLowerCase()))
          return val;
        return "";
      })
      .map((val, key) => {
        if (searchDiscount === "") return setFilteredDiscount(discount);
        return setFilteredDiscount([val]);
      });
  }, [searchDiscount]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = () => {};

  const handleView = (discount) => {
    setShowForm(false);
    setSelectedDiscount(discount);
  };

  const handleEditView = () => setShowForm(true);

  const handleSuccessAddForm = (obj) => {
    handleCancelForm();

    setFilteredDiscount((prevState) => {
      return [...prevState, obj];
    });

    setDiscount((prevState) => {
      return [...prevState, obj];
    });
  };

  const handleSearch = (e, value) =>
    value === null ? setSearchDiscount("") : setSearchDiscount(value.name);

  const paginate = (pageNumber, page) => setCurrentPage(page);

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedDiscount({});
  };

  const handleSuccessEditForm = (obj) => {
    handleCancelForm();
    const discountx = [...filteredDiscount];
    const index = discountx.findIndex((x) => x._id === obj.id);

    discountx[index] = { ...discountx[index] };
    discountx[index].name = obj.name;
    discountx[index].value = obj.value;
    discountx[index].isActive = obj.isActive;
    discountx[index].isByPercentage = obj.isByPercentage;
    discountx[index].isRequiredCustomer = obj.isRequiredCustomer;
    discountx[index].isRequiredId = obj.isRequiredId;
    discountx[index].isRequiredApproval = obj.isRequiredApproval;

    setFilteredDiscount(discountx);
    setDiscount(discountx);
  };

  const handleAddView = () => {
    setSelectedDiscount({});
    setShowForm(true);
  };

  const RenderDiscountDisplay = () => {
    if (showForm)
      return (
        <DiscountForm
          data={selectedDiscount}
          onCancel={handleCancelForm}
          onSuccessEdit={handleSuccessEditForm}
          onSuccessAdd={handleSuccessAddForm}
        />
      );
    if (!selectedDiscount.hasOwnProperty("_id")) return null;

    return (
      <DiscountDisplay
        data={selectedDiscount}
        onCancel={handleCancelForm}
        onEdit={handleEditView}
      />
    );
  };

  const renderLoading = () => {
    if (!initialLoadForm) return <SpinLoader />;

    return (
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <MSearchBar
              onAdd={handleAddView}
              onSearch={handleSearch}
              data={discount}
              searchField="name"
            />
            <div style={{ background: "#fff", paddingBottom: "15px" }}>
              <DiscountList
                data={restrictedDiscount}
                onView={handleView}
                onDelete={handleDelete}
                onAdd={handleAddView}
              />
              <div style={{ marginTop: "15px" }}>
                <MPagination
                  postsPerPage={discountPerPage}
                  totalPosts={filteredDiscount.length}
                  paginate={paginate}
                  page={currentPage}
                />
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <RenderDiscountDisplay />
        </Grid>
      </Grid>
    );
  };

  return (
    <div className="container__wrapper">
      <FormHeader
        header="Discounts"
        second="System Functionality"
        third="Discounts"
        navigate="/"
        SecondIcon={RiBillFill}
        isVisibleBtn={false}
      />

      {renderLoading()}
    </div>
  );
};

export default Discounts;
