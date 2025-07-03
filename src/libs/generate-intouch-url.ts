export const generateCashOutIntouchURL = (
  agentCode: string,
  loginAgent: string,
  passwordAgent: string
) => {
  return `https://api.gutouch.com/dist/api/touchpayapi/v1/${agentCode}/transaction?loginAgent=${loginAgent}&passwordAgent=${passwordAgent}`;
};

export const generateCashInIntouchURL = (
  agentCode: string,
  loginApi: string,
  passwordApi: string
) => {
  return `https://apidist.gutouch.net/apidist/sec/${agentCode}/cashin`;
  // return `https://apidist.gutouch.net/apidist/sec/touchpayapi/${agentCode}/transaction?loginAgent=${loginApi}&passwordAgent=${passwordApi}`;
};

export const generateBalanceIntouchURL = (agentCode: string) => {
  return `https://apidist.gutouch.net/apidist/sec/${agentCode}/balance`;
};
