"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { IconEye, IconHeart, IconMinus, IconPlus, IconShoppingCart } from "@tabler/icons-react";

import useCart from "@hook/useCart";
import Box from "@component/Box";
import Chip from "@component/Chip";
import Rating from "@component/rating";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import NextImage from "@component/NextImage";
import { H3, Paragraph, Span } from "@component/Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { calculateDiscount, currency } from "@utils/utils";

// STYLED COMPONENTS
const Wrapper = styled("div")`
  height: 100%;
  margin: auto;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageWrapper = styled("div")({
  borderRadius: 8,
  overflow: "hidden",
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  "&:hover": {
    "& .hoverButtonBox": { opacity: 1 },
    "& .hoverImgBox": { filter: "blur(5px)" }
  }
});

const HoverButtonBox = styled("div")({
  opacity: 0,
  top: "50%",
  left: "50%",
  width: "100%",
  height: "100%",
  position: "absolute",
  transition: ".5s ease",
  transform: "translate(-50%, -50%)",
  "& .buttonBox": {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    "& .addCartButton": {
      bottom: 20,
      margin: "auto",
      padding: "4px 14px",
      position: "absolute",
      "& svg": { fontSize: 16 }
    }
  }
});

const ImageBox = styled("div")({
  opacity: 1,
  padding: "44px 40px",
  background: "#F5F5F5",
  transition: "all .3s ease"
});

const ItemController = styled("div")(({ theme }) => ({
  display: "flex",
  background: "#fff",
  overflow: "hidden",
  borderRadius: "5px",
  boxShadow: theme.shadows[2],
  "& span": {
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "6px 12px",
    alignItems: "center",
    "&:hover": { cursor: "pointer", background: "#f3f5f9" }
  },
  "& svg": { fontSize: 22, color: theme.colors.gray[600] }
}));

const ContentWrapper = styled("div")({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }
});

// =============================================================
interface ProductCard12Props {
  id: string;
  off?: number;
  slug: string;
  title: string;
  price: number;
  imgUrl: string;
  rating: number;
  images: string[];
}
// =============================================================

export default function ProductCard12({
  id,
  off,
  slug,
  title,
  price,
  imgUrl,
  rating,
  images
}: ProductCard12Props) {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useCart();

  const cartItem = state.cart.find((item) => item.id === id);

  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  const handleCartAmountChange = useCallback(
    (qty: number) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          id,
          qty,
          slug,
          price,
          imgUrl,
          name: title
        }
      });
    },
    [dispatch, id, imgUrl, price, slug, title]
  );

  return (
    <Wrapper>
      <ImageWrapper>
        {off !== 0 && (
          <Chip
            top="10px"
            zIndex={1}
            left="10px"
            p="5px 10px"
            fontSize="10px"
            fontWeight="600"
            bg="primary.main"
            position="absolute"
            color="primary.text">
            {off}% off
          </Chip>
        )}

        <ImageBox className="hoverImgBox">
          <Link href={`/product/${slug}`}>
            <NextImage alt={title} width={190} height={190} src={imgUrl} />
          </Link>
        </ImageBox>

        <HoverButtonBox className="hoverButtonBox">
          <Box className="buttonBox">
            <ItemController>
              <Span onClick={toggleDialog}>
                <IconEye size={18} />
              </Span>

              <Span>
                <IconHeart size={18} />
              </Span>

              <Span onClick={handleCartAmountChange(1)}>
                <IconShoppingCart size={18} />
              </Span>
            </ItemController>

            <Button
              color="primary"
              variant="outlined"
              borderColor="primary.light"
              className="addCartButton"
              onClick={handleCartAmountChange(cartItem?.qty ? cartItem?.qty - 1 : 1)}>
              {cartItem?.qty ? (
                <>
                  <IconMinus size={18} />
                  <Span ml={1}>Remove from Cart</Span>
                </>
              ) : (
                <>
                  <IconPlus size={18} />
                  <Span ml={1}>Add to Cart</Span>
                </>
              )}
            </Button>
          </Box>
        </HoverButtonBox>
      </ImageWrapper>

      <ContentWrapper>
        <Link href="#">
          <H3
            mb={1}
            title={title}
            fontSize="14px"
            fontWeight="600"
            className="title"
            color="text.secondary">
            {title}
          </H3>
        </Link>

        {rating && (
          <Box display="flex" alignItems="center">
            <Rating value={rating || 0} color="warn" />{" "}
            <Paragraph ml={2}>{`(${rating}.0)`}</Paragraph>
          </Box>
        )}

        <FlexBox alignItems="center" mt={0.5}>
          <Box fontWeight="600" color="primary.main" mr={2}>
            {calculateDiscount(price, off as number)}
          </Box>

          {off !== 0 && (
            <Box color="grey.600" fontWeight="600">
              <del>{currency(price)}</del>
            </Box>
          )}
        </FlexBox>
      </ContentWrapper>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ id, images, slug, price, title }}
      />
    </Wrapper>
  );
}
