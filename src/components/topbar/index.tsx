"use client";

import { useEffect } from "react";
import NextImage from "next/image";
import { IconMail, IconPhone } from "@tabler/icons-react";

import Container from "../Container";
import { StyledTopbar } from "./styles";

import logo from "../../../public/assets/images/logo.svg";

export default function Topbar() {
  useEffect(() => {}, []);

  return (
    <StyledTopbar>
      <Container className="container">
        <div className="topbar-left">
          <div className="logo">
            <NextImage src={logo} alt="Bonik" />
          </div>

          <div className="phone">
            <IconPhone size={16} stroke={1.5} />
            <span>+88012 3456 7894</span>
          </div>

          <div className="email">
            <IconMail size={16} stroke={1.5} />
            <span>support@ui-lib.com</span>
          </div>
        </div>
      </Container>
    </StyledTopbar>
  );
}
