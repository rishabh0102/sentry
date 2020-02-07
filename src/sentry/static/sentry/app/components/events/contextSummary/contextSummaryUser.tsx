import React from 'react';

import UserAvatar from 'app/components/avatar/userAvatar';
import {removeFilterMaskedEntries} from 'app/components/events/interfaces/utils';
import {t} from 'app/locale';
import {objectIsEmpty} from 'app/utils';
import {AvatarUser} from 'app/types';
import ContextSummaryNoSummary from './contextSummaryNoSummary';
import ContextSummaryInfo from './contextSummaryInfo';
import ContextSummaryTitle from './contextSummaryTitle';

type Props = {
  data: AvatarUser;
};

const ContextSummaryUser = ({data}: Props) => {
  const user: AvatarUser = removeFilterMaskedEntries(data);

  if (objectIsEmpty(user)) {
    return <ContextSummaryNoSummary title={t('Unknown User')} />;
  }

  let nodeTitle = '';

  const getUserTitle = () => {
    if (user.email) {
      nodeTitle = user.email;
      return <ContextSummaryTitle obj={user} objKey="email" />;
    }
    if (user.ip_address) {
      nodeTitle = user.ip_address;
      return <ContextSummaryTitle obj={user} objKey="ip_address" />;
    }

    if (user.id) {
      nodeTitle = user.id;
      return <ContextSummaryTitle obj={user} objKey="id" />;
    }
    if (user.username) {
      nodeTitle = user.username;
      return <ContextSummaryTitle obj={user} objKey="username" />;
    }

    return null;
  };

  const userTitle = getUserTitle();

  if (!userTitle) {
    return <ContextSummaryNoSummary title={t('Unknown User')} />;
  }

  return (
    <div className="context-item user">
      {userTitle ? (
        <UserAvatar
          user={user}
          size={48}
          className="context-item-icon"
          gravatar={false}
        />
      ) : (
        <span className="context-item-icon" />
      )}
      {userTitle}
      {user.id && user.id !== nodeTitle ? (
        <ContextSummaryInfo subject={t('ID:')} obj={user} objKey="id" />
      ) : (
        user.username &&
        user.username !== nodeTitle && (
          <ContextSummaryInfo subject={t('Username:')} obj={user} objKey="username" />
        )
      )}
    </div>
  );
};

export default ContextSummaryUser;
