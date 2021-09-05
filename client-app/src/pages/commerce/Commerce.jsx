import React, { useState, useEffect } from "react";
import "./css/Commerce.css";
import { Divider } from "antd";
import CommerceHeader from "./CommerceHeader";
import CommerceBody from "./CommerceBody";
import CommerceDrawer from "./CommerceDrawer";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import {
  getProducts,
  GetProductsWithCategory,
} from "./../../utils/services/pages/products/ProductService";
import { store } from "../../utils/store/configureStore";
import { writeToken } from "../../utils/store/pages/users";
import SpinLoader from "./../../common/Spin";

const Commerce = () => {
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);
  const [isFilterDrawerShow, setIsFilterDrawerShow] = useState(false);

  //Filters
  const [selectedTypes, setSelectedTypes] = React.useState([]);
  const [selectedPrice, setSelectedPrice] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState([]);

  const executeFilter = () => {
    const prodx = [...products];

    const filteredCat = prodx.filter((item) => {
      if (selectedCategory.length === 0)
        return !selectedCategory.includes(null);
      return selectedCategory.includes(item.productCategory.name);
    });

    const filteredTypes = filteredCat.filter((item) => {
      if (selectedTypes.length === 0) return !selectedTypes.includes(null);
      return selectedTypes.includes(item.productType.name);
    });

    const price = getPriceRange();
    const filteredPrice = filteredTypes.filter(
      (n) => price.from <= n.sellingPrice && price.to >= n.sellingPrice
    );

    setFilteredProducts(filteredPrice);
  };

  useEffect(() => {
    executeFilter();
  }, [selectedCategory, selectedTypes, selectedPrice]);

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await GetProductsWithCategory();
        const { token, products, types, categories } = data;

        const sorted = products.sort((a, b) =>
          a.longName.localeCompare(b.longName)
        );

        store.dispatch(writeToken(token));

        setTimeout(() => {
          if (!isMounted()) return;

          setTypes(types);
          setCategories(categories);
          setProducts(sorted);
          setFilteredProducts(sorted);
          setInitialLoadForm(true);
        }, 500);
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

  const getPriceRange = () => {
    if (selectedPrice === 0) return { from: 0, to: 90000 };
    if (selectedPrice === 1) return { from: 0, to: 100 };
    if (selectedPrice === 3) return { from: 100, to: 300 };
    if (selectedPrice === 5) return { from: 300, to: 500 };
    if (selectedPrice === 7) return { from: 500, to: 700 };
    if (selectedPrice === 9) return { from: 700, to: 900 };
    if (selectedPrice === 10) return { from: 1000, to: 90000 };
    return { from: 0, to: 90000 };
  };

  const onFilterShow = () => setIsFilterDrawerShow(!isFilterDrawerShow);

  return (
    <div className="container__wrapper commerce">
      <CommerceHeader onFilterShow={onFilterShow} />
      <CommerceDrawer
        types={types}
        categories={categories}
        onFilterShow={onFilterShow}
        setSelectedPrice={setSelectedPrice}
        setSelectedTypes={setSelectedTypes}
        isFilterDrawerShow={isFilterDrawerShow}
        setSelectedCategory={setSelectedCategory}
      />
      <Divider className="com-divider" />

      {!initialLoadForm ? (
        <SpinLoader />
      ) : (
        <CommerceBody products={filteredProducts} />
      )}
    </div>
  );
};

export default Commerce;
