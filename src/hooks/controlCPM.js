import { useState} from 'react';

export default function useCpm(initial = 120, onSetCpm) {
  const [cpm, setCpm] = useState(initial);

  const handleChange = (e) => {
    const v = Number(e.target.value);
    setCpm(v);
    if (typeof onSetCpm === 'function') onSetCpm(v);
  };

  return { cpm, handleChange, setCpm };
}