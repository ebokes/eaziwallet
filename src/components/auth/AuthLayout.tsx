import React, { type ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                {title}
              </h1>
            )}
            {subtitle && <p className="text-text-secondary">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
