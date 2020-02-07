import React from 'react';

import {t} from 'app/locale';
import {objectIsEmpty} from 'app/utils';
import ContextSummaryNoSummary from './contextSummaryNoSummary';
import ContextSummaryInfo from './contextSummaryInfo';
import generateClassName from './generateClassName';
import ContextSummaryTitle from './contextSummaryTitle';

type Props = {
  data: Data;
  unknownTitle: string;
};

type Data = {
  name?: string;
  version?: string;
  type?: string;
};

const ContextSummaryGeneric = ({data, unknownTitle}: Props) => {
  if (objectIsEmpty(data) || !data.name) {
    return <ContextSummaryNoSummary title={unknownTitle} />;
  }

  const className = generateClassName(data.name);

  return (
    <div className={`context-item ${className}`}>
      <span className="context-item-icon" />
      <ContextSummaryTitle obj={data} objKey="name" />
      <ContextSummaryInfo
        subject={t('Version:')}
        obj={data}
        objKey="version"
        defaultValue={t('Unknown')}
      />
    </div>
  );
};

export default ContextSummaryGeneric;
