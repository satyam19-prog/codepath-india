// backend/services/ExecutionService.ts
import type { ICodeExecutor, Result } from '../patterns/ICodeExecutor.ts';

export class ExecutionService {
  private executor: ICodeExecutor | null = null;
  setStrategy(executor: ICodeExecutor): void {
    this.executor = executor;
  }

  async runCode(code: string, input: string): Promise<Result> {
    if (!this.executor) {
      throw new Error("Execution strategy not set.");
    }

    if (!this.executor.validateCode(code)) {
      throw new Error("Code validation failed. Check syntax requirements.");
    }
    return await this.executor.execute(code, input);
  }
}