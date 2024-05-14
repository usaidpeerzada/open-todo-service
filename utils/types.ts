import { EmailService } from "auth-ez";

export type Config = {
  User;
  enableLogs?: boolean;
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
