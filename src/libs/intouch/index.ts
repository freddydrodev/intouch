import DigestFetch from "digest-fetch";

import { IntouchBalance } from "./balance";
import { IntouchCashout } from "./cashout";
import { IntouchCashin } from "./cashin";

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
   * @param {string} agentCode - The agent code from Intouch
   * @param {string} partnerId - The partner ID
   * @param {string} loginApi - The login API credentials
   * @param {string} passwordApi - The password API credentials
   */
  constructor(
    private readonly agentCode: string = process.env.INTOUCH_AGENT_CODE ?? "",
    private readonly partnerId: string = process.env.INTOUCH_PARTNER_ID ?? "",
    private readonly loginApi: string = process.env.INTOUCH_LOGIN_API ?? "",
    private readonly passwordApi: string = process.env.INTOUCH_PASSWORD_API ??
      "",
    private readonly username: string = process.env.INTOUCH_CI_USERNAME ?? "",
    private readonly password: string = process.env.INTOUCH_CI_PASSWORD ?? ""
  ) {
    this.digest = new DigestFetch(this.username, this.password);

    this.balance = new IntouchBalance(
      this.agentCode,
      this.partnerId,
      this.loginApi,
      this.passwordApi,
      this.digest
    );
    this.cashout = new IntouchCashout(
      this.agentCode,
      this.loginApi,
      this.passwordApi,
      this.digest
    );
    this.cashin = new IntouchCashin(
      this.agentCode,
      this.partnerId,
      this.loginApi,
      this.passwordApi,
      this.digest
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
