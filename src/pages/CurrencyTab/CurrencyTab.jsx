import Currency from "../../components/Currency/Currency";
import Balance from "../../components/Balance/Balance";
import useMedia from "../../hooks/useMedia";

export default function CurrencyTab() {
  const { isMobile } = useMedia(); 

  return (
    <div>
      {!isMobile && <Balance />} 
      <Currency />
    </div>
  );
}
