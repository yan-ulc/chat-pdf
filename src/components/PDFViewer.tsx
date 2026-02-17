import React from "react";

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  const cleanUrl = pdf_url.replace(/\s+/g, ""); // buang newline & spasi
  const encodedUrl = encodeURIComponent(cleanUrl);

  console.log("CLEAN PDF URL:", cleanUrl);

  return (
    <iframe
      src={`https://docs.google.com/gview?url=${encodedUrl}&embedded=true`}
      className="w-full h-full"
      frameBorder="0"
    />
  );
};

export default PDFViewer;
