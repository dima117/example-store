import type { FC } from 'react';
import { NavLink } from 'react-router';

interface HeaderLinkProps {
    text: string;
    to: string;
    testId?: string;
}

/** элемент навигационного меню */
export const HeaderLink: FC<HeaderLinkProps> = ({ to, text, testId }) => {
    return (
        <li className="nav-item">
            <NavLink className="nav-link" to={to} end data-testid={testId}>
                {text}
            </NavLink>
        </li>
    );
};
