import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Pagination from "@component/pagination";
import { ProductCard1 } from "@component/product-cards";
import { SemiSpan } from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import Product from "@models/product.model";

// ==========================================================
interface Props {
  products: Product[];
}
// ==========================================================

export default function ProductGridView({ products }: Props) {
  const width = useWindowSize();
  const isTablet = width < 1025;

  return (
    <div>
      <Grid container spacing={6}>
        {products.map((item) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              price={item.price}
              title={item.title}
              off={item.discount}
              images={item.images}
              imgUrl={item.thumbnail}
              rating={item.rating || 4}
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
        <SemiSpan>Showing 1–{products.length} of 1.3k Products</SemiSpan>
        <Pagination pageCount={10} />
      </FlexBox>
    </div>
  );
}
