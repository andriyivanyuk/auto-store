"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2";
import CategoryMenuItem from "./CategoryMenuItem";
import { StyledCategoryDropdown } from "./styles";
import { fetchProductTypes } from "services/apiService";

type CategoryDropdownProps = {
  open: boolean;
  position?: "absolute" | "relative";
};

const megaMenu = { MegaMenu1, MegaMenu2 };

export default function CategoryDropdown({
  open,
  position = "absolute",
}: CategoryDropdownProps) {
  const [productTypes, setProductTypes] = useState<any[]>([]);

  useEffect(() => {
    const loadProductTypes = async () => {
      try {
        const data = await fetchProductTypes();
        setProductTypes(data);
      } catch (err) {
        console.error("Не вдалося завантажити типи товарів:", err);
      }
    };

    loadProductTypes();
  }, []);

  return (
    <StyledCategoryDropdown open={open} position={position}>
      {productTypes.map((item) => (
        <CategoryMenuItem
          key={item.product_type_id}
          href={`/product/product-list/type/${item.product_type_id}`}
          title={item.product_type}
          caret={false}
          imageSrc={item.icon_path}
        >
          <MegaMenu1 data={{}} />
        </CategoryMenuItem>
      ))}
    </StyledCategoryDropdown>
  );
}
