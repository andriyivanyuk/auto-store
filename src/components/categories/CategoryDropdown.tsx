"use client";

import { useEffect, useState } from "react";
import { fetchProductCategoriesWithSubtypes } from "services/apiService";
import { StyledCategoryDropdown } from "./styles";
import CategoryMenuItem from "./CategoryMenuItem";
import MegaMenu1 from "./mega-menu/MegaMenu1";

type CategoryDropdownProps = {
  open: boolean;
  position?: "absolute" | "relative";
};

export default function CategoryDropdown({
  open,
  position = "absolute",
}: CategoryDropdownProps) {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchProductCategoriesWithSubtypes();
        setCategories(data);
      } catch (err) {
        console.error("Не вдалося завантажити категорії:", err);
      }
    };

    loadCategories();
  }, []);

  return (
    <StyledCategoryDropdown open={open} position={position}>
      {categories.map((category) => (
        <CategoryMenuItem
          key={category.category_id}
          href={
            category.has_subtypes
              ? undefined
              : `/product/product-list/category/${category.category_id}`
          }
          title={category.title}
          caret={category.has_subtypes}
          imageSrc={category.icon_path}
        >
          {category.has_subtypes && (
            <MegaMenu1
              data={{
                categories: category.product_types?.map((pt: any) => ({
                  title: pt.title,
                  href: `/product/product-list/type/${pt.product_type_id}`,
                  icon: pt.icon_path,
                })),
              }}
            />
          )}
        </CategoryMenuItem>
      ))}
    </StyledCategoryDropdown>
  );
}
