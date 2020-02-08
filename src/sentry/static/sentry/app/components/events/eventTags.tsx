import React from 'react';
import {Link} from 'react-router';
import isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import {Location} from 'history';

import {Event, EventTag} from 'app/types';
import EventDataSection from 'app/components/events/eventDataSection';
import Annotated from 'app/components/events/meta/annotated';
import DeviceName from 'app/components/deviceName';
import {isUrl, generateQueryWithTag} from 'app/utils';
import {t} from 'app/locale';
import Pills from 'app/components/pills';
import Pill from 'app/components/pill';
import VersionHoverCard from 'app/components/versionHoverCard';
import InlineSvg from 'app/components/inlineSvg';

type DefaultProps = {
  hideGuide: boolean;
};

type Props = DefaultProps & {
  event: Event;
  orgId: string;
  projectId: string;
  location: Location;
};

const EventTags = ({
  hideGuide = false,
  event: {tags},
  orgId,
  location,
  projectId,
}: Props) => {
  if (isEmpty(tags)) {
    return null;
  }

  const streamPath = `/organizations/${orgId}/issues/`;
  const releasesPath = `/organizations/${orgId}/releases/`;

  const renderPill = (tag: EventTag, index: number) => {
    const query = generateQueryWithTag(location.query, tag);
    const locationSearch = `?${queryString.stringify(query)}`;

    return (
      <Pill key={tag.key} name={tag.key} value={tag.value}>
        <Link
          to={{
            pathname: streamPath,
            search: locationSearch,
          }}
        >
          {/* <DeviceName value={tag.value}>
            {deviceName => <Annotated>{deviceName}</Annotated>}
          </DeviceName> */}
          <Annotated object={tags[index]} prop="value">
            {value => value}
          </Annotated>
        </Link>
        {isUrl(tag.value) && (
          <a href={tag.value} className="external-icon">
            <em className="icon-open" />
          </a>
        )}
        {tag.key === 'release' && (
          <VersionHoverCard
            containerClassName="pill-icon"
            version={tag.value}
            orgId={orgId}
            projectId={projectId}
          >
            <Link
              to={{
                pathname: `${releasesPath}${tag.value}/`,
                search: locationSearch,
              }}
            >
              <InlineSvg src="icon-circle-info" size="14px" />
            </Link>
          </VersionHoverCard>
        )}
      </Pill>
    );
  };

  return (
    <EventDataSection
      title={t('Tags')}
      type="tags"
      className="p-b-1"
      hideGuide={hideGuide}
    >
      <Pills className="no-margin">{tags.map(renderPill)}</Pills>
    </EventDataSection>
  );
};

export default EventTags;
