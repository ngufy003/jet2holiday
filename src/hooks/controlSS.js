import { useState } from 'react';

/**
 * useSS - Custom hook to manage s2 and s4 checkbox state (mute/unmute control)
 * 
 * @param {boolean} initial - Initial checked state (default: false = unmuted)
 * @param {function} onChange - Callback function to notify parent when checkbox changes
 * @returns {object} - Returns { sSChecked, setSSChecked, handleSSChange }
 */
export default function useSS(initial = false, onChange) {
  const [sSChecked, setSSChecked] = useState(initial);

   /**
   * handleSSChange - Event handler for checkbox changes
   * Updates the local state and notifies the parent component
   * 
   * @param {Event} e - The checkbox change event
   */
  const handleSSChange = (e) => {
    const checked = e.target.checked;
    setSSChecked(checked);
    if (typeof onChange === 'function') onChange(checked);
  };

  return { sSChecked, setSSChecked, handleSSChange };
}