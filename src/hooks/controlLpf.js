import { useState } from 'react';

/**
 * useLpf - Custom hook to manage overall lpf state
 * 
 * @param {number} initial - Initial lpf value (default: 1000, range 400-1000)
 * @param {function} onChange - Callback function to notify parent when lpf changes
 * @returns {object} - Returns { lpf, setLpf, handleLpfChange }
 */
export default function useLpf(initial = 1000, onChange) {
  // State to store the current lpf value (400-1000 scale)
  const [lpf, setLpf] = useState(initial);

  const handleSliderMove2 = (e) => {
    // Update only the local state to move the slider visually
    const lpf = Number(e.target.value);
    setLpf(lpf);
  };

  const handleLpfChange = (e) => {
    // Extract the lpfvalue from the range input
    const lpf = Number(e.target.value);
    
    setLpf(lpf);
    
    // If a callback was provided, notify the parent component of the change
    if (typeof onChange === 'function') onChange(lpf);
  };

  return { lpf, setLpf, handleLpfChange, handleSliderMove2 };
}