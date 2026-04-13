// backend/patterns/PythonStrategy.ts
import type { ICodeExecutor, Result } from './ICodeExecutor.ts';

export class PythonStrategy implements ICodeExecutor {
  getLanguageId(): number {
    return 71; // From Class Diagram
  }

  validateCode(code: string): boolean {
    return code.trim().length > 0; 
  }

  async execute(code: string, input: string): Promise<Result> {
    console.log(`Executing Python code via Judge0 (Lang ID: ${this.getLanguageId()})...`);
    
    // TODO: Add Axios call to Judge0 API
    
    return {
      status: "Accepted",
      time: "0.045s",
      memory: "4100KB"
    };
  }
}