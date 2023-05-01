import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'executeWith'
})
export class ExecuteWithPipe implements PipeTransform {
  transform<F extends (...fArgs: any[]) => any>(callback: F, ...args: Parameters<F>): ReturnType<F> {
      return callback?.(...args);
  }
}