import { apiAuthCaller, apiCaller } from '@services/apiCaller';
declare global {
  interface Window {
    rudderanalytics: any;
  }
}

export default class Auth {
  static async signup(
    name: string,
    email: string,
    password: string,
    organization: string,
  ): Promise<any> {
    const resp = await apiCaller().post('/signup', {
      name,
      email,
      password,
      organization,
    });
    window.rudderanalytics.identify(email, {
      email,
      name,
      company: organization,
      organization,
    });
    window.rudderanalytics.track('User Signed Up', {
      email,
      name,
      organization,
    });
    return resp.data;
  }

  static async login(email: string, password: string): Promise<any> {
    const resp = await apiCaller().post('/login', {
      email,
      password,
    });
    window.rudderanalytics.identify(email, {
      email,
      name: resp.data && resp.data.name,
    });
    return resp.data;
  }

  static async confirmSignUp(email: string, otp: string): Promise<any> {
    const resp = await apiCaller().post('/confirmSignup', {
      email,
      otp,
    });
    return resp.data;
  }

  static async resendConfirmationCode(email: string): Promise<any> {
    const resp = await apiCaller().post('/resendConfirmationCode', {
      email,
    });
    return resp.data;
  }

  static async changePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const resp = await apiCaller().post('/changePassword', {
      email,
      oldPassword,
      newPassword,
    });
    return resp.data;
  }

  static async forgotPassword(email: string): Promise<any> {
    const resp = await apiCaller().post('/forgotPassword', {
      email,
    });
    return resp.data;
  }
  static async confirmForgotPassword(
    email: string,
    otp: string,
    password: string,
  ): Promise<any> {
    const resp = await apiCaller().post('/confirmForgotPassword', {
      email,
      otp,
      password,
    });
    return resp.data;
  }

  static async currentSession(sessionData: any, email: string): Promise<any> {
    const { accessToken, idToken, refreshToken } = sessionData;
    const resp = await apiAuthCaller(idToken).post('/refreshToken', {
      accessToken,
      idToken,
      refreshToken,
      email,
    });
    return resp.data;
  }
}
