export interface Result {
  status: string;
  time: string;
  memory: string;
  stdout?: string;
}

export interface ICodeExecutor {
  execute(code: string, input: string): Promise<Result>;
  getLanguageId(): number;
  validateCode(code: string): boolean;
}