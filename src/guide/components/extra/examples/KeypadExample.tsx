import { useState } from 'react';
import TextField from '../../../../components/TextField/TextField.tsx';
import Keypad from '../../../../components/Keypad/Keypad.tsx';
export default function KeypadExample() {
  const [amount, setAmount] = useState('');
  function append(key: string) {
    setAmount((value) => (value + key).replace(/^0+(?=\d)/, '').slice(0, 12));
  }
  function add(value: number) {
    setAmount((previous) => String(Number(previous || 0) + value));
  }
  return (
    <section style={{ maxWidth: 375 }}>
      <TextField label="금액" kind="price" value={amount} onValueChange={setAmount} readOnly />
      <Keypad
        onKey={append}
        onBackspace={() => setAmount((value) => value.slice(0, -1))}
        onAmount={add}
      />
    </section>
  );
}
