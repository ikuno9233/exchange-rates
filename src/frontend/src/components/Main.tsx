import Container from '@mui/material/Container';
import Form from './Form';
import { useState, useRef, useCallback, useSyncExternalStore } from 'react';
import Stack from '@mui/material/Stack';
import RateDisplay from './RateDisplay';
import ExchangeRate from '../types/ExchangeRate';

function Main() {
  const [jpy, setJpy] = useState<number>();
  const [usd, setUsd] = useState<number>();

  const exchangeRateRef = useRef<ExchangeRate>();
  const exchangeRate = useSyncExternalStore(
    useCallback((onStoreChange) => {
      const app_id = import.meta.env.VITE_API_APP_ID;
      const controller = new AbortController();

      fetch(`https://openexchangerates.org/api/latest.json?app_id=${app_id}`, {
        signal: controller.signal,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }

          return response.json();
        })
        .then(({ rates, timestamp }) => {
          exchangeRateRef.current = {
            rate: rates.JPY,
            timestamp: timestamp,
          };

          onStoreChange();
        })
        .catch((e) => {
          if (e.name !== 'AbortError') {
            alert('為替レートの取得に失敗しました。');
          }
        });

      return () => controller.abort();
    }, []),
    () => exchangeRateRef.current,
    () => exchangeRateRef.current
  );

  const handleJpyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setJpy(undefined);
      setUsd(undefined);
      return;
    }

    const value = Number(event.target.value.replace(/,/g, ''));

    setJpy(Number(value.toFixed(1)));
    setUsd(exchangeRate && Number((value / exchangeRate.rate).toFixed(1)));
  };

  const handleUsdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setJpy(undefined);
      setUsd(undefined);
      return;
    }

    const value = Number(event.target.value.replace(/,/g, ''));

    setUsd(Number(value.toFixed(1)));
    setJpy(exchangeRate && Number((value * exchangeRate.rate).toFixed(1)));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Stack spacing={2} alignItems="center">
        <RateDisplay exchangeRate={exchangeRate} />
        <Form
          jpy={jpy}
          usd={usd}
          handleJpyChange={handleJpyChange}
          handleUsdChange={handleUsdChange}
        />
      </Stack>
    </Container>
  );
}

export default Main;
