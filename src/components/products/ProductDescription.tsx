import Typography, { H3 } from "@component/Typography";
import Box from "@component/Box";
import { ProductAttribute } from "interfaces/productResponse";

interface Props {
  description: string;
  attributes: ProductAttribute[];
}

export default function ProductDescription({ description, attributes }: Props) {
  return (
    <div>
      <H3 mb="1rem">Опис товару:</H3>

      <Box style={{ whiteSpace: "pre-line", marginBottom: "2rem" }}>
        <Typography>{description}</Typography>
      </Box>

      <H3 mb="1rem">Характеристики:</H3>

      <ul style={{ paddingLeft: "1.5rem" }}>
        {attributes.map((attr, index) => (
          <li key={index} style={{ marginBottom: "0.5rem" }}>
            <strong>{attr.key}:</strong> {attr.values.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
