import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencyRates } from "../../redux/currency/operations";
import { selectCurrencyRates } from "../../redux/currency/selectors";

const Currency = () => {
  const dispatch = useDispatch();
  const rates = useSelector(selectCurrencyRates);

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  const formatRate = (rate) => {
    return rate.toFixed(2);
  };

  const usdRate = rates?.find((rate) => rate.currencyCodeA === 840);
  const eurRate = rates?.find((rate) => rate.currencyCodeA === 978);

  return (
    <div>
      <h2>Exchange Rates</h2>
      <div>
        <div>
          <div>Currency</div>
          <div>Purchase</div>
          <div>Sale</div>
        </div>

        <div>
          <div>USD</div>
          <div>{formatRate(usdRate.rateBuy)}</div>
          <div>{formatRate(usdRate.rateSell)}</div>
        </div>

        <div>
          <div>EUR</div>
          <div>{formatRate(eurRate.rateBuy)}</div>
          <div>{formatRate(eurRate.rateSell)}</div>
        </div>
      </div>
    </div>
  );
};

export default Currency;
