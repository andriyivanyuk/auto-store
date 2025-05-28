import Box from "@component/Box";
import Container from "@component/Container";
import { Carousel } from "@component/carousel";
import { CarouselCard1 } from "@component/carousel-cards";

export default async function Section1() {
  const carouselData = [
    {
      title: "50% Off For Your First Shopping",
      imgUrl: "assets/images/products/apple-watch-0.png",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convalliss.`,
      buttonText: "Shop Now",
      buttonLik: "#",
    },
    {
      title: "50% Off For Your First Shopping",
      imgUrl: "assets/images/products/apple-watch-0.png",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convalliss.`,
      buttonText: "Shop Now",
      buttonLik: "#",
    },
  ];

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
            />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
