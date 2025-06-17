export const generateIntouchURL = (
  agentCode = process.env.INTOUCH_CODE_AGENT,
  loginAgent = process.env.INTOUCH_LOGIN_API_AGENT,
  passwordAgent = process.env.INTOUCH_PASSWORD_API_AGENT
) => {
  return `https://api.gutouch.com/dist/api/touchpayapi/v1/${agentCode}/transaction?loginAgent=${loginAgent}&passwordAgent=${passwordAgent}`;
};
