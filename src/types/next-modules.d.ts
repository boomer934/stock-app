// Additional Next.js type declarations for modules that might be missing

declare module 'next/server' {
  export interface NextRequest extends Request {
    cookies: {
      get(name: string): { value: string } | undefined;
      getAll(): Array<{ name: string; value: string }>;
    };
    nextUrl: URL;
  }
  
  export class NextResponse extends Response {
    static next(): NextResponse;
    static redirect(url: string | URL): NextResponse;
    cookies: {
      set(name: string, value: string, options?: any): void;
      delete(name: string): void;
      get(name: string): { value: string } | undefined;
    };
  }
}

declare module 'next/headers' {
  export function cookies(): Promise<{
    get(name: string): { value: string } | undefined;
    getAll(): Array<{ name: string; value: string }>;
  }>;
  
  export function headers(): Promise<Headers>;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
    refresh: () => void;
    prefetch: (url: string) => Promise<void>;
  };
  
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
  export function redirect(url: string): never;
}

declare module 'next/link' {
  import { ComponentProps, ReactElement } from 'react';
  
  interface LinkProps extends ComponentProps<'a'> {
    href: string;
    replace?: boolean;
    scroll?: boolean;
    prefetch?: boolean;
  }
  
  export default function Link(props: LinkProps): ReactElement;
}

// Lucide React should include its own types, but adding this just in case
declare module 'lucide-react' {
  export interface IconProps {
    size?: number | string;
    color?: string;
    className?: string;
  }
  
  export const Home: (props: IconProps) => ReactElement;
  export const User: (props: IconProps) => ReactElement;
  export const Settings: (props: IconProps) => ReactElement;
  // Add other icons as needed
}
