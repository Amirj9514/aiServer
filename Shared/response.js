const respReturn = (status, tokenErrStatus, message, data) => {
  let da = {
    success: status ? status : false,
    tokenErr: tokenErrStatus ? tokenErrStatus : false,
    message: message ? message : "Server Error :( ",
    data: data ? data : null,
  };


  return da;
};


module.exports = respReturn;
