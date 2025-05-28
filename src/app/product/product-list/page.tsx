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
  { label: "Від низької до високої", value: "Від низької до високої" },
  { label: "Від високої до низької", value: "Від високої до низької" },
];
