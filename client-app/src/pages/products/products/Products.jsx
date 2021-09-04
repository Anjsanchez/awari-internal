import "./css/ProductForm.css";
import { useSnackbar } from "notistack";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import { useMountedState } from "react-use";
import ProductDisplay from "./ProductDisplay";
import { Card, Grid } from "@material-ui/core";
import SpinLoader from "./../../../common/Spin";
import React, { useState, useEffect } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import ProductHeaderTabs from "./ProductHeaderTabs";
import MSearchBar from "../../../common/form/MSearchBar";
import FormHeader from "../../../common/form/FormHeader";
import MPagination from "../../../common/form/MPagination";
import { store } from "../../../utils/store/configureStore";
import { writeToken } from "../../../utils/store/pages/users";
import { getProducts } from "./../../../utils/services/pages/products/ProductService";

const Products = () => {
  const isMounted = useMountedState();
  const [productPerPage] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
  const [tabValue, setTabValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  // Get current posts
  const indexOfLastData = currentPage * productPerPage;
  const indexOfFirstData = indexOfLastData - productPerPage;
  const restrictedData = filteredProducts.slice(
    indexOfFirstData,
    indexOfLastData
  );

  const handleSearch = (e, value) =>
    value === null ? setSearchProduct("") : setSearchProduct(value.longName);

  const handleSelectTabs = (event, newValue) => setTabValue(newValue);

  const handleDelete = () => {};

  const paginate = (pageNumber, page) => setCurrentPage(page);

  const handleEditView = () => setShowForm(true);

  const handleAddView = () => {
    setSelectedProduct({});
    setShowForm(true);
  };

  const handleView = (room) => {
    setShowForm(false);
    setSelectedProduct(room);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedProduct({});
  };

  const handleSuccessAddForm = (obj) => {
    handleCancelForm();

    setFilteredProducts((prevState) => {
      return [...prevState, obj];
    });

    setProducts((prevState) => {
      return [...prevState, obj];
    });
  };

  const handleSuccessEditForm = (obj) => {
    handleCancelForm();
    const roomsx = [...filteredProducts];
    const index = roomsx.findIndex((x) => x._id === obj._id);

    roomsx[index] = { ...roomsx[index] };
    roomsx[index].shortName = obj.shortName;
    roomsx[index].longName = obj.longName;
    roomsx[index].numberOfServing = obj.numberOfServing;
    roomsx[index].sellingPrice = obj.sellingPrice;
    roomsx[index].description = obj.description;
    roomsx[index].productCategory = obj.productCategory;
    roomsx[index].productType = obj.productType;
    roomsx[index].isActivityType = obj.isActivityType;
    roomsx[index].isActive = obj.isActive;
    roomsx[index].imageFile = obj.imageFile;
    roomsx[index].imageSrc = obj.imageSrc;
    roomsx[index].imageName = obj.imageName;

    setFilteredProducts(roomsx);
    setProducts(roomsx);
  };

  useEffect(() => {
    paginate(null, 1);

    if (tabValue === 0) return setFilteredProducts(products);

    const datas = products.filter((c) => c.productCategory._id === tabValue);

    setFilteredProducts(datas);
  }, [tabValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await getProducts();
        const { token, listRecords } = data;

        const sortedProducts = listRecords.sort((a, b) =>
          a.longName.localeCompare(b.longName)
        );

        store.dispatch(writeToken({ token }));

        setTimeout(() => {
          if (!isMounted()) return;

          setProducts(sortedProducts);
          setFilteredProducts(sortedProducts);
          setInitialLoadForm(true);
        }, 500);
        //
      } catch (error) {
        enqueueSnackbar("An error occured while calling the server.", {
          variant: "error",
        });
        return () => {
          setProducts([]);
          setFilteredProducts([]);
        };
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchProduct === "") setTabValue(0);
    paginate(null, 1);

    products
      .filter((val) => {
        if (searchProduct === "") return val;
        if (val.longName.toLowerCase().includes(searchProduct.toLowerCase()))
          return val;
        return "";
      })
      .map((val, key) => {
        if (searchProduct === "") return setFilteredProducts(products);
        return setFilteredProducts([val]);
      });
  }, [searchProduct]); // eslint-disable-line react-hooks/exhaustive-deps

  const RenderDisplay = () => {
    if (showForm)
      return (
        <ProductForm
          data={selectedProduct}
          onCancel={handleCancelForm}
          onSuccessEdit={handleSuccessEditForm}
          onSuccessAdd={handleSuccessAddForm}
        />
      );

    if (!selectedProduct.hasOwnProperty("_id")) return null;

    return (
      <ProductDisplay
        onCancel={handleCancelForm}
        onEdit={handleEditView}
        data={selectedProduct}
      />
    );
  };

  const renderLoading = () => {
    if (!initialLoadForm) return <SpinLoader />;

    return (
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <div
            style={{
              background: "#fff",
              paddingBottom: "15px",
            }}
          >
            <ProductHeaderTabs onSelect={handleSelectTabs} value={tabValue} />
            <Card elevation={3}>
              <MSearchBar
                onAdd={handleAddView}
                onSearch={handleSearch}
                data={filteredProducts}
                searchField="longName"
              />
              <ProductList
                data={restrictedData}
                onView={handleView}
                onDelete={handleDelete}
                onAdd={handleAddView}
              />
              <div style={{ marginTop: "15px" }}>
                <MPagination
                  postsPerPage={productPerPage}
                  totalPosts={filteredProducts.length}
                  paginate={paginate}
                  page={currentPage}
                />
              </div>
            </Card>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <RenderDisplay />
        </Grid>
      </Grid>
    );
  };

  return (
    <div className="container__wrapper">
      <FormHeader
        header="Products"
        second="Product Management"
        third="Products"
        navigate="/"
        SecondIcon={RiShoppingBag2Fill}
        isVisibleBtn={false}
      />

      {renderLoading()}
    </div>
  );
};

export default Products;
