import { useState } from 'react';

export default function useS1(initial = false, onChange) {
  const [s1Checked, setS1Checked] = useState(initial);

  const handleS1Change = (e) => {
    const checked = e.target.checked;
    setS1Checked(checked);
    if (typeof onChange === 'function') onChange(checked);
  };

  return { s1Checked, setS1Checked, handleS1Change };
}