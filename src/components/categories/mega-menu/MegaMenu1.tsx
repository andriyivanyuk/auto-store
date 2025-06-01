import Link from "next/link";
import Image from "next/image";

import Grid from "@component/grid/Grid";
import Card from "@component/Card";
import Box from "@component/Box";
import { StyledMegaMenu1 } from "./styles";
import { MegaMenu1Props } from "./type";

export default function MegaMenu1({
  data: { categories },
  minWidth = "360px", // менша ширина
}: MegaMenu1Props) {
  if (!categories || categories.length === 0) return null;

  return (
    <StyledMegaMenu1 className="mega-menu">
      <Card
        ml="1rem"
        minWidth={minWidth}
        maxWidth="400px"
        boxShadow="regular"
        overflow="hidden"
        borderRadius={8}
        p="0.5rem 0.75rem"
      >
        <Grid container spacing={1}>
          {categories.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Link href={item.href}>
                <Box
                  display="flex"
                  alignItems="center"
                  px="0.75rem"
                  py="0.5rem"
                  borderRadius="6px"
                  transition="all 250ms ease-in-out"
                >
                  {item.icon && (
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={30}
                      height={30}
                      style={{
                        objectFit: "contain",
                        marginRight: "0.75rem",
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </span>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Card>
    </StyledMegaMenu1>
  );
}
