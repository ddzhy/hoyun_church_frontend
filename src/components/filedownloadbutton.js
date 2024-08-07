import React from 'react';

const FileDownloadButton = () => {
  const handleDownload = () => {
    const fileURL = `${process.env.PUBLIC_URL}/images/picture_1.jpg`; // public 폴더 내의 파일 경로

    const link = document.createElement('a');
    link.href = fileURL;
    link.download = 'picture_1.jpg'; // 다운로드될 파일 이름
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleDownload}>Download File</button>
  );
};

export default FileDownloadButton;
