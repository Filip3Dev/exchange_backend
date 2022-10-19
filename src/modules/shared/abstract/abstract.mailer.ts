export abstract class AbstractMailerService {
  abstract sendEmail(params: Record<string, any>): Promise<any>;
}
