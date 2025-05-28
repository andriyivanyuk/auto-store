import Box from "@component/Box";
import ProductList from "../../ProductList";
import { fetchProductsByCategory } from "services/apiService";
import { cookies } from "next/headers";

export const dynamicParams = true;

interface Props {
  params: { productTypeId: string };
}

const sortOptions = [
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" },
];

export default async function ProductListDynamicPage(props: Props) {
  const { params } = props;
  const { productTypeId } = await params;

  const cookieStore = await cookies();
  const storeId = cookieStore.get("storeId")?.value;

  const products = await fetchProductsByCategory(productTypeId, storeId);

  return (
    <Box pt="20px">
      <ProductList sortOptions={sortOptions} products={products} />
    </Box>
  );
}
