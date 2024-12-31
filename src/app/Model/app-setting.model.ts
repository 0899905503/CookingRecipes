export class ReCaptchaModel {
  siteKey: string;

  constructor() {
    this.siteKey = '';
  }
}

export class OktaConfig {
  issuer: string;
  clientId: string;

  constructor() {
    this.issuer = '';
    this.clientId = '';
  }
}

export class AppSettingModel {
  apiUrl?: string;
  acceptedRoles: number[];
  reCaptcha: ReCaptchaModel;
  okta: OktaConfig;

  constructor() {
    this.acceptedRoles = [];
    this.reCaptcha = new ReCaptchaModel();
    this.okta = new OktaConfig();
  }
}
