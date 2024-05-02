export {};

declare global {
  namespace Express {
    interface User extends JWTPayload {
      [key: string]: any;
    }
  }
}
