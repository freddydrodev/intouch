import { generateCashOutIntouchURL } from "@/libs/generate-intouch-url";
import {
  CashoutResponseData,
  MOOV_CI_CashoutData,
  MTN_CI_CashoutData,
  OM_CI_CashoutData,
  WAVE_CI_CashoutData,
} from "@/types/cashout";
import {
  moovCICashoutDataSchema,
  mtnCICashoutDataSchema,
  omCICashoutDataSchema,
  waveCICashoutDataSchema,
  cashoutResponseDataSchema,
} from "@/schemas/cashout";
import DigestFetch from "digest-fetch";

/**
 * Class representing the cashout functionality for Intouch payment service
 * @class IntouchCashout
 */
export class IntouchCashout {
  private readonly agentCode: string;
  private readonly loginAgent: string;
  private readonly passwordAgent: string;
  private readonly digest: DigestFetch;
  private readonly partnerName: string;

  /**
   * Creates an instance of IntouchCashout
   * @param {string} agentCode - The agent code from Intouch
   * @param {string} loginAgent - The login agent credentials
   * @param {string} passwordAgent - The password agent credentials
   * @param {string} partnerName - The partner name
   */
  constructor(
    agentCode: string,
    loginAgent: string,
    passwordAgent: string,
    digest: DigestFetch,
    partnerName: string
  ) {
    this.agentCode = agentCode;
    this.loginAgent = loginAgent;
    this.passwordAgent = passwordAgent;
    this.digest = digest;
    this.partnerName = partnerName;
  }

  /**
   * Process an Orange Money cashout payment in Côte d'Ivoire
   * @param {OM_CI_CashoutData} payload - The payment data
   * @param {string} payload.idFromClient - Unique identifier from the client
   * @param {number} payload.amount - Positive amount for the transaction
   * @param {string} payload.callback - Valid URL for callback notifications
   * @param {string} payload.recipientNumber - Phone number of the recipient
   * @param {Object} payload.additionnalInfos - Additional information for the transaction
   * @param {string} payload.additionnalInfos.recipientEmail - Email address of the recipient
   * @param {string} payload.additionnalInfos.recipientFirstName - First name of the recipient
   * @param {string} payload.additionnalInfos.recipientLastName - Last name of the recipient
   * @param {string} payload.additionnalInfos.destinataire - Destination information
   * @param {string} payload.additionnalInfos.otp - One-time password for the transaction
   * @param {"PAIEMENTMARCHANDOMPAYCIDIRECT"} payload.serviceCode - Service code for Orange Money CI
   * @returns {Promise<CashoutResponseData>} A promise that resolves to the payment response
   * @throws {Error} If the payment request fails or validation fails
   *
   * @example
   * ```typescript
   * const response = await intouch.cashout.OM_CI({
   *   idFromClient: "4785411421145411645654654",
   *   additionnalInfos: {
   *     recipientEmail: "tapha.seck@hubsocial.org",
   *     recipientFirstName: "Moustapha",
   *     recipientLastName: "SECK",
   *     destinataire: "0708517414",
   *     otp: "5278"
   *   },
   *   amount: 100,
   *   callback: "https://e870adf3.ngrok.io",
   *   recipientNumber: "0708517414",
   *   serviceCode: "PAIEMENTMARCHANDOMPAYCIDIRECT"
   * });
   * ```
   */
  async OM_CI(data: OM_CI_CashoutData): Promise<CashoutResponseData> {
    const payload = {
      ...data,
      serviceCode: "PAIEMENTMARCHANDOMPAYCIDIRECT",
    };

    // Validate payload
    const validatedPayload = await omCICashoutDataSchema.parseAsync(payload);

    const result = await this.digest.fetch(
      generateCashOutIntouchURL(
        this.agentCode,
        this.loginAgent,
        this.passwordAgent
      ),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedPayload),
      }
    );

    const response = await result.json();

    console.warn("INTOUCH_JS/CASHOUT/OM_CI", response);

    // Validate response
    return await cashoutResponseDataSchema.parseAsync(response);
  }

  /**
   * Process a MOOV cashout payment in Côte d'Ivoire
   * @param {MOOV_CI_CashoutData} payload - The payment data
   * @param {string} payload.idFromClient - Unique identifier from the client
   * @param {number} payload.amount - Positive amount for the transaction
   * @param {string} payload.callback - Valid URL for callback notifications
   * @param {string} payload.recipientNumber - Phone number of the recipient
   * @param {Object} payload.additionnalInfos - Additional information for the transaction
   * @param {string} payload.additionnalInfos.recipientEmail - Email address of the recipient
   * @param {string} payload.additionnalInfos.recipientFirstName - First name of the recipient
   * @param {string} payload.additionnalInfos.recipientLastName - Last name of the recipient
   * @param {string} payload.additionnalInfos.destinataire - Destination information
   * @param {"PAIEMENTMARCHAND_MOOV_CI"} payload.serviceCode - Service code for MOOV CI
   * @returns {Promise<CashoutResponseData>} A promise that resolves to the payment response
   * @throws {Error} If the payment request fails or validation fails
   *
   * @example
   * ```typescript
   * const response = await intouch.cashout.MOOV_CI({
   *   idFromClient: "4785411421145411645654654",
   *   additionnalInfos: {
   *     recipientEmail: "tapha.seck@hubsocial.org",
   *     recipientFirstName: "Moustapha",
   *     recipientLastName: "SECK",
   *     destinataire: "01040828"
   *   },
   *   amount: 150,
   *   callback: "https://e870adf3.ngrok.io",
   *   recipientNumber: "01040828",
   *   serviceCode: "PAIEMENTMARCHAND_MOOV_CI"
   * });
   * ```
   */
  async MOOV_CI(data: MOOV_CI_CashoutData): Promise<CashoutResponseData> {
    const payload = {
      ...data,
      serviceCode: "PAIEMENTMARCHAND_MOOV_CI",
    };

    // Validate payload
    const validatedPayload = await moovCICashoutDataSchema.parseAsync(payload);

    const result = await this.digest.fetch(
      generateCashOutIntouchURL(
        this.agentCode,
        this.loginAgent,
        this.passwordAgent
      ),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedPayload),
      }
    );

    const response = await result.json();

    console.warn("INTOUCH_JS/CASHOUT/MOOV_CI", response);

    // Validate response
    return await cashoutResponseDataSchema.parseAsync(response);
  }

  /**
   * Process an MTN cashout payment in Côte d'Ivoire
   * @param {MTN_CI_CashoutData} payload - The payment data
   * @param {string} payload.idFromClient - Unique identifier from the client
   * @param {number} payload.amount - Positive amount for the transaction
   * @param {string} payload.callback - Valid URL for callback notifications
   * @param {string} payload.recipientNumber - Phone number of the recipient
   * @param {Object} payload.additionnalInfos - Additional information for the transaction
   * @param {string} payload.additionnalInfos.recipientEmail - Email address of the recipient
   * @param {string} payload.additionnalInfos.recipientFirstName - First name of the recipient
   * @param {string} payload.additionnalInfos.recipientLastName - Last name of the recipient
   * @param {string} payload.additionnalInfos.destinataire - Destination information
   * @param {"PAIEMENTMARCHAND_MTN_CI"} payload.serviceCode - Service code for MTN CI
   * @returns {Promise<CashoutResponseData>} A promise that resolves to the payment response
   * @throws {Error} If the payment request fails or validation fails
   *
   * @example
   * ```typescript
   * const response = await intouch.cashout.MTN_CI({
   *   idFromClient: "47854114116451100654654",
   *   additionnalInfos: {
   *     recipientEmail: "x@y.sn",
   *     recipientFirstName: "Baye Fall",
   *     recipientLastName: "SECK",
   *     destinataire: "0575494589"
   *   },
   *   amount: 100,
   *   callback: "https://e870adf3.ngrok.io",
   *   recipientNumber: "0575494589",
   *   serviceCode: "PAIEMENTMARCHAND_MTN_CI"
   * });
   * ```
   */
  async MTN_CI(data: MTN_CI_CashoutData): Promise<CashoutResponseData> {
    const payload = {
      ...data,
      serviceCode: "PAIEMENTMARCHAND_MTN_CI",
    };

    // Validate payload
    const validatedPayload = await mtnCICashoutDataSchema.parseAsync(payload);

    const result = await this.digest.fetch(
      generateCashOutIntouchURL(
        this.agentCode,
        this.loginAgent,
        this.passwordAgent
      ),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedPayload),
      }
    );

    const response = await result.json();

    console.warn("INTOUCH_JS/CASHOUT/MTN_CI", response);

    // Validate response
    return await cashoutResponseDataSchema.parseAsync(response);
  }

  /**
   * Process a WAVE cashout payment in Côte d'Ivoire
   * @param {WAVE_CI_CashoutData} payload - The payment data
   * @param {string} payload.idFromClient - Unique identifier from the client
   * @param {number} payload.amount - Positive amount for the transaction
   * @param {string} payload.callback - Valid URL for callback notifications
   * @param {string} payload.recipientNumber - Phone number of the recipient
   * @param {Object} payload.additionnalInfos - Additional information for the transaction
   * @param {string} payload.additionnalInfos.recipientEmail - Email address of the recipient
   * @param {string} payload.additionnalInfos.recipientFirstName - First name of the recipient
   * @param {string} payload.additionnalInfos.recipientLastName - Last name of the recipient
   * @param {string} payload.additionnalInfos.destinataire - Destination information
   * @param {string} payload.additionnalInfos.partner_name - Name of the partner structure
   * @param {string} payload.additionnalInfos.return_url - URL to redirect on success
   * @param {string} payload.additionnalInfos.cancel_url - URL to redirect on failure
   * @param {"CI_PAIEMENTWAVE_TP"} payload.serviceCode - Service code for WAVE CI
   * @returns {Promise<CashoutResponseData>} A promise that resolves to the payment response
   * @throws {Error} If the payment request fails or validation fails
   *
   * @example
   * ```typescript
   * const response = await intouch.cashout.WAVE_CI({
   *   idFromClient: "1651089293",
   *   additionnalInfos: {
   *     recipientEmail: "tester@gmail.com",
   *     recipientFirstName: "Testeur",
   *     recipientLastName: "lastname",
   *     destinataire: "770000000",
   *     partner_name: "Le nom de votre structure",
   *     return_url: "https://successurl.com",
   *     cancel_url: "https://failedurl.com"
   *   },
   *   amount: 100,
   *   callback: "https://callbackurl.com",
   *   recipientNumber: "XXXXXXXXXXX",
   *   serviceCode: "CI_PAIEMENTWAVE_TP"
   * });
   * ```
   */
  async WAVE_CI(data: WAVE_CI_CashoutData): Promise<CashoutResponseData> {
    const payload = {
      ...data,
      additionnalInfos: {
        ...data.additionnalInfos,
        partner_name: this.partnerName,
        return_url: data.callback ?? data.additionnalInfos.return_url,
        cancel_url: data.callback ?? data.additionnalInfos.cancel_url,
      },
      serviceCode: "CI_PAIEMENTWAVE_TP",
    };

    // Validate payload
    const validatedPayload = await waveCICashoutDataSchema.parseAsync(payload);

    const result = await this.digest.fetch(
      generateCashOutIntouchURL(
        this.agentCode,
        this.loginAgent,
        this.passwordAgent
      ),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedPayload),
      }
    );

    const response = await result.json();

    console.warn("INTOUCH_JS/CASHOUT/WAVE_CI", response);

    // Validate response
    return await cashoutResponseDataSchema.parseAsync(response);
  }
}
