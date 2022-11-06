import { HttpErrorResponse } from "@angular/common/http";

function isErrorInfo(value: any): boolean {
  if (!value) return false;
  return ['numericCode', 'message'].every((field) => field in value);
}

function extractErrorsFromErrorInfo(error: any): string[] {
  return error.message ?? '';
}

export function extractErrors(e: HttpErrorResponse): string[] {
  if (isErrorInfo(e.error?.error)) {
    return extractErrorsFromErrorInfo(e.error?.error);
  }
  return [e.message];
}

export function getHttpErrorMessage(e: HttpErrorResponse): string {
  return extractErrors(e).join(' \r\n ');
}