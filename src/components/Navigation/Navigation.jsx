import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import Icon from "../../assets/Icons";
import useMedia from "../../hooks/useMedia";
import Balance from "../Balance/Balance";
import Currency from "../Currency/Currency";

const Navigation = () => {
  const { isMobile, isTablet, isDesktop } = useMedia();

  return (
    <div className={css.container}>
      <div>
        <nav className={css.navigation}>
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              isActive ? `${css.navLink} ${css.active}` : css.navLink
            }
          >
            <div className={css.linkIcon}>
              <Icon id="#icon-home" className={css.homeIcon} />
            </div>
            {(isTablet || isDesktop) && (
              <span className={css.linkText}>Home</span>
            )}
          </NavLink>

          <NavLink
            to="/dashboard/statistics"
            className={({ isActive }) =>
              isActive ? `${css.navLink} ${css.active}` : css.navLink
            }
          >
            <div className={css.linkIcon}>
              <Icon id="#icon-graphic" className={css.graphicIcon} />
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
                <Icon id="#icon-dollar" className={css.dollarIcon} />
              </div>
            </NavLink>
          )}
        </nav>
        <div className={css.balance}>
          <Balance />
        </div>
      </div>
      <div className={css.curr}>{!isMobile && <Currency />}</div>
    </div>
  );
};

export default Navigation;
