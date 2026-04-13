import { useEffect, useRef } from "react";

function Error() {
  const errorTitleRef = useRef(null);

  useEffect(() => {
    errorTitleRef.current?.focus();
  }, []);

  return (
    <div
      className="error-page"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <h1 className="error-title" ref={errorTitleRef} tabIndex={-1}>
        Uh oh! The captain spilled coffee on the comms console. Try this again
        in a moment.
      </h1>
      <p className="error-message">
        Please check your internet connection and try again.
      </p>
    </div>
  );
}

export default Error;
