import type { FC } from 'react';
import { NavLink } from 'react-router';

interface HeaderLinkProps {
    text: string;
    to: string;
}

/** элемент навигационного меню */
export const HeaderLink: FC<HeaderLinkProps> = ({ to, text }) => {
    return (
        <li className="nav-item">
            <NavLink className="nav-link" to={to} end>
                {text}
            </NavLink>
        </li>
    );
};
