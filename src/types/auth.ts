export type AuthMode = "signin" | "signup";

export interface GoogleAuthButtonProps {
  collegeDomain?: string;
  className?: string;
  onSuccessRedirect?: (url: string) => void;
}

export interface CredentialsFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthBlockProps {
  defaultMode?: AuthMode;
  collegeDomain?: string;
  returnUrl?: string;
}
