"use client";

import { useEffect, useState } from "react";
import Box from "@component/Box";
import CategorySidebar from "../../../components/CategorySidebar";
import { fetchProductsByCategory } from "services/apiService";
import ProductList from "app/product/product-list/ProductList";
import useCart from "@hook/useCart";
import { useRouter } from "next/navigation";
import Button from "@component/buttons/Button";
import FlexBox from "@component/FlexBox";

export default function MobileViewPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [products, setProducts] = useState([]);
  const [storeId, setStoreId] = useState<string | null>(null);
  const { state } = useCart();
  const router = useRouter();

  const sortOptions = [
    { label: "Від низької до високої", value: "Від низької до високої" },
    { label: "Від високої до низької", value: "Від високої до низької" },
  ];

  useEffect(() => {
    const cookieStore = document.cookie
      .split("; ")
      .find((row) => row.startsWith("storeId="))
      ?.split("=")[1];
    if (cookieStore) {
      setStoreId(cookieStore);
    }
  }, []);

  useEffect(() => {
    if (!selectedId || !storeId) return;

    const loadProducts = async () => {
      const result = await fetchProductsByCategory(
        selectedId.toString(),
        storeId
      );
      setProducts(result);
    };

    loadProducts();
  }, [selectedId, storeId]);

  return (
    <Box>
      {/* Горизонтальна навігація */}
      <CategorySidebar
        selectedId={selectedId}
        onSelect={(id) => setSelectedId(id)}
      />

      {/* Контент товарів */}
      <Box px="1.5rem">
        {selectedId ? (
          <ProductList sortOptions={sortOptions} products={products} />
        ) : (
          <p style={{ padding: "1rem", textAlign: "center" }}>
            Оберіть категорію
          </p>
        )}
      </Box>

      {/* Кнопка оформлення замовлення */}
      {/* Кнопка оформлення замовлення */}
      {state.cart.length > 0 && (
        <Box display="flex" justifyContent="center" px="1.5rem" mt="2rem">
          <Button
            color="primary"
            variant="contained"
            borderRadius={8}
            onClick={() => router.push("/checkout")}
          >
            Оформити замовлення
          </Button>
        </Box>
      )}
    </Box>
  );
}
