import type MockAdapter from "axios-mock-adapter";

import { salesApiEndpoints } from "./__db__/sales";
import { AddressApiEndPoints } from "./__db__/address";

export const MockEndPoints = (Mock: MockAdapter) => {
  salesApiEndpoints(Mock);
  AddressApiEndPoints(Mock);

  Mock.onAny().passThrough();
};
