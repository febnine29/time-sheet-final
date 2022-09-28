interface DataFormLogin {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
}

interface DataFormRegister {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  password: string;
}
interface ResultLoginResponse {
  accessToken: string;
  encryptedAccessToken: string;
  expireInSeconds: number;
  userId: number;
}
interface LoginResponse {
  error: any;
  result: ResultLoginResponse;
  success: boolean;
  targetUrl: any;
  unAuthorizedRequest: boolean;
}
interface ResultRegisterResponse {
  canLogin: boolean;
}
interface RegisterResponse {}

interface UserInfo {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  allowedLeaveDay: 0;
  type: 0;
  level: 0;
  sex: 0;
  branch: 0;
  avatarPath: string;
  morningWorking: string;
  morningStartAt: string;
  morningEndAt: string;
  afternoonWorking: string;
  afternoonStartAt: string;
  afternoonEndAt: string;
  isWorkingTimeDefault: true;
  id: 0;
}
interface ResultGetCurLoginInfoResponse {
  application: {
    version: string;
    releaseDate: string;
    features: {
      additionalProp1: true;
      additionalProp2: true;
      additionalProp3: true;
    };
  };
  user: UserInfo;
  tenant: {
    tenancyName: string;
    name: string;
    id: 0;
  };
}
interface GetCurLoginInfoResponse {
  error: null;
  result: ResultGetCurLoginInfoResponse;
  success: boolean;
  targetUrl: null;
  unAuthorizedRequest: boolean;
}
export type {
  DataFormRegister,
  ResultLoginResponse,
  LoginResponse,
  RegisterResponse,
  DataFormLogin,
  ResultRegisterResponse,
  GetCurLoginInfoResponse,
  ResultGetCurLoginInfoResponse,
  UserInfo,
};
