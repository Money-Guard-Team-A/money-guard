import { useState } from "react";
const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  return { isOpen, toggle, closeModal, openModal };
};
export default useToggle;
