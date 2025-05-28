"use client";

import { Fragment, useState } from "react";

import Box from "@component/Box";
import Shop from "@models/shop.model";
import FlexBox from "@component/FlexBox";
import { H6 } from "@component/Typography";
import ProductDescription from "@component/products/ProductDescription";
import { ProductAttribute } from "interfaces/productResponse";

type Props = {
  shops: Shop[];
  description: string;
  attributes: ProductAttribute[];
};

export default function ProductView({ shops, description, attributes }: Props) {
  const [selectedOption, setSelectedOption] = useState("description");
  const handleOptionClick = (opt: any) => () => setSelectedOption(opt);

  return (
    <Fragment>
      <FlexBox
        borderBottom="1px solid"
        borderColor="gray.400"
        mt="80px"
        mb="26px"
      >
        <H6
          mr="25px"
          p="4px 10px"
          fontWeight={500}
          className="cursor-pointer"
          borderColor="primary.main"
          onClick={handleOptionClick("description")}
          borderBottom={selectedOption === "description" ? "2px solid" : ""}
          color={
            selectedOption === "description" ? "primary.main" : "text.muted"
          }
        >
          Опис
        </H6>
      </FlexBox>

      <Box mb="50px">
        {selectedOption === "description" && (
          <ProductDescription
            description={description}
            attributes={attributes}
          />
        )}
      </Box>
    </Fragment>
  );
}
