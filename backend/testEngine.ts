import { ExecutionService } from './services/ExecutionService';
import { CppStrategy } from './patterns/CppStrategy';
import { PythonStrategy } from './patterns/PythonStrategy';

async function runTest() {
  const service = new ExecutionService();

  console.log("--- Testing C++ Strategy ---");
  service.setStrategy(new CppStrategy());
  const cppResult = await service.runCode("int main() { return 0; }", "");
  console.log(cppResult);

  console.log("\n--- Testing Python Strategy ---");
  service.setStrategy(new PythonStrategy());
  const pyResult = await service.runCode("print('Hello')", "");
  console.log(pyResult);
}

runTest();
