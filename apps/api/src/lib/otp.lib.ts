export class OtpLib {
  static generateOtp() {
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10); // de 0 a 9
    }
    return otp;
  }
}
