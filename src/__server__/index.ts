import type MockAdapter from "axios-mock-adapter";

import { market1ApiEndpoints } from "./__db__/market-1";

import { healthBeautyApiEndpoints } from "./__db__/health-beauty";
import { relatedProductsApiEndpoints } from "./__db__/related-products";

import { shopApiEndpoints } from "./__db__/shop";
import { salesApiEndpoints } from "./__db__/sales";
import { adminApiEndpoints } from "./__db__/users";
import { ticketApiEndpoints } from "./__db__/ticket";
import { AddressApiEndPoints } from "./__db__/address";
import { productApiEndpoints } from "./__db__/products";
import { dashboardApiEndpoints } from "./__db__/dashboard";

export const MockEndPoints = (Mock: MockAdapter) => {
  market1ApiEndpoints(Mock);
  healthBeautyApiEndpoints(Mock);
  relatedProductsApiEndpoints(Mock);

  shopApiEndpoints(Mock);
  salesApiEndpoints(Mock);
  adminApiEndpoints(Mock);
  ticketApiEndpoints(Mock);
  AddressApiEndPoints(Mock);
  productApiEndpoints(Mock);
  dashboardApiEndpoints(Mock);

  Mock.onAny().passThrough();
};
