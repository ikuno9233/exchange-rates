import TextField from '@mui/material/TextField';
import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Box from '@mui/system/Box';
import { NumberFormatValues, NumericFormat } from 'react-number-format';

type Props = {
  jpy: number | undefined;
  usd: number | undefined;
  handleJpyChange: React.ChangeEventHandler<HTMLInputElement>;
  handleUsdChange: React.ChangeEventHandler<HTMLInputElement>;
};

function Form({ jpy, usd, handleJpyChange, handleUsdChange }: Props) {
  return (
    <>
      <NumericFormat
        value={jpy ?? ''}
        thousandSeparator
        decimalScale={1}
        inputProps={{ inputMode: 'numeric' }}
        customInput={TextField}
        fullWidth
        label="JPY"
        onChange={handleJpyChange}
        isAllowed={(values: NumberFormatValues) => {
          return values.floatValue
            ? 0 <= values.floatValue && values.floatValue <= 999999999.9
            : true;
        }}
      />
      <Box>
        <ArrowUpwardIcon />
        <ArrowDownwardIcon />
      </Box>
      <NumericFormat
        value={usd ?? ''}
        thousandSeparator
        decimalScale={1}
        inputProps={{ inputMode: 'numeric' }}
        customInput={TextField}
        fullWidth
        label="USD"
        onChange={handleUsdChange}
        isAllowed={(values: NumberFormatValues) => {
          return values.floatValue
            ? 0 <= values.floatValue && values.floatValue <= 999999999.9
            : true;
        }}
      />
    </>
  );
}

export default Form;
