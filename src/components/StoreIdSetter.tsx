"use client";

import { useEffect } from "react";
import { saveStoreIdToCookie } from "services/cookieService";

export default function StoreIdSetter() {
  useEffect(() => {
    saveStoreIdToCookie("e72f4c9d63b1085a");
  }, []);

  return null;
}
