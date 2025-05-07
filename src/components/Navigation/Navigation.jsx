import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import Icon from "../../assets/Icons";
import useMedia from "../../hooks/useMedia";

const Navigation = () => {
  const { isMobile, isTablet, isDesktop } = useMedia();

  return (
    <nav className={css.navigation}>
      <NavLink
        to="/dashboard/home"
        className={({ isActive }) =>
          isActive ? `${css.navLink} ${css.active}` : css.navLink
        }
      >
        <div className={css.linkIcon}>
          <Icon id="#icon-home" className={css.icon} />
        </div>
        {(isTablet || isDesktop) && (
          <span className={css.linkText}>Dashboard</span>
        )}
      </NavLink>

      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) =>
          isActive ? `${css.navLink} ${css.active}` : css.navLink
        }
      >
        <div className={css.linkIcon}>
          <Icon id="#icon-graphic" className={css.icon} />
        </div>
        {(isTablet || isDesktop) && (
          <span className={css.linkText}>Statistics</span>
        )}
      </NavLink>

      {isMobile && (
        <NavLink
          to="/dashboard/currency"
          className={({ isActive }) =>
            isActive ? `${css.navLink} ${css.active}` : css.navLink
          }
        >
          <div className={css.linkIcon}>
            <Icon id="#icon-dollar" className={css.icon} />
          </div>
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
