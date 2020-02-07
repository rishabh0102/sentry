import React from 'react';

import {t} from 'app/locale';
import {objectIsEmpty} from 'app/utils';
import ContextSummaryNoSummary from './contextSummaryNoSummary';
import ContextSummaryInfo from './contextSummaryInfo';
import ContextSummaryTitle from './contextSummaryTitle';
import generateClassName from './generateClassName';

type Props = {
  data: Data;
  unknownTitle: string;
};

type Data = {
  kernel_version?: string;
  type?: string;
  build?: string;
  name?: string;
  version?: string;
};

const contextSummaryOs = ({data, unknownTitle}: Props) => {
  if (objectIsEmpty(data) || !data.name) {
    return <ContextSummaryNoSummary title={unknownTitle} />;
  }

  const className = generateClassName(data.name);

  const getVesionElement = () => {
    // eslint-disable-next-line react/prop-types
    if (!data.version && data.kernel_version) {
      return (
        <ContextSummaryInfo subject={t('Kernel:')} obj={data} objKey="kernel_version" />
      );
    }

    return (
      <ContextSummaryInfo
        subject={t('Version:')}
        obj={data}
        objKey="version"
        defaultValue={t('Unknown')}
      />
    );
  };

  return (
    <div className={`context-item ${className}`}>
      <span className="context-item-icon" />
      <ContextSummaryTitle obj={data} objKey="name" />
      {getVesionElement()}
    </div>
  );
};

export default contextSummaryOs;
