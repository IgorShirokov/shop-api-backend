import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseInt implements PipeTransform {
  public transform(value: string): number {
    if (!value) {
      return 0;
    }
    return parseInt(value, 10);
  }
}
