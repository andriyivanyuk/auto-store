import Box from "@component/Box";
import Container from "@component/Container";
import { Carousel } from "@component/carousel";
import { CarouselCard1 } from "@component/carousel-cards";
import { fetchFeaturedProducts } from "services/apiService";
import { cookies } from "next/headers";

export default async function Section1() {
  const cookieStore = await cookies();
  const storeId = cookieStore.get("storeId")?.value;

  if (!storeId) return null;

  const featuredProducts = await fetchFeaturedProducts(storeId);

  const uniqueProducts = Array.from(
    new Map(featuredProducts.map((p) => [p.product_id, p])).values()
  );

  const carouselData = uniqueProducts.map((product) => ({
    title: product.title,
    imgUrl: product.images?.[0] || "/assets/images/placeholder.png",
    description: `Ціна: ${product.price} грн`,
    buttonText: "Переглянути",
    buttonLik: `/product/${product.product_id}`,
  }));

  if (carouselData.length === 1) {
    carouselData.push({
      ...carouselData[0],
      buttonLik: `${carouselData[0].buttonLik}?clone=1`, // унікальний URL
    });
  }

  return (
    <Box bg="gray.white" mb="3.75rem">
      <Container pb="3rem">
        <Carousel dots autoplay arrows={false} slidesToShow={1}>
          {carouselData.map((item, index) => (
            <CarouselCard1
              key={index}
              title={item.title}
              image={item.imgUrl}
              buttonText={item.buttonText}
              description={item.description}
              href={item.buttonLik}
            />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
