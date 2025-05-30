import axios from "axios";
import { FeaturedProductListResponse } from "interfaces/featuredProductListResponse";
import { FetchClientProductsParams } from "interfaces/fetchClientProductsParams";

const BASE_URL = "https://admin-server-q7b6.onrender.com/api/client";

const api = axios.create({
  baseURL: BASE_URL,
});

const getStoreIdFromCookie = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )storeId=([^;]+)"));
  return match ? match[2] : null;
};

export const fetchProductTypes = async () => {
  try {
    const storeId = getStoreIdFromCookie();
    if (!storeId) {
      throw new Error("Store ID not found in cookies");
    }

    const response = await api.get("/product/productTypes", {
      headers: {
        "x-store-id": storeId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні типів товарів:", error);
    throw error;
  }
};

export const fetchProductsByCategory = async (
  productTypeId: string,
  storeId: string
) => {
  try {
    if (!storeId) {
      throw new Error("Store ID not found in cookies");
    }

    const response = await api.get(`/productsByType/${productTypeId}`, {
      headers: {
        "x-store-id": storeId,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні продуктів по категорії:", error);
    throw error;
  }
};

export const fetchProductById = async (productId: string, storeId: string) => {
  try {
    if (!storeId) {
      throw new Error("Store ID not found in cookies");
    }

    const response = await api.get(`/product/${productId}`, {
      headers: {
        "x-store-id": storeId,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні деталей продукту:", error);
    throw error;
  }
};

export const fetchFeaturedProducts = async (
  storeId: string
): Promise<FeaturedProductListResponse[]> => {
  try {
    if (!storeId) throw new Error("Store ID not found");

    const response = await api.get("/products/featured", {
      headers: {
        "x-store-id": storeId,
      },
    });

    return response.data.products;
  } catch (error) {
    console.error("Помилка при отриманні топових продуктів:", error);
    throw error;
  }
};

export const fetchNovaPoshtaCities = async (query: string, storeId: string) => {
  const response = await api.get("/cities", {
    headers: {
      "x-store-id": storeId,
    },
    params: {
      q: query,
    },
  });
  return response.data;
};

export const fetchNovaPoshtaBranches = async (
  cityRef: string,
  storeId: string
) => {
  const response = await api.get("/getBranches", {
    headers: {
      "x-store-id": storeId,
    },
    params: {
      cityRef,
    },
  });
  return response.data;
};

export const fetchClientProducts = async ({
  page = 1,
  limit = 12,
  productTypeId = null,
  search = "",
}: FetchClientProductsParams) => {
  try {
    const storeId = getStoreIdFromCookie();
    if (!storeId) throw new Error("Store ID not found in cookies");

    const params: any = { page, limit };
    if (productTypeId) params.product_type = productTypeId;
    if (search) params.search = search;

    const response = await api.get("/products", {
      headers: { "x-store-id": storeId },
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні продуктів:", error);
    throw error;
  }
};

export const submitContactMessage = async (payload) => {
  const storeId = getStoreIdFromCookie();
  if (!storeId) throw new Error("Store ID not found in cookies");

  const response = await api.post("/contact", payload, {
    headers: {
      "x-store-id": storeId,
    },
  });

  return response.data;
};

export const submitOrder = async (payload) => {
  const storeId = getStoreIdFromCookie();
  if (!storeId) throw new Error("Store ID not found in cookies");

  const response = await api.post("/createOrder", payload, {
    headers: {
      "x-store-id": storeId,
    },
  });

  return response.data;
};
