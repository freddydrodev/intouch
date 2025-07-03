export const generateIntouchURL = (
  agentCode: string,
  loginAgent: string,
  passwordAgent: string
) => {
  return `https://api.gutouch.com/dist/api/touchpayapi/v1/${agentCode}/transaction?loginAgent=${loginAgent}&passwordAgent=${passwordAgent}`;
};
