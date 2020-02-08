import React from 'react';

import SentryTypes from 'app/sentryTypes';
import {objectIsEmpty} from 'app/utils';

import ContextSummaryComponent, {ComponentType} from './contextSummaryComponent';

const MIN_CONTEXTS = 3;
const MAX_CONTEXTS = 4;
const KNOWN_CONTEXTS = [
  ComponentType.USER,
  ComponentType.BROWSER,
  ComponentType.RUNTIME,
  ComponentType.CLIENT_OS,
  ComponentType.OS,
  ComponentType.DEVICE,
  ComponentType.GPU,
];

type Props = {
  event: SentryTypes.Event;
};

const ContextSummary = ({event}: Props) => {
  const contexts: Array<React.ReactNode> = [];
  let useContent = false;

  // Add defined contexts in the declared order, until we reach the limit
  // defined by MAX_CONTEXTS.
  for (let i = 0; i < MAX_CONTEXTS; i++) {
    const contextType = KNOWN_CONTEXTS[i];
    const data = event.contexts[contextType] || event[contextType];
    if (!objectIsEmpty(data)) {
      if (contextType === ComponentType.USER) {
        useContent = true;
      }
      contexts.push(
        <ContextSummaryComponent key={contextType} type={contextType} data={data} />
      );
    }
  }

  // Bail out if all contexts are empty or only the user context is set
  if (contexts.length === 0 || (contexts.length === 1 && useContent)) {
    return null;
  }

  if (contexts.length < MIN_CONTEXTS) {
    for (let i = 0; i < MIN_CONTEXTS; i++) {
      const contextType = KNOWN_CONTEXTS[i];
      if (!contexts[i]) {
        contexts.push(
          <ContextSummaryComponent
            key={`${contextType}-noData`}
            type={contextType}
            data={{}}
          />
        );
      }
    }
  }

  return <div className="context-summary">{contexts}</div>;
};

export default ContextSummary;
