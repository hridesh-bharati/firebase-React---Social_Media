import React, { useState, useEffect } from 'react';
import { MdFullscreenExit, MdOutlineFullscreen } from 'react-icons/md';
import { Button } from 'react-bootstrap';

function Fullscreen({ darkMode }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const fs = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(fs);
    };
    document.addEventListener('fullscreenchange', handler);
    document.addEventListener('webkitfullscreenchange', handler);
    document.addEventListener('msfullscreenchange', handler);

    return () => {
      document.removeEventListener('fullscreenchange', handler);
      document.removeEventListener('webkitfullscreenchange', handler);
      document.removeEventListener('msfullscreenchange', handler);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return (
    <Button
      variant="link"
      onClick={toggleFullscreen}
      aria-label="Toggle Fullscreen"
      size="sm"
      className={`rounded-circle p-2 ${darkMode ? 'text-light' : 'text-primary'}`}
      style={{ border: 'none', fontSize: '22px', cursor: 'pointer' }}
    >
      {isFullscreen ? <MdOutlineFullscreen /> : <MdFullscreenExit />}
    </Button>
  );
}

export default Fullscreen;
