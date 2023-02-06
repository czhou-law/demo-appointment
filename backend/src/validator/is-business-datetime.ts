import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getDay, setHours, parseISO } from 'date-fns';

@ValidatorConstraint()
export class IsBusinessDateTimeConstraint
  implements ValidatorConstraintInterface
{
  validate(isoDate: string) {
    const targetDateTime = parseISO(isoDate);
    const startWorkDate = setHours(targetDateTime, 9);
    const endWorkDate = setHours(targetDateTime, 18);
    const day = getDay(targetDateTime);

    if (
      [0, 6].includes(day) ||
      targetDateTime < startWorkDate ||
      targetDateTime > endWorkDate
    ) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return `The given date time is not within business operation time`;
  }
}

export function IsBusinessDateTime(validationOptions?: ValidationOptions) {
  return (obj: object, propertyName: string) => {
    registerDecorator({
      name: 'IsBusinessDateTime',
      target: obj.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsBusinessDateTimeConstraint,
    });
  };
}
