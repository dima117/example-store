import type { FC, PropsWithChildren } from "react";

export const PageTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="row">
      <div className="col pt-4 pb-2">
        <h1>{children}</h1>
      </div>
    </div>
  );
};
