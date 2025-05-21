import Box from "@component/Box";
import ProductList from "../../ProductList";

type Props = {
  params: {
    type: string;
    slug: string;
  };
};

const sortOptions = [
  { label: "Relevance", value: "Relevance" },
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" },
];

export default function ProductListDynamicPage({ params }: Props) {
  const { type, slug } = params;

  const filteredProducts = [];

  return (
    <Box pt="20px">
      <ProductList sortOptions={sortOptions} products={filteredProducts} />
    </Box>
  );
}
