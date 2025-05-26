"use client";

import Link from "next/link";
import styled from "styled-components";
import { useCallback } from "react";

import useCart from "@hook/useCart";

import Card, { CardProps } from "@component/Card";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import NextImage from "@component/NextImage";
import { H3, SemiSpan } from "@component/Typography";
import { Button } from "@component/buttons";
import { IconPlus, IconMinus } from "@tabler/icons-react";

const Wrapper = styled(Card)`
  position: relative;
  margin: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  transition: all 250ms ease-in-out;

  .image-holder {
    text-align: center;
    position: relative;
    display: inline-block;
    height: 100%;
  }

  .details {
    padding: 1rem;

    .title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .cart-control {
    margin-top: 0.75rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
  }

  .qty {
    font-weight: 600;
    font-size: 14px;
  }
`;

interface ProductCard1Props extends CardProps {
  product_id: number;
  title: string;
  price: number;
  images: string[];
  imgUrl: string;
}

export default function ProductCard1({
  product_id,
  title,
  price,
  images,
  ...props
}: ProductCard1Props) {
  const imgUrl = images[0] || "/assets/images/placeholder.jpg";

  const { state, dispatch } = useCart();
  const cartItem = state.cart.find((item) => item.id === product_id);

  const handleCartAmountChange = useCallback(
    (qty: number) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          id: product_id,
          price,
          imgUrl,
          name: title,
          qty,
        },
      });
    },
    [dispatch, product_id, price, imgUrl, title]
  );

  return (
    <Wrapper borderRadius={12} {...props}>
      <div className="image-holder">
        <Link href={`/product/${product_id}`}>
          <NextImage alt={title} width={277} height={270} src={imgUrl} />
        </Link>
      </div>

      <div className="details">
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
            <Link href={`/product/${product_id}`}>
              <H3
                mb="10px"
                title={title}
                fontSize="14px"
                textAlign="left"
                fontWeight="600"
                className="title"
                color="text.secondary"
              >
                {title}
              </H3>
            </Link>

            <H3 fontSize="16px" fontWeight="700" color="primary.main">
              {price} ₴
            </H3>

            <div className="cart-control">
              <Button
                size="none"
                padding="5px"
                color="primary"
                variant="outlined"
                borderColor="primary.light"
                onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
              >
                <IconPlus size={18} />
              </Button>

              {!!cartItem?.qty && (
                <>
                  <SemiSpan className="qty">{cartItem.qty}</SemiSpan>

                  <Button
                    size="none"
                    padding="5px"
                    color="primary"
                    variant="outlined"
                    borderColor="primary.light"
                    onClick={handleCartAmountChange(cartItem.qty - 1)}
                  >
                    <IconMinus size={18} />
                  </Button>
                </>
              )}
            </div>
          </Box>
        </FlexBox>
      </div>
    </Wrapper>
  );
}
