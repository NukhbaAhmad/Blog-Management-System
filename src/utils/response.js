const sendResponse = (res, status, { message, data } = {}) => {
  const response = {
    status: status || 200,
    ...(message && { message }),
    ...(data && { data }),
  };
  return res.status(response.status).send(response);
};

module.exports = sendResponse;
