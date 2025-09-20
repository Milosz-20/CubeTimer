export class AuthUtils {
  static expiry(minutes: number): string {
    return `${minutes}m`;
  }
  static msFromMinutes(minutes: number): number {
    return minutes * 60 * 1000;
  }
  static msFromDays(days: number): number {
    return days * 24 * 60 * 60 * 1000;
  }
}
