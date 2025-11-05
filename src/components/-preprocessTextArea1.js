import React from 'react';

function PreprocessTextarea({defaultValue, onChange}) {
  return (
    <div>
      <label htmlFor="proc" className="form-label">Text to preprocess:</label>
      <textarea className="form-control" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" />
    </div>
  );
}

export default PreprocessTextarea;