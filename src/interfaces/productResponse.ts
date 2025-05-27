export interface ProductResponse {
  product_code: string;
  product_id: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  category_id: number;
  created_by_user_id: number;
  product_type_id: number;
  status_id: number;
  created_at: string;
  updated_at: string;
  price_mode: "single" | "combo";
  is_featured: boolean;
  is_discounted: boolean;
  status_name: string;
  category_title: string;
  product_type_title: string;
  attributes: ProductAttribute[];
  images: ProductImage[];
  parameters: any | null;
}

export interface ProductAttribute {
  key: string;
  values: string[];
}

export interface ProductImage {
  image_id: number;
  image_path: string;
  is_primary: boolean;
}
