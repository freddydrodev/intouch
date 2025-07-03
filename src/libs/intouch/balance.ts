import DigestFetch from "digest-fetch";

/**
 * Class representing the balance functionality for Intouch payment service
 * @class IntouchBalance
 */
export class IntouchBalance {
  private readonly agentCode: string;
  private readonly partnerId: string;
  private readonly loginApi: string;
  private readonly passwordApi: string;
  private readonly digest: DigestFetch;

  /**
   * Creates an instance of IntouchBalance
   * @param {string} agentCode - The agent code from Intouch
   * @param {string} partnerId - The partner ID from Intouch
   * @param {string} loginApi - The login API credentials
   * @param {string} passwordApi - The password API credentials
   */
  constructor(
    agentCode: string,
    partnerId: string,
    loginApi: string,
    passwordApi: string,
    digest: DigestFetch
  ) {
    this.agentCode = agentCode;
    this.partnerId = partnerId;
    this.loginApi = loginApi;
    this.passwordApi = passwordApi;
    this.digest = digest;
  }

  /**
   * Retrieves the current balance from Intouch
   * @returns {Promise<any>} A promise that resolves to the balance response
   * @throws {Error} If the API request fails
   */
  async get() {
    const result = await this.digest.fetch(
      `https://apidist.gutouch.net/apidist/sec/${this.agentCode}/get_balance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partner_id: this.partnerId,
          login_api: this.loginApi,
          password_api: this.passwordApi,
        }),
      }
    );

    const response = await result.json();
    return response;
  }
}
