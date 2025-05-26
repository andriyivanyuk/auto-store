"use client";

import Link from "next/link";
import styled from "styled-components";

import Card, { CardProps } from "@component/Card";
import FlexBox from "@component/FlexBox";
import NextImage from "@component/NextImage";
import { H3 } from "@component/Typography";

const Wrapper = styled(Card)`
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
`;

// ===================================================================
interface ProductCard1Props extends CardProps {
  product_id: number;
  title: string;
  price: string;
  images: string[];
  imgUrl: string;
}
// ===================================================================

export default function ProductCard1({
  product_id,
  title,
  price,
  images,
  ...props
}: ProductCard1Props) {
  return (
    <Wrapper borderRadius={12} {...props}>
      <div className="image-holder">
        <Link href={`/product/${product_id}`}>
          <NextImage
            alt={title}
            width={277}
            height={270}
            src={images[0] || "/assets/images/placeholder.jpg"}
          />
        </Link>
      </div>

      <div className="details">
        <FlexBox>
          <Link href={`/product/${product_id}`} passHref>
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
        </FlexBox>

        <H3 fontSize="16px" fontWeight="700" color="primary.main">
          {price} ₴
        </H3>
      </div>
    </Wrapper>
  );
}
