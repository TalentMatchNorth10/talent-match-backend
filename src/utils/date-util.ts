import { format } from 'path';
export enum DateRange {
  TwoDays = 'twoDays',
  WEEK = 'week',
  MONTH = 'month'
}

export const DateUtil = {
  formatLocalDate(date: Date) {
    // 取得本地時間的時區偏移量 (分鐘)
    const timeZoneOffset = date.getTimezoneOffset() * 60000;

    // 調整時間以符合本地時間
    const localDate = new Date(date.getTime() - timeZoneOffset);

    // 回傳調整過的本地時間
    return localDate;
  },
  getDateRange(range: string): { startDate: Date; endDate: Date } {
    const now = this.formatLocalDate(new Date());

    switch (range) {
      case DateRange.TwoDays:
        return {
          startDate: now,
          endDate: this.formatLocalDate(
            new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() + 2,
              0,
              0,
              0,
              0
            )
          )
        };
      case DateRange.WEEK:
        return {
          startDate: now,
          endDate: this.formatLocalDate(
            new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() + 7,
              0,
              0,
              0,
              0
            )
          )
        };
      case DateRange.MONTH:
        return {
          startDate: now,
          endDate: this.formatLocalDate(
            new Date(
              now.getFullYear(),
              now.getMonth() + 1,
              now.getDate(),
              0,
              0,
              0,
              0
            )
          )
        };
      default:
        throw new Error(`Invalid range: ${range}`);
    }
  },
  checkExpired(date: Date): boolean {
    return this.formatLocalDate(date) < this.formatLocalDate(new Date());
  },
  getMonthStartAndEnd(dateString: string): { startDate: Date; endDate: Date } {
    const [year, month] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1);

    return {
      startDate: this.formatLocalDate(
        new Date(date.getFullYear(), date.getMonth(), 1)
      ),
      endDate: this.formatLocalDate(
        new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
      )
    };
  },
  getDateString(date: Date): string {
    const formattedDate = this.formatLocalDate(date);
    return `${formattedDate.getFullYear()}-${
      formattedDate.getMonth() + 1
    }-${formattedDate.getDate()}`;
  },
  getDayStartAndEnd(dateString: string): { startDate: Date; endDate: Date } {
    const date = new Date(dateString);

    return {
      startDate: this.formatLocalDate(
        new Date(date.getFullYear(), date.getMonth(), date.getDate())
      ),
      endDate: this.formatLocalDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          23,
          59,
          59,
          999
        )
      )
    };
  },
  getWeekStartAndEnd(): { startDate: Date; endDate: Date } {
    // tomorrow
    const now = this.formatLocalDate(new Date());
    const tommorow = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // next week
    const weekEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 6
    );

    return {
      startDate: this.formatLocalDate(
        new Date(
          tommorow.getFullYear(),
          tommorow.getMonth(),
          tommorow.getDate(),
          0,
          0,
          0,
          0
        )
      ),
      endDate: this.formatLocalDate(
        new Date(
          weekEnd.getFullYear(),
          weekEnd.getMonth(),
          weekEnd.getDate(),
          23,
          59,
          59,
          999
        )
      )
    };
  }
};
