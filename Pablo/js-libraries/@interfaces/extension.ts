import { MessageWithOptionalID } from './comunications';

export type DirectedMessagePayload<Type = string, Payload = unknown> = {
  message: MessageWithOptionalID<Type, Payload>;
};

export type TypedPayload<Type = string, Payload = unknown> =
MessageWithOptionalID<Type, Payload> & {
  payloadType?: 'json' | 'string'
};

export type ContentDirectedMessagePayload<Type = string, Payload = unknown> =
DirectedMessagePayload<Type, Payload> & {
  runtime?: boolean;
};

export type BackgroundDirectedMessagePayload<Type = string, Payload = unknown> =
  DirectedMessagePayload<Type, Payload> & {
    tab: chrome.tabs.Tab;
  };

export type ExtensionEnvironment = 'background' | 'content' | 'inline' | 'application';
