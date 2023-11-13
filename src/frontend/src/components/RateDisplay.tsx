import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExchangeRate from '../types/ExchangeRate';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

type Props = {
  exchangeRate: ExchangeRate | undefined;
};

function RateDisplay({ exchangeRate }: Props) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const rate = exchangeRate ? exchangeRate.rate.toFixed(1) : '';
  const datetime = exchangeRate
    ? dayjs
        .unix(exchangeRate.timestamp)
        .tz('Asia/Tokyo')
        .format('YYYY-MM-DD HH:mm:ss')
    : '';

  return (
    <Card variant="outlined" sx={{ width: '100%', textAlign: 'center' }}>
      <CardContent>
        <Typography variant="h6" component="p">
          現在のレート
        </Typography>
        <Typography variant="body1" component="p" m={2}>
          1 USD = {rate} JPY
        </Typography>
        <Typography variant="body2" component="p">
          {datetime}時点
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RateDisplay;
