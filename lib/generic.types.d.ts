export interface ThrownErrorSWR extends Error {
  statusCode: number;
  statusText: string;
}
