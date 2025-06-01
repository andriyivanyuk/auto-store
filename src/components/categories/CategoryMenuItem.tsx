import Link from "next/link";
import { ReactNode } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import { StyledCategoryMenuItem } from "./styles";

interface CategoryMenuItemProps {
  href?: string;
  title: string;
  caret?: boolean;
  imageSrc?: string;
  children: ReactNode;
}

export default function CategoryMenuItem({
  href,
  title,
  children,
  caret = true,
  imageSrc,
}: CategoryMenuItemProps) {
  const content = (
    <div className="category-dropdown-link">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={title}
          width={30}
          height={30}
          style={{ objectFit: "contain", marginRight: 8 }}
        />
      )}
      <span className="title">{title}</span>
      {caret && <IconChevronRight stroke={1.5} size={16} />}
    </div>
  );

  return (
    <StyledCategoryMenuItem>
      {href ? <Link href={href}>{content}</Link> : content}
      {children}
    </StyledCategoryMenuItem>
  );
}
