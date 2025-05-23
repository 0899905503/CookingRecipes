import { DatePipe } from '@angular/common';

export class DateUtils {
  static formatDate(date: any): string | null {
    const datePipe = new DatePipe('en-US');

    // Định dạng ngày tháng kiểu "01 JUN 23"
    let formattedDate = datePipe.transform(date, 'dd MMM yyyy');

    if (formattedDate) {
      return formattedDate.toUpperCase();
    }
    return null;
  }

  static formatDateVI(date: any): string | null {
    const datePipe = new DatePipe('en-US');

    let formattedDate = datePipe.transform(date, 'dd-MM-yyyy');

    if (formattedDate) {
      return formattedDate.toUpperCase();
    }
    return null;
  }
}
