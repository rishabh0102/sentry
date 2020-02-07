import React from 'react';

import {t} from 'app/locale';
import {objectIsEmpty} from 'app/utils';
import ContextSummaryNoSummary from './contextSummaryNoSummary';
import ContextSummaryInfo from './contextSummaryInfo';
import ContextSummaryTitle from './contextSummaryTitle';
import generateClassName from './generateClassName';

type Props = {
  data: Data;
};

type Data = {
  name?: string;
  vendor_name?: string;
};

const ContextSummaryOs = ({data}: Props) => {
  if (objectIsEmpty(data) || !data.name) {
    return <ContextSummaryNoSummary title={t('Unknown GPU')} />;
  }

  const className = generateClassName(data.vendor_name ? data.vendor_name : data.name);

  return (
    <div className={`context-item ${className}`}>
      <span className="context-item-icon" />
      <ContextSummaryTitle obj={data} objKey="name" />
      <ContextSummaryInfo
        subject={t('Vendor:')}
        obj={data}
        objKey="vendor_name"
        defaultValue={t('Unknown')}
      />
    </div>
  );
};

export default ContextSummaryOs;
