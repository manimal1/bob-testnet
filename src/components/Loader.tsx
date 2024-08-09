import { createPortal } from "react-dom";

export function Loader() {
  return (
    <>
      {createPortal(
        <div className="center-container">
          <div className="center">
            <div className="loader" />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
