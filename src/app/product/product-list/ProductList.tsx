"use client";

import { Fragment, useCallback, useState } from "react";
import { useTheme } from "styled-components";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";

import Box from "@component/Box";
import Card from "@component/Card";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("@component/Select"), { ssr: false });

import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { IconButton } from "@component/buttons";
import { Paragraph } from "@component/Typography";
import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import useWindowSize from "@hook/useWindowSize";

import { SortOption } from "interfaces/sortOption";
import { ProductListResponse } from "interfaces/productListResponse";

interface Props {
  sortOptions: SortOption[];
  products: ProductListResponse[];
}

export default function ProductList({ sortOptions, products }: Props) {
  const theme = useTheme();
  const width = useWindowSize();

  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const toggleView = useCallback((v: any) => () => setView(v), []);
  const handleSortChange = useCallback((option: SortOption) => {
    if (option) setSelectedSort(option);
  }, []);

  const isTablet = width < 1025;

  return (
    <Fragment>
      <FlexBox
        as={Card}
        mb="55px"
        p="1.25rem"
        elevation={5}
        flexWrap="wrap"
        borderRadius={12}
        alignItems="center"
        justifyContent="space-between"
      >
        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">
            Сортувати по:
          </Paragraph>

          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder="Short by"
              value={selectedSort}
              onChange={handleSortChange}
              options={sortOptions}
            />
          </Box>

          {/* Показывать кнопки только на десктопі */}
          {!isTablet && (
            <>
              <Paragraph color="text.muted" mr="0.5rem">
                Переглянути:
              </Paragraph>

              <IconButton onClick={toggleView("grid")}>
                <IconLayoutGrid
                  size={22}
                  color={
                    view === "grid" ? theme.colors.primary.main : "currentColor"
                  }
                />
              </IconButton>

              <IconButton onClick={toggleView("list")}>
                <IconList
                  size={22}
                  color={
                    view === "list" ? theme.colors.primary.main : "currentColor"
                  }
                />
              </IconButton>
            </>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        <Grid item lg={12} xs={12}>
          {isTablet ? (
            <ProductListView products={products} />
          ) : view === "grid" ? (
            <ProductGridView products={products} />
          ) : (
            <ProductListView products={products} />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}
