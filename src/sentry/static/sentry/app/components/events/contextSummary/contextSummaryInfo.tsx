import React from 'react';
import styled from '@emotion/styled';

import Annotated from 'app/components/events/meta/annotated';
import space from 'app/styles/space';

type Props<T> = {
  subject: string;
  obj: T;
  objKey: Extract<keyof T, string>;
  defaultValue?: string;
};

const ContextSummaryInfo = <T extends {}>({
  subject,
  obj,
  objKey,
  defaultValue,
}: Props<T>) => (
  <p>
    <Subject>{subject}</Subject>
    {obj[objKey] ? (
      <Annotated object={obj} prop={objKey}>
        {value => value}
      </Annotated>
    ) : (
      defaultValue
    )}
  </p>
);

export default ContextSummaryInfo;

const Subject = styled('strong')`
  margin-right: ${space(0.5)};
`;
