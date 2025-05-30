"use client";

import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";

interface Props {
  deliverySelection: {
    cityLabel: string;
    branchLabel: string;
  };
}

export default function CheckoutSummary({ deliverySelection }: Props) {
  return (
    <Card1>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Доставка:</Typography>
        <FlexBox flexDirection="column" alignItems="flex-end">
          <Typography fontSize="14px" fontWeight="500">
            {deliverySelection.cityLabel || "-"}
          </Typography>
          <Typography fontSize="13px" color="text.secondary">
            {deliverySelection.branchLabel || ""}
          </Typography>
        </FlexBox>
      </FlexBox>
    </Card1>
  );
}
