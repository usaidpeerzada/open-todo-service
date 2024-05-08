import { EmailService } from "auth-ez";

export type RouteNames = {
  loginWithEmailRoute?: string;
  loginWithUsernameRoute?: string;
  signupRoute?: string;
  forgotPasswordRoute?: string;
  resetPasswordRoute?: string;
  logoutRoute?: string;
};

export type EmailOptions = {
  enableEmail?: boolean;
  emailType?: string;
  emailSdk?: any;
  forgotPasswordSubject: string;
  forgotPasswordBody: string;
  verificationMailSubject: string;
  verificationMailBody: string;
  emailService: EmailService;
};

export type Config = {
  User;
  enableLogs?: boolean;
  hashPassword?;
  comparePassword?: typeof Function;
  generateToken?;
  //   tokenOptions?: {
  //     expiresIn?: string;
  //   };
  routeNames?: {
    loginWithEmailRoute?: string;
    loginWithUsernameRoute?: string;
    signupRoute?: string;
    forgotPasswordRoute?: string;
    resetPasswordRoute?: string;
    logoutRoute?: string;
  };
  emailOptions?: {
    enableEmail: boolean;
    emailType: string;
    emailSdk: any;
    forgotPasswordSubject?: string;
    forgotPasswordBody?: string;
    verificationMailSubject?: string;
    verificationMailBody?: string;
    emailService?: EmailService;
  };
};
