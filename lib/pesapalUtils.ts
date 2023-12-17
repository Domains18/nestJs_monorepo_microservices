import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export class PesaPalGateway {
  consumer_key: string;
  consumer_secret: string;
  access_token_url: string;
  payment_url: string;
  register_ipn_url: string;
  frontend_url: string;

  constructor() {
    this.consumer_key = process.env.PESAPAL_CONSUMER_KEY || "";
    this.consumer_secret = process.env.PESAPAL_CONSUMER_SECRET || "";
    this.access_token_url = process.env.PESAPAL_ACCESS_TOKEN_URL || "";
    this.payment_url = process.env.PESAPAL_PAYMENT_URL || "";
    this.register_ipn_url = process.env.PESAPAL_REGISTER_IPN_URL || "";
    this.frontend_url = process.env.FRONT_END_URL || "";
  }

  async getAuthorizationToken() {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const payload = {
      consumer_key: this.consumer_key,
      consumer_secret: this.consumer_secret,
    };
    console.log(payload);

    try {
      const res = await axios.post(this.access_token_url, payload, { headers });
      const token = res.data.token;
      console.log(`Token: ${token}`);
      return token;
    } catch (err) {
      console.log(`Error ${err}`);
      throw new Error("An error occurred");
    }
  }

  async get_notification_id() {
    const token = await this.getAuthorizationToken();

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const payload = {
      url: this.frontend_url, // Your IPN URL
      ipn_notification_type: "GET",
    };

    try {
      const res = await axios.post(this.register_ipn_url, payload, { headers });
      const notification_id = res.data.ipn_id;
      return notification_id;
    } catch (err) {
      console.log(`Error ${err}`);
      throw new Error("An error occurred");
    }
  }

  async makePayment(
    phonenumber: string,
    email: string,
    amount: number,
    currency: string,
   
  ) {
    const token = await this.getAuthorizationToken();

    console.log(`Token: ${token}`);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const data = {
      id: uuidv4(), // Use a proper unique identifier
      currency: currency,
      amount: amount,
      description: "Payment to SokoIn",
      callback_url: this.frontend_url,
      notification_id: await this.get_notification_id(),
      billing_address: {
        phone_number: phonenumber,
        email_address: email,
        country_code: "KE",
        first_name: "John",
        middle_name: "Doe",
        last_name: "Doe",
        line_1: "SokoIn",
        line_2: "SokoIn",
        city: "SokoIn",
        state: "SokoIn",
        postal_code: "SokoIn",
        zip_code: "SokoIn",
      },
    };

    try {
      const res = await axios.post(this.payment_url, data, { headers });
      return res.data;
    } catch (error) {
      throw new Error("An error occurred");
    }
  }
}
