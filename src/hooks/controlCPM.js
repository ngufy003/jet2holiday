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
    const v = Number(e.target.value);
    setCpm(v);
    if (typeof onSetCpm === 'function') onSetCpm(v);
  };

  return { cpm, handleChange, setCpm };
}