import { useState } from 'react';

/**
 * useS5 - Custom hook to manage S5 checkbox state (mute/unmute control)
 * 
 * @param {boolean} initial - Initial checked state (default: false = unmuted)
 * @param {function} onChange - Callback function to notify parent when checkbox changes
 * @returns {object} - Returns { s1Checked, setS1Checked, handleS1Change }
 */
export default function useS5(initial = false, onChange) {
  const [s5Checked, setS5Checked] = useState(initial);

   /**
   * handleS1Change - Event handler for checkbox changes
   * Updates the local state and notifies the parent component
   * 
   * @param {Event} e - The checkbox change event
   */
  const handleS5Change = (e) => {
    const checked = e.target.checked;
    setS5Checked(checked);
    if (typeof onChange === 'function') onChange(checked);
  };

  return { s5Checked, setS5Checked, handleS5Change };
}