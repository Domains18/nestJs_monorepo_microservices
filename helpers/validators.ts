import crypto from "crypto";
const secret = process.env.SECRET
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function generateRandomString(): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString("hex"));
    });
  });
}

export  function authentication(salt: string, password: string) {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex');
}
