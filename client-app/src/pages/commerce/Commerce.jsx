import "./css/Commerce.css";
import { Divider } from "antd";
import CommerceBody from "./CommerceBody";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import SpinLoader from "./../../common/Spin";
import CommerceDrawer from "./CommerceDrawer";
import CommerceHeader from "./CommerceHeader";
import React, { useState, useEffect } from "react";
import { store } from "../../utils/store/configureStore";
import { writeToken } from "../../utils/store/pages/users";
import { GetProductsWithCategory } from "./../../utils/services/pages/products/ProductService";

const Commerce = () => {
  const isMounted = useMountedState();
  const [types, setTypes] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);
  const [isFilterDrawerShow, setIsFilterDrawerShow] = useState(false);

  //Filters
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleSearch = (e, value) =>
    value === null ? onFilterSearch(null) : onFilterSearch(value._id);

  const onFilterSearch = (
    search,
    isFromSearchBar = true,
    isClearItems = false
  ) => {
    //..
    if (isClearItems) return setFilteredProducts([]);

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

    if (search === null && isFromSearchBar) {
      if (selectedCategory.length === 0 && selectedTypes.length === 0)
        return setFilteredProducts([]);

      return setFilteredProducts(filteredPrice);
    }

    filteredPrice
      .filter((val) => {
        if (search === null) return val;
        if (val._id === search) return val;
        return "";
      })
      .map((val, key) => {
        if (search === null) return setFilteredProducts(filteredPrice);
        return setFilteredProducts([val]);
      });
  };

  useEffect(() => {
    //..
    async function fetchData() {
      try {
        const { data } = await GetProductsWithCategory();
        const { token, products, types, categories } = data;

        const sorted = products.sort((a, b) =>
          a.longName.localeCompare(b.longName)
        );

        const sortedTypes = types.sort((a, b) => a.name.localeCompare(b.name));

        store.dispatch(writeToken(token));

        setTimeout(() => {
          if (!isMounted()) return;

          setTypes(sortedTypes);
          setCategories(categories);
          setProducts(sorted);
          // setFilteredProducts(sorted);
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
    return { from: 0, to: 1000000 };
  };

  const onFilterShow = () => setIsFilterDrawerShow(!isFilterDrawerShow);
  const filter = filteredProducts.length === 0 ? products : filteredProducts;

  return (
    <div className="container__wrapper commerce">
      <CommerceHeader
        onSearch={handleSearch}
        onFilterShow={onFilterShow}
        products={filter}
        onFilterSearch={onFilterSearch}
      />
      <CommerceDrawer
        types={types}
        categories={categories}
        onFilterShow={onFilterShow}
        setSelectedPrice={setSelectedPrice}
        setSelectedTypes={setSelectedTypes}
        setSelectedCategory={setSelectedCategory}
        isFilterDrawerShow={isFilterDrawerShow}
        onFilterSearch={onFilterSearch}
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
