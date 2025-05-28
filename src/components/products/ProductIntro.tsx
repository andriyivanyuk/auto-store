"use client";

import { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { IconMinus, IconPlus } from "@tabler/icons-react";

import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H1, H2, H3, H6, SemiSpan } from "@component/Typography";
import useCart from "@hook/useCart";
import { currency } from "@utils/utils";
import { ProductImage } from "interfaces/productResponse";

interface Props {
  price: number;
  title: string;
  images: ProductImage[];
  id: string | number;
}

export default function ProductIntro({ images, title, price, id }: Props) {
  const param = useParams();
  const { state, dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  const routerId = param.slug as string;
  const cartItem = state.cart.find(
    (item) => item.id === id || item.id === routerId
  );

  const handleImageClick = useCallback(
    (ind: number) => () => setSelectedImage(ind),
    []
  );

  const handleCartAmountChange = useCallback(
    (amount: number) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          id,
          price,
          qty: amount,
          name: title,
          imgUrl: images.find((item) => item.image_path).image_path,
        },
      });
    },
    [dispatch, id, images, price, title]
  );

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" alignItems="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <div>
            <FlexBox
              mb="50px"
              overflow="hidden"
              borderRadius={16}
              justifyContent="center"
            >
              <Image
                width={300}
                height={300}
                src={images[selectedImage].image_path}
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </FlexBox>

            <FlexBox overflow="auto">
              {images.map((url, ind) => (
                <Box
                  key={ind}
                  size={70}
                  bg="white"
                  minWidth={70}
                  display="flex"
                  cursor="pointer"
                  border="1px solid"
                  borderRadius="10px"
                  alignItems="center"
                  justifyContent="center"
                  ml={ind === 0 ? "auto" : ""}
                  mr={ind === images.length - 1 ? "auto" : "10px"}
                  borderColor={
                    selectedImage === ind ? "primary.main" : "gray.400"
                  }
                  onClick={handleImageClick(ind)}
                >
                  <Avatar src={url.image_path} borderRadius="10px" size={65} />
                </Box>
              ))}
            </FlexBox>
          </div>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{title}</H1>

          {/* <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Brand:</SemiSpan>
            <H6 ml="8px">Ziaomi</H6>
          </FlexBox> */}

          <Box mb="24px">
            <H2 color="primary.main" mb="4px" lineHeight="1">
              {currency(price)}
            </H2>

            <SemiSpan color="inherit">Є в наявності</SemiSpan>
          </Box>

          {!cartItem?.qty ? (
            <Button
              mb="36px"
              size="small"
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
            >
              Додати до кошика
            </Button>
          ) : (
            <FlexBox alignItems="center" mb="36px">
              <Button
                p="9px"
                size="small"
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <IconMinus size={22} />
              </Button>

              <H3 fontWeight="600" mx="20px">
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button
                p="9px"
                size="small"
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <IconPlus size={22} />
              </Button>
            </FlexBox>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
