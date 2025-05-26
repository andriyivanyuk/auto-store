import Link from "next/link";
import { ReactNode } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import { StyledCategoryMenuItem } from "./styles";

interface CategoryMenuItemProps {
  href: string;
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
  return (
    <StyledCategoryMenuItem>
      <Link href={href}>
        <div className="category-dropdown-link">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={title}
              width={24}
              height={24}
              style={{ objectFit: "contain" }}
            />
          )}
          <span className="title">{title}</span>
          {caret && <IconChevronRight stroke={1.5} size={16} />}
        </div>
      </Link>

      {children}
    </StyledCategoryMenuItem>
  );
}
