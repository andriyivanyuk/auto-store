import { Fragment } from "react";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import Pagination from "@component/pagination";
import { SemiSpan } from "@component/Typography";
import { ProductCard9 } from "@component/product-cards";
import { ProductListResponse } from "interfaces/productListResponse";

interface Props {
  products: ProductListResponse[];
}

export default function ProductListView({ products }: Props) {
  return (
    <Fragment>
      {products.map((item) => (
        <Box key={item.product_id} mb="1.25rem">
          <ProductCard9 product={item} />
        </Box>
      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Показано 1–{products.length} із 1.3k Products</SemiSpan>
        <Pagination pageCount={10} />
      </FlexBox>
    </Fragment>
  );
}
