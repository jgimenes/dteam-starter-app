import * as bcrypt from 'bcrypt';

export class EncryptLib {
  static getHash(otp: string): string {
    const salt = 10;
    const hashedOtp = bcrypt.hashSync(otp, salt);
    return hashedOtp;
  }

  static compareHash(otp: string, hashedOtp: string): boolean {
    return bcrypt.compareSync(otp, hashedOtp);
  }
}
