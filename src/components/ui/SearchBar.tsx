import React from "react";
import { Search2Line } from "./icons/Icons";
import { Input } from "./Input";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  leftIcon?: React.ReactNode;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  leftIcon = <Search2Line className="text-primary" />,
  ...props
}) => {
  return (
    <Input type="text" leftIcon={leftIcon} className={className} {...props} />
  );
};
