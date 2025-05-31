"use client";

import { useEffect } from "react";
import { saveStoreIdToCookie } from "services/cookieService";

export default function StoreIdSetter() {
  useEffect(() => {
    saveStoreIdToCookie("b67081849ada67fa");
  }, []);

  return null;
}
