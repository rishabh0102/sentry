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

const userTitleTypes = ['email', 'ip_address', 'id', 'username'];

const ContextSummaryUser = ({data}: Props) => {
  const titleRef = React.createRef<HTMLHeadingElement>();
  const user: AvatarUser = removeFilterMaskedEntries(data);

  if (objectIsEmpty(user)) {
    return <ContextSummaryNoSummary title={t('Unknown User')} />;
  }

  // const renderUserDetails = () => {
  //   if (user.id && user.id !== nodeTitle) {
  //     return <ContextSummaryInfo subject={t('ID:')} obj={user} objKey="id" />;
  //   }

  //   if (user.username && user.username !== nodeTitle) {
  //     return <ContextSummaryInfo subject={t('Username:')} obj={user} objKey="username" />;
  //   }

  //   return null;
  // };

  const userTitle = Object.keys(user).find(userDetail =>
    userTitleTypes.includes(userDetail)
  );

  console.log('userTitle', userTitle);

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
      {/* {renderUserDetails()} */}
    </div>
  );
};

export default ContextSummaryUser;
