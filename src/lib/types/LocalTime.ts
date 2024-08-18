import { LocalTime as LocalTimeType } from '@js-joda/core';

export class LocalTime {
  static now = () => new LocalTime(LocalTimeType.now());

  static parse = (time: string) => new LocalTime(LocalTimeType.parse(time));

  private constructor(private readonly value: LocalTimeType) {}

  toString = () => this.value.toString();

  addHours = (hours: number) => new LocalTime(this.value.plusHours(hours));

  minusHours = (hours: number) => new LocalTime(this.value.minusHours(hours));

  isBefore = (date: LocalTime) => this.value.isBefore(date.value);
}
