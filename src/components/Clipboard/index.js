import ClipboardAPI from "clipboard";
import React, { useEffect, useRef } from "react";

export function Clipboard({ children, urlToCopy, onCopy = () => {} }) {
  const ref = useRef(null);

  useEffect(
    function () {
      const clip = new ClipboardAPI(ref.current, {
        text() {
          return urlToCopy;
        },
      });

      clip.on("success", onCopy);
      return () => clip.destroy();
    },
    [urlToCopy]
  );

  return (
    <div ref={ref} onClick={(event) => event.stopPropagation()}>
      {children}
    </div>
  );
}
