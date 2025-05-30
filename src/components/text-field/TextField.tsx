"use client";

import { cloneElement, InputHTMLAttributes, JSX, useId } from "react";
import { SpaceProps } from "styled-system";
import { colorOptions } from "interfaces";
import { StyledTextField, TextFieldWrapper } from "./styles";

type SpacingKey = `${"m" | "p"}${string}`;
type SpacingProps = Partial<Record<SpacingKey, any>>;

export interface TextFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    SpaceProps {
  id?: string;
  label?: string;
  color?: string;
  errorText?: string;
  fullWidth?: boolean;
  labelColor?: colorOptions;
  endAdornment?: JSX.Element;
}

export default function TextField({
  id,
  label,
  errorText,
  labelColor,
  endAdornment,
  color = "default",
  fullWidth,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const textId = id || generatedId;

  const spacingProps: SpacingProps = {};
  for (const key in props) {
    if (key.startsWith("m") || key.startsWith("p")) {
      spacingProps[key as SpacingKey] = props[key as SpacingKey];
    }
  }

  return (
    <TextFieldWrapper
      color={color || (labelColor && `${labelColor}.main`)}
      fullWidth={fullWidth}
      {...spacingProps}
    >
      {label && <label htmlFor={textId}>{label}</label>}

      <div className="relative">
        <StyledTextField id={textId} errorText={errorText} {...props} />

        {endAdornment &&
          cloneElement(endAdornment, {
            className: `end-adornment ${endAdornment.props.className || ""}`,
          })}
      </div>

      {errorText && <small>{errorText}</small>}
    </TextFieldWrapper>
  );
}
