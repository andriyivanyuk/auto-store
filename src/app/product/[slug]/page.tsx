import { Fragment } from "react";
import { cookies } from "next/headers";
import ProductView from "@component/products/ProductView";
import ProductIntro from "@component/products/ProductIntro";
import { fetchProductById } from "services/apiService";

interface Props {
  params: { slug: string };
}

export const dynamicParams = true;

export default async function ProductDetails(props: Props) {
  const { params } = props;

  const { slug } = await params;

  const cookieStore = await cookies();
  const storeId = cookieStore.get("storeId")?.value;

  const [product] = await Promise.all([fetchProductById(slug, storeId)]);

  return (
    <Fragment>
      <ProductIntro
        id={product.product_id}
        price={product.price}
        title={product.title}
        images={product.images}
      />
      <ProductView
        description={product.description}
        attributes={product.attributes}
      />
    </Fragment>
  );
}
