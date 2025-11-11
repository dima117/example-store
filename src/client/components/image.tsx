import type { FC } from 'react';
import cn from 'classnames';

import css from '@/index.module.css';

interface ImageProps {
    className?: string;
}

const STUB =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=';

/** заглушка изображения */
export const Image: FC<ImageProps> = ({ className }) => {
    return <img className={cn(css.image, className)} src={STUB} />;
};
