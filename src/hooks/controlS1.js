import { useState } from 'react';

/**
 * useS1 - Custom hook to manage S1 checkbox state (mute/unmute control)
 * 
 * @param {boolean} initial - Initial checked state (default: false = unmuted)
 * @param {function} onChange - Callback function to notify parent when checkbox changes
 * @returns {object} - Returns { s1Checked, setS1Checked, handleS1Change }
 */
export default function useS1(initial = false, onChange) {
  const [s1Checked, setS1Checked] = useState(initial);

   /**
   * handleS1Change - Event handler for checkbox changes
   * Updates the local state and notifies the parent component
   * 
   * @param {Event} e - The checkbox change event
   */
  const handleS1Change = (e) => {
    const checked = e.target.checked;
    setS1Checked(checked);
    if (typeof onChange === 'function') onChange(checked);
  };

  return { s1Checked, setS1Checked, handleS1Change };
}