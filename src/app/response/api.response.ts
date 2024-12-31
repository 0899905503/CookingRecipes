export class ApiResponse {
  success: boolean;
  error?: string;
  result?: any;
  //validates?: ValidateModel[];
  //errorCode?: string | ErrorsCodeEnum;
  // pagination?: PaginationModel;
  status?: number;

  constructor() {
    this.success = false;
  }
}
