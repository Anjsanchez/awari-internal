import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import { Card, Grid } from "@material-ui/core";
import SpinLoader from "./../../../common/Spin";
import MDisplay from "./../../../common/MDisplay";
import React, { useState, useEffect } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import ProductClassList from "./ProductCategoryList";
import resortImg from "../../../assets/room/skybar.jpg";
import MSearchBar from "../../../common/form/MSearchBar";
import FormHeader from "../../../common/form/FormHeader";
import MPagination from "../../../common/form/MPagination";
import ProductClassificationForm from "./ProductClassificationForm";
import { getProdClassification } from "./../../../utils/services/pages/products/ProductClassifications";

const ProductClassification = () => {
  const isMounted = useMountedState();
  const [categoryPerPage] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [prodClass, setProdClass] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);
  const [searchProdClass, setSearchProdClass] = useState("");
  const [selectedProdClass, setSelectedProdClass] = useState({});
  const [filteredProdClass, setFilteredProdClass] = useState([]);

  // Get current posts
  const indexOfLastClass = currentPage * categoryPerPage;
  const indexOfFirstClass = indexOfLastClass - categoryPerPage;
  const restrictedCategory = filteredProdClass.slice(
    indexOfFirstClass,
    indexOfLastClass
  );

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await getProdClassification();

        const sortedCategory = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        if (!isMounted()) return;

        setProdClass(sortedCategory);
        setFilteredProdClass(sortedCategory);
        setInitialLoadForm(true);
        //
      } catch (error) {
        enqueueSnackbar("0044: An error occured.", {
          variant: "error",
        });
        return () => {
          setProdClass([]);
          setFilteredProdClass([]);
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    paginate(null, 1);
    prodClass
      .filter((val) => {
        if (searchProdClass === "") return val;
        if (val.name.toLowerCase().includes(searchProdClass.toLowerCase()))
          return val;
        return "";
      })
      .map((val, key) => {
        if (searchProdClass === "") return setFilteredProdClass(prodClass);
        return setFilteredProdClass([val]);
      });
  }, [searchProdClass]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = () => {};

  const handleView = (category) => {
    setShowForm(false);
    setSelectedProdClass(category);
  };

  const handleEditView = () => setShowForm(true);

  const handleSuccessAddForm = (obj) => {
    handleCancelForm();

    setFilteredProdClass((prevState) => {
      return [...prevState, obj];
    });

    setProdClass((prevState) => {
      return [...prevState, obj];
    });
  };

  const handleSearch = (e, value) =>
    value === null ? setSearchProdClass("") : setSearchProdClass(value.name);

  const paginate = (pageNumber, page) => setCurrentPage(page);

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedProdClass({});
  };

  const handleSuccessEditForm = (obj) => {
    handleCancelForm();
    const categoryx = [...filteredProdClass];
    const index = categoryx.findIndex((x) => x._id === obj.id);

    categoryx[index] = { ...categoryx[index] };
    categoryx[index].name = obj.name;
    categoryx[index].isActive = obj.isActive;
    categoryx[index].printerName = obj.printerName;

    setFilteredProdClass(categoryx);
    setProdClass(categoryx);
  };

  const handleAddView = () => {
    setSelectedProdClass({});
    setShowForm(true);
  };

  const RenderCategoryDisplay = () => {
    if (showForm)
      return (
        <ProductClassificationForm
          data={selectedProdClass}
          onCancel={handleCancelForm}
          onSuccessEdit={handleSuccessEditForm}
          onSuccessAdd={handleSuccessAddForm}
        />
      );

    if (!selectedProdClass.hasOwnProperty("_id")) return null;

    return (
      <MDisplay
        data={selectedProdClass}
        onCancel={handleCancelForm}
        onEdit={handleEditView}
        label="product category"
        image={resortImg}
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
              data={prodClass}
              searchField="name"
              btnName="Add Classification"
            />
            <div style={{ background: "#fff", paddingBottom: "15px" }}>
              <ProductClassList
                data={restrictedCategory}
                onView={handleView}
                onDelete={handleDelete}
                onAdd={handleAddView}
              />
              <div style={{ marginTop: "15px" }}>
                <MPagination
                  postsPerPage={categoryPerPage}
                  totalPosts={filteredProdClass.length}
                  paginate={paginate}
                  page={currentPage}
                />
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <RenderCategoryDisplay />
        </Grid>
      </Grid>
    );
  };

  return (
    <div className="container__wrapper">
      <FormHeader
        header="Classifications"
        second="Product Management"
        third="Classifications"
        navigate="/"
        SecondIcon={RiShoppingBag2Fill}
        isVisibleBtn={false}
      />
      {renderLoading()}
    </div>
  );
};

export default ProductClassification;
