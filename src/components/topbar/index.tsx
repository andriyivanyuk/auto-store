"use client";

import { useEffect } from "react";
import NextImage from "next/image";
import { IconMail, IconPhone } from "@tabler/icons-react";

import Container from "../Container";
import { StyledTopbar } from "./styles";

import logo from "../../../public/assets/images/logo.svg";
import Link from "next/link";

export default function Topbar() {
  useEffect(() => {}, []);

  return (
    <StyledTopbar>
      <Container className="container">
        <div className="topbar-left">
          <Link
            href="/"
            className="logo"
            style={{ display: "inline-block", width: "auto", height: "auto" }}
          >
            <NextImage src={logo} alt="Bonik" width={120} height={50} />
          </Link>

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
