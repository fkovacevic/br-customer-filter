export type EventProperty = {
  property: string;
  type: 'string' | 'number';
};

export type AppEvent = {
  type: string;
  properties: EventProperty[];
};

