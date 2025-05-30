"use client";

import { useState } from "react";
import Grid from "@component/grid/Grid";
import CheckoutForm from "@sections/checkout/CheckoutForm";
import CheckoutSummary from "@sections/checkout/CheckoutSummary";

export interface DeliverySelection {
  cityLabel: string;
  branchLabel: string;
}

export default function Checkout() {
  const [deliverySelection, setDeliverySelection] = useState<DeliverySelection>(
    {
      cityLabel: "",
      branchLabel: "",
    }
  );

  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <CheckoutForm
          deliverySelection={deliverySelection}
          setDeliverySelection={setDeliverySelection}
        />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <CheckoutSummary deliverySelection={deliverySelection} />
      </Grid>
    </Grid>
  );
}
