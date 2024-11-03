import { forwardRef } from "react";

type ContainerProp = {
  children: JSX.Element;
  className?: string;
};

export const Container = forwardRef<HTMLDivElement, ContainerProp>(
  ({ children, className = "" }, ref) => {
    return (
      <div ref={ref} className={`max-w-[1136px] m-auto ${className} px-4`}>
        {children}
      </div>
    );
  }
);