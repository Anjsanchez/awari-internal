export default function ProductFormValidate(v) {
  let errors = {};

  if (!v.shortName.trim())
    errors.shortName = "Product's short name is required";

  if (!v.longName.trim()) errors.longName = "Product's long name is required";

  if (v.numberOfServing === "" || v.numberOfServing === null)
    errors.numberOfServing = "Number of servings is required";

  if (v.sellingPrice === "" || v.sellingPrice === null)
    errors.sellingPrice = "Selling Price is required";

  if (!v.productCategoryId.trim())
    errors.productCategoryId = "Product Category is required";

  if (!v.productTypeId.trim())
    errors.productTypeId = "Product Type is required";

  if (v.imageFile === "" || v.imageFile === null) {
    if (v.imageName === "") errors.imageFile = "Image is required";
  }

  if (v.description === "" || v.description === null)
    errors.description = "Description is required";

  console.log("V", v);
  return errors;
}
