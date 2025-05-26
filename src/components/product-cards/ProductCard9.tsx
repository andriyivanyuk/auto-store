"use client";

import Link from "next/link";
import styled from "styled-components";
import Grid from "@component/grid/Grid";
import Box from "@component/Box";
import Card from "@component/Card";
import Image from "@component/Image";
import FlexBox from "@component/FlexBox";
import { H5 } from "@component/Typography";
import { ProductListResponse } from "interfaces/productListResponse";

// STYLED COMPONENT
const Wrapper = styled(Card)`
  border-radius: 12px;

  h4 {
    text-align: left;
    margin: 0.5rem 0px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  .price {
    display: flex;
    font-weight: 600;
    margin-top: 0.5rem;

    h4 {
      margin: 0px;
      padding-right: 0.5rem;
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

// ============================================================================
type ProductCard9Props = {
  product: ProductListResponse;
  [key: string]: unknown;
};
// ============================================================================

export default function ProductCard9({ product, ...props }: ProductCard9Props) {
  const { product_id, title, price, images, imageUrl } = product;

  return (
    <Wrapper overflow="hidden" width="100%" {...props}>
      <Grid container spacing={1}>
        <Grid item md={3} sm={4} xs={12}>
          <Box position="relative">
            <Image
              src={imageUrl || images[0] || "/assets/images/placeholder.jpg"}
              alt={title}
              width="100%"
              borderRadius="0.5rem"
            />
          </Box>
        </Grid>

        <Grid item md={9} sm={8} xs={12}>
          <FlexBox
            flexDirection="column"
            justifyContent="center"
            height="100%"
            p="1rem"
          >
            <Link href={`/product/${product_id}`} passHref>
              <H5 fontWeight="600" my="0.5rem">
                {title}
              </H5>
            </Link>

            <FlexBox mt="0.5rem" alignItems="center">
              <H5 fontWeight={600} color="primary.main">
                {price} ₴
              </H5>
            </FlexBox>
          </FlexBox>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
