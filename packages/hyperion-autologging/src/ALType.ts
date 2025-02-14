/**
 * Copyright (c) Meta Platforms, Inc. and affiliates. All Rights Reserved.
 */

'use strict';

import * as Types from "@hyperion/hyperion-util/src/Types";
import { ALFlowlet, ALFlowletManager } from './ALFlowletManager';

export type ALFlowletEvent = Readonly<{
  flowlet: ALFlowlet;
}>;

export type ALOptionalFlowletEvent = Omit<ALFlowletEvent, 'flowlet'> & Readonly<{
  flowlet: ALFlowletEvent['flowlet'] | null;
}>;

export type ALTimedEvent = Readonly<{
  eventTimestamp: number;
}>;

export type Metadata = {
  [Key: string]: string;
};

export type ALMetadataEvent = Readonly<{
  metadata: Metadata;
}>;

/**
 * Generally we will have publishers that generate various events.
 * In some cases, the event is final and we want that to be logged eventually.
 * In such cases, we need to add an eventIndex to keep track events.
 *
 * In some cases, publisher may generate an event but there is an expectation
 * that applications may fileter some of them out (e.g. network, mousemove, ...)
 * In such cases, the publishers should use the ALEvent base type instead
 * for their events to signal to the subscribers that they need to add extra
 * information as needed.
 */
export type ALLoggableEvent = ALTimedEvent & ALMetadataEvent & Readonly<{
  eventIndex: number;
}>;

export type ALReactElementEvent = Readonly<{
  reactComponentName?: string | null;
  reactComponentStack?: string[] | null;
}>;

export type ALSharedInitOptions = Types.Options<{
  flowletManager: ALFlowletManager;
  domSurfaceAttributeName: string;
}>;
