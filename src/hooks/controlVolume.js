import { useState } from 'react';

/**
 * useVolume - Custom hook to manage overall volume state
 * 
 * @param {number} initial - Initial volume value (default: 5, range 1-10)
 * @param {function} onChange - Callback function to notify parent when volume changes
 * @returns {object} - Returns { volume, setVolume, handleVolumeChange }
 */
export default function useVolume(initial = 1, onChange) {
  // State to store the current volume value (1-10 scale)
  const [volume, setVolume] = useState(initial);

  const handleSliderMove = (e) => {
    // Update only the local state to move the slider visually
    const vol = Number(e.target.value);
    setVolume(vol);
  };

  const handleVolumeChange = (e) => {
    // Extract the volume value from the range input
    const vol = Number(e.target.value);
    
    setVolume(vol);
    
    // If a callback was provided, notify the parent component of the change
    if (typeof onChange === 'function') onChange(vol);
  };

  return { volume, setVolume, handleVolumeChange, handleSliderMove };
}