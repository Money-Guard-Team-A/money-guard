import css from "./ModalLogOut.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signout } from "../../redux/auth/operations"; // Redux Operations dosyasına eklenmeli
import Icon from "../../assets/Icons";
import useMedia from "../../hooks/useMedia";

const LogOutModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { isMobile, isTablet, isDesktop } = useMedia();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => e.key === "Escape" && closeModal();

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const handleLogout = () => {
    dispatch(signout());
    closeModal();
  };

  return (
    <div className={css.logOutModal} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
        {!isMobile && (
          <button
            className={css.closeBtn}
            onClick={closeModal}
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path d="M1 1L17 17" stroke="#FBFBFB" />
              <path d="M1 17L17 1" stroke="#FBFBFB" />
            </svg>
          </button>
        )}

        {(isTablet || isDesktop) && (
          <Icon id="#icon-logo-tablet-desktop" className={css.homeIcon} />
        )}

        <p className={css.modalText}>Are you sure you want to log out?</p>

        <div className={css.buttonsWrapper}>
          <button className={css.logoutBtn} onClick={handleLogout}>
            LOGOUT
          </button>
          <button className={css.cancelBtn} onClick={closeModal}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
