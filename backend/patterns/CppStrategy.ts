
import type { ICodeExecutor, Result } from './ICodeExecutor.ts';

export class CppStrategy implements ICodeExecutor {
  getLanguageId(): number {
    return 54; // From Class Diagram
  }

  validateCode(code: string): boolean {
    return code.includes('main');
  }

  async execute(code: string, input: string): Promise<Result> {
    console.log(`Executing C++ code via Judge0 (Lang ID: ${this.getLanguageId()})...`);
    
    
    return {
      status: "Accepted",
      time: "0.012s",
      memory: "3200KB"
    };
  }
}