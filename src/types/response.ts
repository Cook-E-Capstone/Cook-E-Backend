export interface ResponseTemplate {
  status: number;
  message: string;
  data?: unknown;
  errors?: string | Record<string, unknown>[] | unknown;
}
