"use client";

import { useEffect, useState, Fragment, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import { Button } from "@component/buttons";
import Typography from "@component/Typography";
import Radio from "@component/radio";
import Grid from "@component/grid/Grid";
import Link from "next/link";
import useWindowSize from "@hook/useWindowSize";
import { submitPaymentInit } from "services/apiService";

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const width = useWindowSize();
  const isMobile = width < 769;
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://secure.wayforpay.com/server/pay-widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ✅ Виклик WayForPay
  const payWithWayforpay = (paymentData: any) => {
    const wayforpay = new (window as any).Wayforpay();

    wayforpay.run(
      paymentData,
      function (response: any) {
        console.log("✔️ Payment approved", response);

        // ✅ очищаємо orderId
        localStorage.removeItem("lastOrderId");

        // 🔁 за бажанням: router.push("/success");
      },
      function (response: any) {
        console.warn("❌ Payment declined", response);
      },
      function (response: any) {
        console.log("⏳ Payment pending", response);
      }
    );
  };

  // ✅ Відправка запиту на ініціацію платежу
  const handleSubmit = async () => {
    try {
      const orderId = localStorage.getItem("lastOrderId");

      if (!orderId) {
        alert(
          "ID замовлення не знайдено. Спробуйте оформити замовлення ще раз."
        );
        return;
      }

      const { paymentData } = await submitPaymentInit(orderId);

      if (!paymentData) {
        alert("Не вдалося отримати paymentData");
        return;
      }

      payWithWayforpay(paymentData);
    } catch (err) {
      console.error("Помилка ініціалізації платежу", err);
      alert("Щось пішло не так");
    }
  };

  const handlePaymentMethodChange = ({
    target: { name },
  }: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(name);
  };

  return (
    <Fragment>
      <Card1 mb="2rem">
        <Radio
          mb="1.5rem"
          color="secondary"
          name="credit-card"
          onChange={handlePaymentMethodChange}
          checked={paymentMethod === "credit-card"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Оплатити карткою (WayForPay)
            </Typography>
          }
        />
        <Divider mb="1.25rem" mx="-2rem" />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Перейти до оплати
        </Button>

        <Divider mb="1.5rem" mx="-2rem" />

        <Radio
          mb="1.5rem"
          name="cod"
          color="secondary"
          onChange={handlePaymentMethodChange}
          checked={paymentMethod === "cod"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Оплата при отриманні
            </Typography>
          }
        />
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout">
            <Button variant="outlined" color="primary" fullWidth>
              Назад до деталей
            </Button>
          </Link>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Link href="/orders">
            <Button variant="contained" color="primary" fullWidth>
              Переглянути замовлення
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
}
