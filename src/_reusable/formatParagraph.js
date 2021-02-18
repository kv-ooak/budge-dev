import React from 'react';

const formatParagraph = (text) => {
  const formatted = text.split('. ').map((str) => (
    <p>
      {str}
      .
    </p>
  ));
  return formatted;
};

export default formatParagraph;
