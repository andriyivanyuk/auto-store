"use client";

import { useEffect, useState } from "react";
import Scrollbar from "@component/Scrollbar";
import Typography from "@component/Typography";
import { fetchProductTypes } from "services/apiService";

interface Props {
  onSelect: (productTypeId: number) => void;
  selectedId: number | null;
}

export default function CategorySidebar({ onSelect, selectedId }: Props) {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const types = await fetchProductTypes();
      setCategories(types);
    };
    loadCategories();
  }, []);

  return (
    <Scrollbar sx={{ overflowX: "auto" }}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          minWidth: "max-content",
          padding: "1rem",
        }}
      >
        {categories.map((item) => (
          <div
            key={item.product_type_id}
            onClick={() => onSelect(item.product_type_id)}
            style={{
              cursor: "pointer",
              borderBottom:
                selectedId === item.product_type_id
                  ? "2px solid #0F3460"
                  : "2px solid transparent",
              paddingBottom: "6px",
              textAlign: "center",
              minWidth: 80,
              flexShrink: 0,
            }}
          >
            <img
              src={item.icon_path}
              alt={item.product_type}
              width={32}
              height={32}
              style={{ marginBottom: 4 }}
            />
            <Typography fontSize="11px">{item.product_type}</Typography>
          </div>
        ))}
      </div>
    </Scrollbar>
  );
}
