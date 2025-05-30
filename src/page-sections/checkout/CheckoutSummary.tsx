"use client";

import { Card1 } from "@component/Card1";
import Typography from "@component/Typography";
import Box from "@component/Box";
import { CartItem } from "@context/CartContext";

interface Props {
  deliverySelection: {
    cityLabel: string;
    branchLabel: string;
  };
  cartItems: CartItem[];
  totalPrice: number;
}

export default function CheckoutSummary({
  deliverySelection,
  cartItems,
  totalPrice,
}: Props) {
  const { cityLabel, branchLabel } = deliverySelection;

  return (
    <Card1>
      {/* Блок доставки */}
      <Typography fontWeight="600" fontSize="16px" mb="1rem">
        Доставка
      </Typography>

      <Box mb="0.5rem">
        <Typography color="text.hint" fontSize="13px">
          Місто
        </Typography>
        <Typography fontWeight="500" fontSize="14px">
          {cityLabel || "-"}
        </Typography>
      </Box>

      <Box mb="1rem">
        <Typography color="text.hint" fontSize="13px">
          Відділення
        </Typography>
        <Typography fontWeight="500" fontSize="14px">
          {branchLabel || "-"}
        </Typography>
      </Box>

      {/* Блок товарів */}
      <Typography fontWeight="600" fontSize="16px" mb="1rem">
        Обрані товари
      </Typography>

      {cartItems.length === 0 ? (
        <Typography fontSize="14px" color="text.secondary">
          Кошик порожній
        </Typography>
      ) : (
        cartItems.map((item) => (
          <Box key={item.id} mb="0.5rem">
            <Typography fontSize="14px" fontWeight="500">
              {item.name}
            </Typography>
            <Typography fontSize="13px" color="text.secondary">
              {item.qty} x {item.price} грн
            </Typography>
          </Box>
        ))
      )}

      {/* Загальна сума */}
      {cartItems.length > 0 && (
        <Box mt="1rem" borderTop="1px solid #ddd" pt="0.5rem">
          <Typography fontWeight="600">Загалом: {totalPrice} грн</Typography>
        </Box>
      )}
    </Card1>
  );
}
