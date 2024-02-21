import { HttpClient, type SuccessResp } from './http-client';
import type { HttpClientBaseHeader,  } from './http-client';
import { Left, type Either } from './either';
import type { Country } from '../configurations/countries';
import type { Locale } from '../configurations/locale-mappings';

export class ZookeeperClient extends HttpClient {
  private headers: HttpClientBaseHeader;
  constructor(baseUrl: string, log: boolean) {
    super(baseUrl, log);
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  public async info(): Promise<Either<string, SuccessResp<InfoRespData>>> {
    try {
      const resp = await this.get<InfoRespData>('/info', this.headers);
      return resp.either();
    } catch (err) {
      return Left(String(err));
    }
  }

  public async health(): Promise<Either<string, SuccessResp<HealthRespData>>> {
    try {
      const resp = await this.get<HealthRespData>('/health', this.headers);
      return resp.either();
    } catch (err) {
      return Left(String(err));
    }
  }

  public async signIn(email: string, password: string): Promise<Either<string, SuccessResp<SignInRespData>>> {
    const request: SignInReq = { email, password };
    try {
      const resp = await this.post<SignInRespData>('/auth/sign-in', this.headers, request);
      return resp.either();
    } catch (err) {
      return Left(String(err));
    }
  }

  public async signUp(email: string, password: string, country: Country, language: Locale): Promise<Either<string, SuccessResp<SignUpRespData>>> {
    const request: SignUpReq = { email, password, country, language };
    try {
      const resp = await this.post<SignInRespData>('/auth/sign-up', this.headers, request);
      return resp.either();
    } catch (err) {
      return Left(String(err));
    }
  }

  public async refreshSession(refreshToken: string): Promise<Either<string, SuccessResp<RefreshSessionRespData>>> {
    try {
      const request: RefreshSessionReq = { refresh_token: refreshToken };
      const resp = await this.post<RefreshSessionRespData>('/auth/refresh-session', this.headers, request);
      return resp.either();
    } catch (err) {
      return Left(String(err));
    }
  }

  public async signOut(token: string) {
    const headers = {...this.headers, 'Authorization': `Bearer ${token}`};
    try {
      const resp = await this.delete<void>('/auth/sign-out', headers)
      return resp.either();
    } catch (err) {
      return Left(String(err));
    }
  }

  public async getMe(token: string): Promise<Either<string, SuccessResp<Comptus>>> {
    const headers = {...this.headers, 'Authorization': `Bearer ${token}`};
    try {
      const resp = await this.delete<Comptus>('/auth/me', headers)
      return resp.either();
    } catch (err) {
      return Left(String(err));
    }
  }

  public async acrivateOrbisSocius(token: string, code: string, requestId: number): Promise<Either<string, SuccessResp<AcrivateOrbisSociusRespData>>> {
    const request: AcrivateOrbisSociusReq = { code, request_id: requestId };
    const headers = {...this.headers, 'Authorization': `Bearer ${token}`};
    try {
      const resp = await this.post<AcrivateOrbisSociusRespData>('/orbes_socii/activate', headers, request);
      return resp.either();
    } catch (err) {
      return Left(String(err));
    }
  }

  public async requestOrbisSocius(token: string, region: string, name: string, description: string, url: string): Promise<Either<string, SuccessResp<RequestOrbisSociusRespData>>> {
    const request: RequestOrbisSociusReq = { region, name, description, url };
    const headers = {...this.headers, 'Authorization': `Bearer ${token}`};
    try {
      const resp = await this.post<RequestOrbisSociusRespData>('/orbes_socii/request', headers, request);
      return resp.either();
    } catch (err) {
      return Left(String(err));
    }
  }
}

export interface InfoRespData {
  deps: Record<string, any>;
  name: string;
  version: string;
}

export interface HealthRespData {
  ok: boolean;
}

export interface Comptus {
  id: number;
  country: Country;
  email: string;
  language: Locale;
}

export interface AuthTokenPair {
  refresh_token: string;
  token: string;
}

export interface SignInReq {
  email: string;
  password: string;
}

export interface SignInRespData {
  self:      Comptus;
  session_id: number;
  tokens: AuthTokenPair;
}

export interface SignUpReq {
  email: string;
  password: string;
  country: Country;
  language: Locale;
}

export interface SignUpRespData {
  self:      Comptus;
  session_id: number;
  tokens: AuthTokenPair;
}

export interface RefreshSessionReq {
  refresh_token: string;
}

export interface RefreshSessionRespData {
  self:      Comptus;
  session_id: number;
  tokens: AuthTokenPair;
}

export interface AcrivateOrbisSociusReq {
  code:  string;
  request_id: number;
}

export interface AcrivateOrbisSociusRespData {
  api_key:  string;
}

export interface RequestOrbisSociusReq {
  region: string;
  name: string;
  description: string;
  url: string;
}

export interface RequestOrbisSociusRespData {
  ok: boolean;
}
