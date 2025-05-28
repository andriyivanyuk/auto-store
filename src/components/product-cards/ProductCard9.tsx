"use client";

import Link from "next/link";
import styled from "styled-components";
import Grid from "@component/grid/Grid";
import Box from "@component/Box";
import Card from "@component/Card";
import Image from "@component/Image";
import FlexBox from "@component/FlexBox";
import { H5 } from "@component/Typography";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import useCart from "@hook/useCart";
import { ProductListResponse } from "interfaces/productListResponse";

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

  .cart-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }

  .circle-btn {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.main};
    border: 1px solid ${({ theme }) => theme.colors.primary.light};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    font-size: 18px;
    transition: 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.main};
      color: white;
    }
  }

  .qty {
    font-weight: 600;
    font-size: 16px;
  }
`;

type ProductCard9Props = {
  product: ProductListResponse;
};

export default function ProductCard9({ product }: ProductCard9Props) {
  const { product_id, title, price, images, imageUrl } = product;
  const imgUrl = imageUrl || images[0] || "/assets/images/placeholder.jpg";

  const { state, dispatch } = useCart();
  const cartItem = state.cart.find((item) => item.id === product_id);

  const handleCartAmountChange = (qty: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id: product_id,
        qty,
        imgUrl,
        price: Number(price),
        name: title,
      },
    });
  };

  return (
    <Wrapper overflow="hidden" width="100%">
      <Grid container spacing={1}>
        {/* Image */}
        <Grid item md={3} sm={4} xs={12}>
          <Box position="relative">
            <Link href={`/product/${product_id}`}>
              <Image
                src={imgUrl}
                alt={title}
                width="100%"
                borderRadius="0.5rem"
              />
            </Link>
          </Box>
        </Grid>

        {/* Info */}
        <Grid item md={8} sm={6} xs={12}>
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

        {/* Cart control */}
        <Grid item md={1} sm={2} xs={12}>
          <FlexBox
            height="100%"
            justifyContent="center"
            alignItems="center"
            p="1rem"
          >
            <div className="cart-buttons">
              <button
                className="circle-btn"
                onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
              >
                <IconPlus size={18} />
              </button>

              {cartItem?.qty > 0 && (
                <>
                  <span className="qty">{cartItem.qty}</span>
                  <button
                    className="circle-btn"
                    onClick={handleCartAmountChange(cartItem.qty - 1)}
                  >
                    <IconMinus size={18} />
                  </button>
                </>
              )}
            </div>
          </FlexBox>
        </Grid>
      </Grid>
    </Wrapper>
  );
}
