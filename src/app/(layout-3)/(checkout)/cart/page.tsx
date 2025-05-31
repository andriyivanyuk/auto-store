"use client";

import { Fragment } from "react";
import { useRouter } from "next/navigation";

// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { ProductCard7 } from "@component/product-cards";
import Button from "@component/buttons/Button";

// CUSTOM HOOK
import useCart from "@hook/useCart";
import useWindowSize from "@hook/useWindowSize";

// UTILS
import { currency } from "@utils/utils";

export default function Cart() {
  const { state } = useCart();
  const router = useRouter();
  const width = useWindowSize();

  const getTotalPrice = () => {
    return (
      state.cart.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };

  if (state.cart.length === 0) {
    return (
      <Typography fontSize="18px" textAlign="center" mt="3rem">
        Ваш кошик порожній
      </Typography>
    );
  }

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          {state.cart.map((item) => (
            <ProductCard7
              mb="1.5rem"
              id={item.id}
              key={item.id}
              qty={item.qty}
              slug={item.slug}
              name={item.name}
              price={item.price}
              imgUrl={item.imgUrl}
            />
          ))}
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Card1>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <Typography color="gray.600">Разом:</Typography>
              <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                {currency(getTotalPrice())}
              </Typography>
            </FlexBox>
          </Card1>
        </Grid>
      </Grid>

      {/* Кнопка оформлення замовлення тільки для мобілки/планшета */}
      {width <= 900 && (
        <Box display="flex" justifyContent="center" px="1.5rem" mt="2rem">
          <Button
            color="primary"
            variant="contained"
            borderRadius={8}
            onClick={() => router.push("/checkout")}
            fullWidth
          >
            До замовлень
          </Button>
        </Box>
      )}
    </Fragment>
  );
}
