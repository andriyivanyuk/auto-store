import Link from "next/link";

import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import AppStore from "@component/AppStore";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";

// STYLED COMPONENTS
import { StyledLink } from "./styles";

// CUSTOM DATA
import { iconList } from "./data";

export default function Footer1() {
  return (
    <footer>
      <Box bg="#0F3460">
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Link href="/">
                  <Image alt="logo" mb="1rem" src="/assets/images/logo.svg" />
                </Link>

                <Paragraph mb="1.25rem" color="gray.500" maxWidth="320px">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Auctor libero id et, in gravida. Sit diam duis mauris nulla
                  cursus. Erat et lectus vel ut sollicitudin elit at amet.
                </Paragraph>
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize={20}
                  fontWeight="600"
                >
                  Контакти
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  70 Washington Square South, New York, NY 10012, United States
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  Email: uilib.help@gmail.com
                </Typography>

                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  Phone: +1 1123 456 780
                </Typography>

                <FlexBox className="flex" mx="-5px">
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      key={item.iconName}
                      rel="noreferrer noopenner"
                    >
                      <Box
                        m="5px"
                        p="10px"
                        size="small"
                        borderRadius="50%"
                        bg="rgba(0,0,0,0.2)"
                      >
                        <Icon size="12px" defaultColor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      {/* Footer bottom center text */}
      <Box bg="#0F3460" py="1rem" textAlign="center">
        <Link href="/" passHref>
          <Typography
            fontSize="14px"
            color="gray.500"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            Розроблено Digital Engineers
          </Typography>
        </Link>
      </Box>
    </footer>
  );
}
