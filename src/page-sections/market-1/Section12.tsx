import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import { H4, SemiSpan } from "@component/Typography";
// API FUNCTIONS

export default async function Section12() {
  const serviceList = [
    {
      id: "5f9bd366-9583-4e6d-9b11-abe74b9c5d96",
      icon: "truck",
      title: "Доставка по всій Україні",
      description: null,
    },
    {
      id: "121cffea-6972-41f8-8094-98dca22d17bb",
      icon: "credit",
      title: "Безпечна онлайн-оплата",
      description: null,
    },
    {
      id: "5b94f5d8-71ec-40a6-b5b8-401286deba24",
      icon: "shield",
      title: "Гарантія якості та повернення",
      description: null,
    },
    {
      id: "8c4bb18f-d914-4269-9c7c-3c6728ba33e9",
      icon: "phone",
      title: "Робочі години (9:00 – 20:00)",
      description: null,
    },
  ];

  return (
    <Container mb="70px">
      <Grid container spacing={6}>
        {serviceList.map((item) => (
          <Grid item lg={3} md={6} xs={12} key={item.id}>
            <FlexBox
              p="3rem"
              as={Card}
              hoverEffect
              height="100%"
              borderRadius={8}
              boxShadow="border"
              alignItems="center"
              flexDirection="column"
            >
              <FlexBox
                size="64px"
                bg="gray.200"
                alignItems="center"
                borderRadius="300px"
                justifyContent="center"
              >
                <Icon color="secondary" size="1.75rem">
                  {item.icon}
                </Icon>
              </FlexBox>

              <H4 mt="20px" mb="10px" textAlign="center">
                {item.title}
              </H4>

              <SemiSpan textAlign="center">{item.description}</SemiSpan>
            </FlexBox>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
