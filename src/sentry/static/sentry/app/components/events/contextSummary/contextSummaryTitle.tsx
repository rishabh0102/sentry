import React from 'react';

import Annotated from 'app/components/events/meta/annotated';

type Props<T> = {
  obj: T;
  objKey: Extract<keyof T, string>;
  children?: (value: string) => React.ReactNode;
};

const ContextSummaryTitle = <T extends {}>({children, obj, objKey}: Props<T>) => (
  <Annotated object={obj} prop={objKey}>
    {value => (children ? children(value) : value)}
  </Annotated>
);

export default ContextSummaryTitle;
