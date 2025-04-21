import React from 'react';

const formatToHTML = (text) => {
  // Format headings (e.g. ## Acne Vulgaris becomes <h2>Acne Vulgaris</h2>)
  text = text.replace(/^(## .*)/gm, (match) => {
    return `<h2 style="font-weight: bold; text-decoration: underline; font-size: 24px; margin-bottom: 10px;">${match.slice(3)}</h2>`;
  });

  // Format bold text (e.g. **Bold** becomes <b>Bold</b>)
  text = text.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
    return `<b>${p1}</b>`;
  });

  // Format bullet points (e.g. * Item becomes <ul><li>Item</li></ul>)
  text = text.replace(/^\*\s(.+)$/gm, (match, p1) => {
    return `<ul style="margin-left: 20px;"><li style="margin-bottom: 5px;">${p1}</li></ul>`;
  });

  // Remove any unnecessary extra line breaks or spaces
  text = text.replace(/\n{2,}/g, '\n');

  // Return the formatted HTML string
  return { __html: text };
};

const DisplayInfo = ({ content }) => {
  return (
    <div dangerouslySetInnerHTML={formatToHTML(content)} />
  );
};

export default DisplayInfo;
