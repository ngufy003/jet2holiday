import { useState} from 'react';

/**
 * useCpm - Custom hook to manage CPM (cycles per minute) state
 * 
 * @param {number} initial - Initial CPM value (default: 120)
 * @param {function} onSetCpm - Callback function to notify parent when CPM changes
 * @returns {object} - Returns { cpm, handleChange, setCpm }
 */
export default function useCpm(initial = 120, onSetCpm) {
  const [cpm, setCpm] = useState(initial);

  /**
   * handleChange - Event handler for input changes
   * Converts the input value to a number, updates state, and calls the parent callback
   * 
   * @param {Event} e - The input change event
   */
  const handleChange = (e) => {
    const raw = e.target.value;
    //If empty, clamp to min immediately
    if (raw === '') {
      setCpm(''); // keep input blank, don't call onSetCpm yet
      return;
    }
    let v = Number(raw);
    if (Number.isNaN(v)) return;
    if (v < 20) v = 20;
    if (v > 400) v = 400;
    setCpm(v);
    if (typeof onSetCpm === 'function') onSetCpm(v);
  };

  return { cpm, handleChange, setCpm };
}