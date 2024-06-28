import { LocalDate as LocalDateType, convert, nativeJs } from '@js-joda/core';

export class LocalDate {
  static now = () => new LocalDate(LocalDateType.now());

  static from = (date: Date) =>
    new LocalDate(LocalDateType.from(nativeJs(date)));

  static parse = (date: string) => new LocalDate(LocalDateType.parse(date));

  private constructor(private readonly value: LocalDateType) {}

  toDate = () => convert(this.value).toDate();

  toString = () => this.value.toString();

  addDays = (days: number) => new LocalDate(this.value.plusDays(days));

  minusDays = (days: number) => new LocalDate(this.value.minusDays(days));

  isBeforeOrEqual = (date: LocalDate) =>
    this.value.isBefore(date.value) || this.value.isEqual(date.value);
}
