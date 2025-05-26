import AppLayout from "@component/layout/layout-1";
import Navbar from "@component/navbar/Navbar";

import Section1 from "@sections/market-1/Section1";
import Section2 from "@sections/market-1/Section2";
import Section3 from "@sections/market-1/Section3";
import Section4 from "@sections/market-1/Section4";
import Section5 from "@sections/market-1/Section5";
import Section8 from "@sections/market-1/Section8";
import Section10 from "@sections/market-1/Section10";
import Section11 from "@sections/market-1/Section11";
import Section12 from "@sections/market-1/Section12";

import StoreIdSetter from "@component/StoreIdSetter";

export default async function Market1() {
  return (
    <AppLayout navbar={<Navbar navListOpen />}>
      <main>
        <StoreIdSetter />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section8 />
        <Section10 />
        <Section11 />
        <Section12 />
      </main>
    </AppLayout>
  );
}
