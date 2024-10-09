export type PubSubLike = {
  publish: Publish;
  subscribe: Subscribe;
  unsubscribe: Unsubscribe;
};

export type MessageWithOptionalID<Type = string, Payload = any> = Omit<Message<Type, Payload>, 'id'> & {
  id?: Message<Type, Payload>['id'];
};

export type Message<Type = string, Payload = any> = {
  id: string;
  type: Type;
  payload: Payload;
};

export type MessageID = Message['id'];
export type SubscriptionID = string;
export type SubscribeCallback = <Type = string, Payload = any>(
  message: MessageWithOptionalID<Type, Payload>,
) => void

export type Publish = <Type = string, Payload = any>(
  message: MessageWithOptionalID<Type, Payload>,
) => MessageID;
export type Subscribe = <Type = string, Payload = any>(
  messageType: Type,
  callback: SubscribeCallback,
) => {
  subscriptionID: SubscriptionID,
  unsubscribe: () => boolean,
};
export type Unsubscribe = (
  id: SubscriptionID,
) => boolean;
