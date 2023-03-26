import React from "react";
import { useRouteError } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

export const ErrorFallback = () => {
  const error = useRouteError();
  const notFound = error?.status === 404;
  let content = <span>Something whent wrong</span>;
  if (notFound) {
    content = <div>Not found</div>;
  }
  return (
    <div role="alert">
      {content}
    </div>
  );
};

const ErrorWrapper = ({ children = [] }) => {
  const handleError = (error, info) => {
    console.log(
      "🚀 ~ file: ErrorBoundary.js:20 ~ handleError ~ error, info",
      error,
      info
    );
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorWrapper;
