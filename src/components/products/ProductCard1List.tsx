"use client";

import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import { ProductCard1 } from "@component/product-cards";
import { SemiSpan } from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import { ProductListResponse } from "interfaces/productListResponse";

interface Props {
  products: ProductListResponse[];
}

export default function ProductGridView({ products }: Props) {
  const width = useWindowSize();
  const isTablet = width < 1025;

  return (
    <div>
      <Grid container spacing={6}>
        {products.map((item) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={item.product_id}>
            <ProductCard1
              product_id={item.product_id}
              title={item.title}
              price={Number(item.price)}
              images={item.images}
              imgUrl={item.images?.[0]}
            />
          </Grid>
        ))}
      </Grid>

      <FlexBox
        mt="2rem"
        flexWrap="wrap"
        flexDirection={isTablet ? "column" : "row"}
        alignItems="center"
        justifyContent="space-between"
      >
        <SemiSpan>
          Показано 1–{products.length} із {products.length} Продуктів
        </SemiSpan>
        <Pagination pageCount={1} />
      </FlexBox>
    </div>
  );
}
