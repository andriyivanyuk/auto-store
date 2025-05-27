import { Fragment } from "react";
import { cookies } from "next/headers";
import ProductView from "@component/products/ProductView";
import ProductIntro from "@component/products/ProductIntro";
import { fetchProductById } from "services/apiService";
import api from "@utils/__api__/products";

interface Props {
  params: { slug: string };
}

export default async function ProductDetails({ params }: Props) {
  const { slug } = params;

  const cookieStore = await cookies();
  const storeId = cookieStore.get("storeId")?.value;

  const [product, shops, relatedProducts, frequentlyBought] = await Promise.all(
    [
      fetchProductById(slug, storeId),
      api.getAvailableShop(),
      api.getRelatedProducts(),
      api.getFrequentlyBought(),
    ]
  );

  return (
    <Fragment>
      <ProductIntro
        id={product.product_id}
        price={product.price}
        title={product.title}
        images={product.images}
      />

      <ProductView
        shops={shops}
        relatedProducts={relatedProducts}
        frequentlyBought={frequentlyBought}
      />
    </Fragment>
  );
}
