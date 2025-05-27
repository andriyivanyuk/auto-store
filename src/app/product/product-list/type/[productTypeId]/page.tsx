import Box from "@component/Box";
import ProductList from "../../ProductList";
import { fetchProductsByCategory } from "services/apiService";
import { cookies } from "next/headers";

type Props = {
  params: {
    productTypeId: string;
  };
};

const sortOptions = [
  { label: "Relevance", value: "Relevance" },
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" },
];

export default async function ProductListDynamicPage({ params }: Props) {
  const cookieStore = await cookies();
  const storeId = cookieStore.get("storeId")?.value;

  const products = await fetchProductsByCategory(params.productTypeId, storeId);

  return (
    <Box pt="20px">
      <ProductList sortOptions={sortOptions} products={products} />
    </Box>
  );
}
