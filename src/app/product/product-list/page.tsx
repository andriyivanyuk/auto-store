import Box from "@component/Box";
import ProductList from "./ProductList";

export default function ProductListResult() {
  return (
    <Box pt="20px">
      <ProductList sortOptions={sortOptions} products={[]} />
    </Box>
  );
}

const sortOptions = [
  { label: "Relevance", value: "Relevance" },
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" },
];
