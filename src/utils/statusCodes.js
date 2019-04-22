const isErrorCode = (statusCode) => {
  return statusCode >= 400 && statusCode < 600;
};

export { isErrorCode };