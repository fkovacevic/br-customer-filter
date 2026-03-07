export enum StringComparator {
  EQUALS = 'EQUALS',
  NOT_EQUAL = 'NOT_EQUAL',
  CONTAINS = 'CONTAINS',
  NOT_CONTAIN = 'NOT_CONTAIN',
}

export enum NumberOperator {
  EQUAL_TO = 'EQUAL_TO',
  IN_BETWEEN = 'IN_BETWEEN',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN = 'GREATER_THAN',
}

export const StringComparatorLabel: Record<StringComparator, string> = {
  [StringComparator.EQUALS]: 'equals',
  [StringComparator.NOT_EQUAL]: 'does not equal',
  [StringComparator.CONTAINS]: 'contains',
  [StringComparator.NOT_CONTAIN]: 'does not contain',
};

export const NumberOperatorLabel: Record<NumberOperator, string> = {
  [NumberOperator.EQUAL_TO]: 'equal to',
  [NumberOperator.IN_BETWEEN]: 'in between',
  [NumberOperator.LESS_THAN]: 'less than',
  [NumberOperator.GREATER_THAN]: 'greater than',
};

export const isComparatorRange = (
  comparator: NumberOperator | StringComparator,
): comparator is NumberOperator.IN_BETWEEN => {
  return comparator === NumberOperator.IN_BETWEEN;
};
export const isComparatorNumber = (
  comparator: NumberOperator | StringComparator,
): comparator is Exclude<NumberOperator, NumberOperator.IN_BETWEEN> => {
  return (
    Object.values(NumberOperator).includes(comparator as NumberOperator) &&
    comparator !== NumberOperator.IN_BETWEEN
  );
};
export const isComparatorText = (
  comparator: NumberOperator | StringComparator,
): comparator is StringComparator => {
  return Object.values(StringComparator).includes(comparator as StringComparator);
};
export const isAttributeRange = (attribute: EventAttribute): attribute is EventAttributeRange => {
  return 'comparator' in attribute && isComparatorRange(attribute.comparator);
};
export const isAttributeNumber = (attribute: EventAttribute): attribute is EventAttributeNumber => {
  return 'comparator' in attribute && isComparatorNumber(attribute.comparator);
};
export const isAttributeText = (attribute: EventAttribute): attribute is EventAttributeString => {
  return 'comparator' in attribute && isComparatorText(attribute.comparator);
};

export type EventAttributeString = {
  id: string;
  property: string | null;
  comparator: StringComparator;
  value: string;
};

export type EventAttributeNumber = {
  id: string;
  property: string | null;
  comparator: Exclude<NumberOperator, NumberOperator.IN_BETWEEN>;
  value: number;
};

export type EventAttributeRange = {
  id: string;
  property: string | null;
  comparator: NumberOperator.IN_BETWEEN;
  value: [number, number];
};

export type EventAttributeEmpty = {
  id: string;
  property: null;
};

export type EventAttribute =
  | EventAttributeEmpty
  | EventAttributeString
  | EventAttributeNumber
  | EventAttributeRange;

export type FunnelStep = {
  id: string;
  event: string | null;
  attributes: EventAttribute[];
};
