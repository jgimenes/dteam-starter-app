import * as bcrypt from 'bcrypt';

export class EncryptLib {
  static getHash(otp: string): string {
    const salt = 10;
    const hashedOtp = bcrypt.hashSync(otp, salt);
    return hashedOtp;
  }
}
