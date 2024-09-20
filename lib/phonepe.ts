import axios from 'axios';
import crypto from 'crypto';

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID!;
const SALT_KEY = process.env.PHONEPE_SALT_KEY!;
const SALT_INDEX = 1;
const PHONEPE_API_URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';

const generateTransactionId = () => {
  return 'MT' + Date.now() + Math.random().toString(36).substring(2, 15);
};

const generateChecksum = (payload: any, saltKey: string) => {
  const payloadString = JSON.stringify(payload);
  const dataToHash = payloadString + '/pg/v1/pay' + saltKey;
  return crypto.createHash('sha256').update(dataToHash).digest('hex') + '###' + SALT_INDEX;
};

export async function initiatePayment({ amount, name, email, phone }: { amount: number, name: string, email: string, phone: string }) {
  const merchantTransactionId = generateTransactionId();

  const payload = {
    merchantId: MERCHANT_ID,
    merchantTransactionId: merchantTransactionId,
    merchantUserId: 'MUID' + Date.now(),
    amount: amount * 100, // Convert to paise
    redirectUrl: `${process.env.BASE_URL}/api/payment-redirect?transactionId=${merchantTransactionId}`,
    redirectMode: 'POST',
    callbackUrl: `${process.env.BASE_URL}/api/payment-callback`,
    mobileNumber: phone,
    paymentInstrument: {
      type: 'PAY_PAGE'
    }
  };

  const checksum = generateChecksum(payload, SALT_KEY);

  try {
    const response = await axios.post(PHONEPE_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      }
    });

    if (response.data.success) {
      return {
        success: true,
        redirectUrl: response.data.data.instrumentResponse.redirectInfo.url
      };
    } else {
      return {
        success: false,
        message: 'Failed to initiate payment'
      };
    }
  } catch (error) {
    throw error;
  }
}