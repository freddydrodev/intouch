import DigestFetch from "digest-fetch";

import { IntouchBalance } from "./balance";
import { IntouchCashout } from "./cashout";
import { IntouchCashin } from "./cashin";

/**
 * Configuration interface for Intouch service
 */
export interface IntouchConfig {
  agentCode: string;
  partnerId: string;
  partnerName: string;
  loginApi: string;
  passwordApi: string;
  username: string;
  password: string;
}

/**
 * Main class for interacting with the Intouch payment service
 * @class Intouch
 */
export class Intouch {
  public readonly balance: IntouchBalance;
  public readonly cashout: IntouchCashout;
  public readonly cashin: IntouchCashin;
  private readonly digest: DigestFetch;

  /**
   * Creates an instance of Intouch
   *
   * You can initialize the client in three ways:
   *
   * 1. With environment variables (recommended):
   *    const intouch = new Intouch();
   *
   * 2. With a configuration object:
   *    const intouch = new Intouch({
   *      agentCode: "your_agent_code",
   *      partnerId: "your_partner_id",
   *      partnerName: "your_partner_name",
   *      loginApi: "your_login_api",
   *      passwordApi: "your_password_api",
   *      username: "your_username",
   *      password: "your_password"
   *    });
   *
   * 3. With individual parameters:
   *    const intouch = new Intouch(
   *      "agent_code", "partner_id", "partner_name", "login_api", "password_api", "username", "password"
   *    );
   *
   * @param {IntouchConfig | string} [configOrAgentCode] - Configuration object, agent code, or undefined for env vars
   * @param {string} [partnerId] - The partner ID (when using individual parameters)
   * @param {string} [partnerName] - The partner name (when using individual parameters)
   * @param {string} [loginApi] - The login API credentials (when using individual parameters)
   * @param {string} [passwordApi] - The password API credentials (when using individual parameters)
   * @param {string} [username] - The username for digest authentication (when using individual parameters)
   * @param {string} [password] - The password for digest authentication (when using individual parameters)
   */
  constructor(
    configOrAgentCode?: IntouchConfig | string,
    partnerId?: string,
    partnerName?: string,
    loginApi?: string,
    passwordApi?: string,
    username?: string,
    password?: string
  ) {
    let agentCode: string;
    let finalPartnerId: string;
    let finalPartnerName: string;
    let finalLoginApi: string;
    let finalPasswordApi: string;
    let finalUsername: string;
    let finalPassword: string;

    // Handle different initialization methods
    if (configOrAgentCode === undefined) {
      // Method 1: Use environment variables (recommended)
      agentCode = process.env.INTOUCH_AGENT_CODE || "";
      finalPartnerId = process.env.INTOUCH_PARTNER_ID || "";
      finalPartnerName = process.env.INTOUCH_PARTNER_NAME || "";
      finalLoginApi = process.env.INTOUCH_LOGIN_API || "";
      finalPasswordApi = process.env.INTOUCH_PASSWORD_API || "";
      finalUsername = process.env.INTOUCH_CI_USERNAME || "";
      finalPassword = process.env.INTOUCH_CI_PASSWORD || "";
    } else if (typeof configOrAgentCode === "object") {
      // Method 2: Use configuration object
      agentCode = configOrAgentCode.agentCode;
      finalPartnerId = configOrAgentCode.partnerId;
      finalPartnerName = configOrAgentCode.partnerName;
      finalLoginApi = configOrAgentCode.loginApi;
      finalPasswordApi = configOrAgentCode.passwordApi;
      finalUsername = configOrAgentCode.username;
      finalPassword = configOrAgentCode.password;
    } else {
      // Method 3: Use individual parameters
      agentCode = configOrAgentCode;
      finalPartnerId = partnerId || "";
      finalPartnerName = partnerName || "";
      finalLoginApi = loginApi || "";
      finalPasswordApi = passwordApi || "";
      finalUsername = username || "";
      finalPassword = password || "";
    }

    // Validate that required parameters are provided
    if (!agentCode) {
      throw new Error(
        "Agent code is required. Please provide it via environment variable INTOUCH_AGENT_CODE or constructor parameter."
      );
    }
    if (!finalPartnerId) {
      throw new Error(
        "Partner ID is required. Please provide it via environment variable INTOUCH_PARTNER_ID or constructor parameter."
      );
    }
    if (!finalPartnerName) {
      throw new Error(
        "Partner name is required. Please provide it via environment variable INTOUCH_PARTNER_NAME or constructor parameter."
      );
    }
    if (!finalLoginApi) {
      throw new Error(
        "Login API is required. Please provide it via environment variable INTOUCH_LOGIN_API or constructor parameter."
      );
    }
    if (!finalPasswordApi) {
      throw new Error(
        "Password API is required. Please provide it via environment variable INTOUCH_PASSWORD_API or constructor parameter."
      );
    }
    if (!finalUsername) {
      throw new Error(
        "Username is required. Please provide it via environment variable INTOUCH_CI_USERNAME or constructor parameter."
      );
    }
    if (!finalPassword) {
      throw new Error(
        "Password is required. Please provide it via environment variable INTOUCH_CI_PASSWORD or constructor parameter."
      );
    }

    const digest = new DigestFetch(finalUsername, finalPassword, {
      basic: true,
    });

    this.digest = digest;

    this.balance = new IntouchBalance(
      agentCode,
      finalPartnerId,
      finalLoginApi,
      finalPasswordApi,
      digest
    );
    this.cashout = new IntouchCashout(
      agentCode,
      finalLoginApi,
      finalPasswordApi,
      digest,
      finalPartnerName
    );
    this.cashin = new IntouchCashin(
      agentCode,
      finalPartnerId,
      finalLoginApi,
      finalPasswordApi,
      digest
    );
  }
}

// const intouch = new Intouch();
// intouch.balance.get() // to get balance
// intouch.cashout.OM_CI()
// intouch.cashout.MOOV_CI()
// intouch.cashout.MTN_CI()
// intouch.cashout.WAVE_CI()
// intouch.cashin.OM_CI()
// intouch.cashin.MOOV_CI()
// intouch.cashin.MTN_CI()
// intouch.cashin.WAVE_CI()
