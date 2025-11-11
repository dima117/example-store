import type { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router';

import { HeaderLink } from '@components/header-link';
import { useAppSelector } from '@/store';

/** общая часть интерфейса для всех страниц приложения */
export const Layout: FC<PropsWithChildren> = ({ children }) => {
    // cart info
    const cart = useAppSelector((s) => s.cart);
    const count = Object.values(cart).reduce((a, i) => a + i.count, 0);
    const cartLabel = count ? `Cart (${count})` : `Cart`;

    return (
        <>
            <nav className="navbar navbar-expand-sm bg-body-tertiary">
                <div className="container">
                    <NavLink className="navbar-brand" to="/" end>
                        Example store
                    </NavLink>
                    <ul className="navbar-nav flex-fill">
                        <HeaderLink to="/catalog" text="Catalog" />
                        <HeaderLink to="/contacts" text="Contacts" />
                        <HeaderLink to="/cart" text={cartLabel} />
                    </ul>
                </div>
            </nav>
            <div className="container">{children}</div>
        </>
    );
};
