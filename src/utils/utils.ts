import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

type SuccessResult = { data: any };
type ErrorResult = { error: FetchBaseQueryError | SerializedError };

export function isErrorResult(result: SuccessResult | ErrorResult): result is ErrorResult {
  return (result as ErrorResult).error !== undefined;
}
