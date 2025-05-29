"use client";

import { usePathname, useRouter } from "next/navigation";
import { Fragment, PropsWithChildren, useCallback, useMemo } from "react";
import Hidden from "@component/hidden";
import Stepper from "@component/Stepper";

const STEPPER_LIST = [
  { title: "Кошик", disabled: false, path: "/cart" },
  { title: "Деталі", disabled: false, path: "/checkout" },
  { title: "Плата", disabled: false, path: "/payment" },
  { title: "Перевірка", disabled: true, path: "/orders" },
];

const PATH_TO_STEP_MAP = {
  "/cart": 1,
  "/checkout": 2,
  "/payment": 3,
};

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();

  const selectedStep = useMemo(
    () => PATH_TO_STEP_MAP[pathname] ?? 0,
    [pathname]
  );

  const handleStepChange = useCallback(
    (_step: unknown, index: number) => {
      const targetPath = STEPPER_LIST[index]?.path;
      if (targetPath) {
        router.push(targetPath);
      }
    },
    [router]
  );

  return (
    <Fragment>
      <Hidden down="md" mb="2rem">
        <Stepper
          stepperList={STEPPER_LIST}
          selectedStep={selectedStep}
          onChange={handleStepChange}
        />
      </Hidden>

      {children}
    </Fragment>
  );
}
