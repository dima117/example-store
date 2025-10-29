import type { FC } from "react";

const SUFFIX = "Example";

export interface DocumentTitleProps {
  text: string;
}

export const DocumentTitle: FC<DocumentTitleProps> = ({ text }) => {
  const content = `${text} — ${SUFFIX}`;

  return <title>{content}</title>;
};
