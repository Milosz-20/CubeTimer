export class AuthUtils {
  static getJwtExpiryString(minutes: number): string {
    return `${minutes}m`;
  }
  static getJwtExpiryMs(minutes: number): number {
    return minutes * 60 * 1000;
  }
}
