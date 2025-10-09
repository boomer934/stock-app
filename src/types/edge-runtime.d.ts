// Type declarations for Next.js edge runtime modules

declare module 'next/dist/compiled/@edge-runtime/cookies' {
  export class RequestCookies {
    get(name: string): { value: string } | undefined;
    getAll(): Array<{ name: string; value: string }>;
    has(name: string): boolean;
  }
  
  export class ResponseCookies {
    set(name: string, value: string, options?: any): void;
    delete(name: string): void;
    get(name: string): { value: string } | undefined;
  }
}
