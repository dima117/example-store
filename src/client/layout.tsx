import type { FC, PropsWithChildren } from "react";
import { NavLink } from "react-router";

interface HeaderLinkProps {
  text: string;
  to: string;
}

const HeaderLink: FC<HeaderLinkProps> = ({ to, text }) => {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={to} end>
        {text}
      </NavLink>
    </li>
  );
};

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container">
          <NavLink className="navbar-brand" to="/" end>
            Example store
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <HeaderLink to="/catalog" text="Catalog" />
              <HeaderLink to="/about" text="About" />
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">{children}</div>
    </>
  );
};
