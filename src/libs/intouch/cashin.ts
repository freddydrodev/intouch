import { generateIntouchURL } from "@/libs/generate-intouch-url";
import {
  CashinResponseData,
  MOOV_CI_CashinData,
  MTN_CI_CashinData,
  OM_CI_CashinData,
  WAVE_CI_CashinData,
} from "@/types/cashin";
import {
  moovCICashinDataSchema,
  mtnCICashinDataSchema,
  omCICashinDataSchema,
  waveCICashinDataSchema,
  cashinResponseDataSchema,
} from "@/schemas/cashin";
import DigestFetch from "digest-fetch";

/**
 * Class representing the cashin functionality for Intouch payment service
 * @class IntouchCashin
 */
export class IntouchCashin {
  private readonly agentCode: string;
  private readonly partnerId: string;
  private readonly loginApi: string;
  private readonly passwordApi: string;
  private readonly digest: DigestFetch;
  /**
   * Creates an instance of IntouchCashin
   * @param {string} agentCode - The agent code from Intouch
   * @param {string} partnerId - The partner ID
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
   * Process an Orange Money cashin payment in Côte d'Ivoire
   * @param {OM_CI_CashinData} payload - The payment data
   * @param {string} payload.service_id - Service identifier for Orange Money CI
   * @param {string} payload.recipient_phone_number - Phone number of the recipient
   * @param {number} payload.amount - Positive amount for the transaction
   * @param {string} payload.partner_id - Partner identifier
   * @param {string} payload.partner_transaction_id - Partner's transaction identifier
   * @param {string} payload.login_api - API login credentials
   * @param {string} payload.password_api - API password credentials
   * @param {string} payload.call_back_url - Valid URL for callback notifications
   * @returns {Promise<CashinResponseData>} A promise that resolves to the payment response
   * @throws {Error} If the payment request fails or validation fails
   *
   * @example
   * ```typescript
   * const response = await intouch.cashin.OM_CI({
   *   service_id: "CASHINOMCIPART",
   *   recipient_phone_number: "76537327",
   *   amount: 500,
   *   partner_id: "CI8724",
   *   partner_transaction_id: "CELLB2CB11F15105",
   *   login_api: "0708517414",
   *   password_api: "XXXX",
   *   call_back_url: "https://gutouch.com"
   * });
   * ```
   */
  async OM_CI(payload: OM_CI_CashinData): Promise<CashinResponseData> {
    // Validate payload
    const validatedPayload = await omCICashinDataSchema.parseAsync(payload);

    const result = await this.digest.fetch(
      generateIntouchURL(this.agentCode, this.loginApi, this.passwordApi),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedPayload),
      }
    );

    const response = await result.json();

    console.warn("RESPONSE/OM_CI", response);

    // Validate response
    return await cashinResponseDataSchema.parseAsync(response);
  }

  /**
   * Process a MOOV cashin payment in Côte d'Ivoire
   * @param {MOOV_CI_CashinData} payload - The payment data
   * @param {string} payload.service_id - Service identifier for MOOV CI
   * @param {string} payload.recipient_phone_number - Phone number of the recipient
   * @param {number} payload.amount - Positive amount for the transaction
   * @param {string} payload.partner_id - Partner identifier
   * @param {string} payload.partner_transaction_id - Partner's transaction identifier
   * @param {string} payload.login_api - API login credentials
   * @param {string} payload.password_api - API password credentials
   * @param {string} payload.call_back_url - Valid URL for callback notifications
   * @returns {Promise<CashinResponseData>} A promise that resolves to the payment response
   * @throws {Error} If the payment request fails or validation fails
   *
   * @example
   * ```typescript
   * const response = await intouch.cashin.MOOV_CI({
   *   service_id: "CASHINMOOVPART",
   *   recipient_phone_number: "76537327",
   *   amount: 500,
   *   partner_id: "CI8724",
   *   partner_transaction_id: "CELLB2CB11F15105",
   *   login_api: "0708517414",
   *   password_api: "XXXX",
   *   call_back_url: "https://gutouch.com"
   * });
   * ```
   */
  async MOOV_CI(payload: MOOV_CI_CashinData): Promise<CashinResponseData> {
    // Validate payload
    const validatedPayload = await moovCICashinDataSchema.parseAsync(payload);

    const result = await this.digest.fetch(
      generateIntouchURL(this.agentCode, this.loginApi, this.passwordApi),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedPayload),
      }
    );

    const response = await result.json();

    console.warn("RESPONSE/MOOV_CI", response);

    // Validate response
    return await cashinResponseDataSchema.parseAsync(response);
  }

  /**
   * Process an MTN cashin payment in Côte d'Ivoire
   * @param {MTN_CI_CashinData} payload - The payment data
   * @param {string} payload.service_id - Service identifier for MTN CI
   * @param {string} payload.recipient_phone_number - Phone number of the recipient
   * @param {number} payload.amount - Positive amount for the transaction
   * @param {string} payload.partner_id - Partner identifier
   * @param {string} payload.partner_transaction_id - Partner's transaction identifier
   * @param {string} payload.login_api - API login credentials
   * @param {string} payload.password_api - API password credentials
   * @param {string} payload.call_back_url - Valid URL for callback notifications
   * @returns {Promise<CashinResponseData>} A promise that resolves to the payment response
   * @throws {Error} If the payment request fails or validation fails
   *
   * @example
   * ```typescript
   * const response = await intouch.cashin.MTN_CI({
   *   service_id: "CASHINMTNPART",
   *   recipient_phone_number: "76537327",
   *   amount: 500,
   *   partner_id: "CI8724",
   *   partner_transaction_id: "CELLB2CB11F15105",
   *   login_api: "0708517414",
   *   password_api: "XXXX",
   *   call_back_url: "https://gutouch.com"
   * });
   * ```
   */
  async MTN_CI(payload: MTN_CI_CashinData): Promise<CashinResponseData> {
    // Validate payload
    const validatedPayload = await mtnCICashinDataSchema.parseAsync(payload);

    const result = await this.digest.fetch(
      generateIntouchURL(this.agentCode, this.loginApi, this.passwordApi),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedPayload),
      }
    );

    const response = await result.json();

    console.warn("RESPONSE/MTN_CI", response);

    // Validate response
    return await cashinResponseDataSchema.parseAsync(response);
  }

  /**
   * Process a WAVE cashin payment in Côte d'Ivoire
   * @param {WAVE_CI_CashinData} payload - The payment data
   * @param {string} payload.service_id - Service identifier for WAVE CI
   * @param {string} payload.recipient_phone_number - Phone number of the recipient
   * @param {number} payload.amount - Positive amount for the transaction
   * @param {string} payload.partner_id - Partner identifier
   * @param {string} payload.partner_transaction_id - Partner's transaction identifier
   * @param {string} payload.login_api - API login credentials
   * @param {string} payload.password_api - API password credentials
   * @param {string} payload.call_back_url - Valid URL for callback notifications
   * @returns {Promise<CashinResponseData>} A promise that resolves to the payment response
   * @throws {Error} If the payment request fails or validation fails
   *
   * @example
   * ```typescript
   * const response = await intouch.cashin.WAVE_CI({
   *   service_id: "CI_CASHIN_WAVE_PART",
   *   recipient_phone_number: "76537327",
   *   amount: 500,
   *   partner_id: "CI8724",
   *   partner_transaction_id: "CELLB2CB11F15105",
   *   login_api: "0708517414",
   *   password_api: "XXXX",
   *   call_back_url: "https://gutouch.com"
   * });
   * ```
   */
  async WAVE_CI(payload: WAVE_CI_CashinData): Promise<CashinResponseData> {
    // Validate payload
    const validatedPayload = await waveCICashinDataSchema.parseAsync(payload);

    const result = await this.digest.fetch(
      generateIntouchURL(this.agentCode, this.loginApi, this.passwordApi),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedPayload),
      }
    );

    const response = await result.json();

    console.warn("RESPONSE/WAVE_CI", response);

    // Validate response
    return await cashinResponseDataSchema.parseAsync(response);
  }
}
