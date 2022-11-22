import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'executeWith'
})
export class ExecuteWithPipe implements PipeTransform {
  transform<T>(callback: (...args: any[]) => T, ...args: any[]): T {
      return callback?.(...args);
  }
}