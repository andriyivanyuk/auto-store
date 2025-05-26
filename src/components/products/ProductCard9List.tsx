import { Fragment } from "react";
import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import { SemiSpan } from "@component/Typography";
import { ProductCard9 } from "@component/product-cards";
import Product from "@models/product.model";
import { ProductListResponse } from "interfaces/productListResponse";

// ==========================================================
interface Props {
  products: ProductListResponse[];
}
// ==========================================================

export default function ProductListView({ products }: Props) {
  return (
    <Fragment>
      {products.map((item) => (
        <ProductCard9 key={item.product_id} product={item} mb="1.25rem" />
      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing 1–{products.length} of 1.3k Products</SemiSpan>
        <Pagination pageCount={10} />
      </FlexBox>
    </Fragment>
  );
}
