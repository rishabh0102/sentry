import React from 'react';

import {t} from 'app/locale';
import {objectIsEmpty} from 'app/utils';
import DeviceName from 'app/components/deviceName';

import ContextSummaryNoSummary from './contextSummaryNoSummary';
import ContextSummaryInfo from './contextSummaryInfo';
import ContextSummaryTitle from './contextSummaryTitle';
import generateClassName from './generateClassName';

type Props = {
  data: Data;
};

type Data = {
  model?: any;
  arch?: string;
  type?: string;
  model_id?: string;
};

/* eslint-disable react/prop-types */
const ContextSummaryDeviceSummary = ({data}: Props) => {
  if (objectIsEmpty(data)) {
    return <ContextSummaryNoSummary title={t('Unknown Device')} />;
  }

  // TODO(dcramer): we need a better way to parse it
  const className = data.model && generateClassName(data.model);

  const getSubTitle = () => {
    if (data.arch) {
      return <ContextSummaryInfo subject={t('Arch:')} obj={data} objKey="arch" />;
    }

    if (data.model_id) {
      return <ContextSummaryInfo subject={t('Model:')} obj={data} objKey="model_id" />;
    }

    return null;
  };

  return (
    <div className={`context-item ${className}`}>
      <span className="context-item-icon" />
      {data.model ? (
        <ContextSummaryTitle obj={data} objKey="model">
          {value => <DeviceName>{value}</DeviceName>}
        </ContextSummaryTitle>
      ) : (
        <h3>{t('Unknown Device')}</h3>
      )}
      {getSubTitle()}
    </div>
  );
};

export default ContextSummaryDeviceSummary;
