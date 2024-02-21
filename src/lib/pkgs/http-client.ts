import { Right, Left } from './either';
import type { Either } from './either';

export class HttpClient {
  constructor(private baseUrl: string, private log: boolean) {}

  protected async get<T>(path: string, httpHeader?: HttpClientBaseHeader): Promise<HttpResponse<T>> {
    return this.doRequest<T>(HttpClientMethod.GET, path, httpHeader)
  }

  protected async post<T>(path: string, httpHeader?: HttpClientBaseHeader, requestData?: any): Promise<HttpResponse<T>> {
    return this.doRequest<T>(HttpClientMethod.POST, path, httpHeader, requestData)
  }

  protected async put<T>(path: string, httpHeader?: HttpClientBaseHeader, requestData?: any): Promise<HttpResponse<T>> {
    return this.doRequest<T>(HttpClientMethod.PUT, path, httpHeader, requestData)
  }

  protected async patch<T>(path: string, httpHeader?: HttpClientBaseHeader, requestData?: any): Promise<HttpResponse<T>> {
    return this.doRequest<T>(HttpClientMethod.PATCH, path, httpHeader, requestData)
  }

  protected async delete<T>(path: string, httpHeader?: HttpClientBaseHeader): Promise<HttpResponse<T>> {
    return this.doRequest<T>(HttpClientMethod.DELETE, path, httpHeader)
  }

  protected logger(...params: any[]) {
    if (this.log) {
      console.log(...params);
    }
  }

  private async doRequest<T>(method: HttpClientMethod, path: string, httpHeader?: HttpClientBaseHeader, requestData?: any): Promise<HttpResponse<T>> {
    const requestInit: RequestInit = {
      method
    };

    if (httpHeader) {
      requestInit.headers = httpHeader as any;
    }

    if (requestData) {
      requestInit.body = JSON.stringify(requestData);
    }

    const resp = await fetch(`${this.baseUrl}${path}`, requestInit);
    const respBody = await resp.json();
    if (resp.status !== HttpStatusCode.Ok) {
      this.logger('not ok response', 'statusCode', resp.status);
    }

    return new HttpResponse<T>(resp, respBody);
  }
}

export class HttpResponse<T> {
  private resp: Response;
  private respBody: any & BaseResp
  constructor(resp: Response, respBody: any & BaseResp) {
    this.resp = resp;
    this.respBody = respBody;
  }

  public statusCode(): HttpClientBaseStatusCode {
    const statusCode = this.resp.status as HttpStatusCode;
    const statusText = (HttpStatusCode[
      this.resp.status
    ] as unknown) as HttpStatusCode;

    return {
      statusCode,
      statusText
    };
  }

  public status(): Status {
    return this.respBody.status;
  }

  public success(): SuccessResp<T> {
    return this.respBody;
  }

  public failure(): FailureResp<any> {
    return this.respBody;
  }

  public error(): ErrorResp {
    return this.respBody;
  }

  public either(): Either<string, SuccessResp<T>> {
    switch (this.status()) {
      case Status.Success:
        return Right(this.success());
      case Status.Failure:
        const failure = this.failure();
        return Left(failure.message !== '' ? failure.message : failure.data as string);
      case Status.Error:
        const error = this.error();
        return Left(error.message);
    }
  }
}

export interface HttpClientBaseHeader {
  'Content-Type': string,
  'Authorization'?: string,
}

export interface HttpClientBaseStatusCode {
  statusCode: number;
  statusText: HttpStatusCode;
}

export interface BaseResp {
  status: Status;
}

export interface SuccessResp<T> extends BaseResp {
  status: Status.Success;
  data: T;
}

export interface FailureResp<T>  extends BaseResp{
  status: Status.Failure;
  data: T;
  message: string;
}

export interface ErrorResp extends BaseResp {
  status: Status.Error;
  message: string;
}

export enum Status {
  Success = 'success',
  Failure = 'failure',
  Error = 'error',
}

export enum HttpClientMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum HttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  ImUsed = 226,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  SwitchProxy = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  UriTooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  IAmATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}
