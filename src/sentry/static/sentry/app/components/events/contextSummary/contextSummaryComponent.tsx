import React from 'react';

import {t} from 'app/locale';

import ContextSummaryUser from './contextSummaryUser';
import ContextSummaryGeneric from './contextSummaryGeneric';
import ContextSummaryOs from './contextSummaryOs';
import ContextSummaryGpu from './contextSummaryGpu';
import ContextSummaryDeviceSummary from './contextSummaryDeviceSummary';

export enum ComponentType {
  USER = 'user',
  BROWSER = 'browser',
  RUNTIME = 'runtime',
  CLIENT_OS = 'client_os',
  OS = 'os',
  DEVICE = 'device',
  GPU = 'gpu',
}

type Props = {
  type: ComponentType;
  data: any;
};

const ContextSummaryComponent = ({type, data}: Props) => {
  switch (type) {
    case ComponentType.USER:
      return <ContextSummaryUser data={data} />;
    case ComponentType.BROWSER:
      return <ContextSummaryGeneric data={data} unknownTitle={t('Unknown Browser')} />;
    case ComponentType.RUNTIME:
      return <ContextSummaryGeneric data={data} unknownTitle={t('Unknown Runtime')} />;
    case ComponentType.CLIENT_OS:
    case ComponentType.OS:
      return <ContextSummaryOs data={data} unknownTitle={t('Unknown Os')} />;
    case ComponentType.DEVICE:
      return <ContextSummaryDeviceSummary data={data} />;
    case ComponentType.GPU:
      return <ContextSummaryGpu data={data} />;
    default:
      return null;
  }
};

export default ContextSummaryComponent;
