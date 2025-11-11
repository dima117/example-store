import type { FC } from 'react';

// дополнительный текст, который добавляется к title каждой страницы
const SUFFIX = 'Example';

interface DocumentTitleProps {
    text: string;
}

/** title страницы */
export const DocumentTitle: FC<DocumentTitleProps> = ({ text }) => {
    const content = `${text} — ${SUFFIX}`;

    return <title>{content}</title>;
};
