
function validateApiKey(apiKey, status) {
    const apiKeyValue = 'SSBHP5J09Y60VBJT0JH21NKP6LJMSPTN'
  
  //console.log("apiKey function: " + apiKey);
  // Compare API key
  status = 200;
  data = {status: status, message: "authorized"};
  if (apiKey !== apiKeyValue) {  
    //console.log("Unauthorized", apiKeyValue);
    status = 401;
    data = {status: status, message: "Unauthorized"};
   
  }
  return data;
  // Continue with the rest of the code
  // ...
}

module.exports = {
  validateApiKey
};
