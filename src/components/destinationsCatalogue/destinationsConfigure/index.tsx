import * as React from 'react';
import { IDestinationDef } from '@stores/destinationDefsList';
import ReactMarkdown from 'react-markdown';

// @ts-ignore
import raw from 'raw.macro';
import { ButtonPrimary } from '@components/common/button';
import { Flex } from '../../common/misc';
import DestinationIcon from '@components/icons/destinationIcon';
import { Header } from '../../common/typography';
import theme from '@css/theme';
import { Link } from 'react-router-dom';

const markdown = {
  ACTIVE_CAMPAIGN: raw('./ACTIVE_CAMPAIGN.md'),
  ADJ: raw('./ADJ.md'),
  AF: raw('./AF.md'),
  AM: raw('./AM.md'),
  APPCENTER: raw('./APPCENTER.md'),
  APPCUES: raw('./APPCUES.md'),
  AUTOPILOT: raw('./AUTOPILOT.md'),
  AZURE_BLOB: raw('./AZURE_BLOB.md'),
  AZURE_EVENT_HUB: raw('./AZURE_EVENT_HUB.md'),
  BQ: raw('./BQ.md'),
  BRANCH: raw('./BRANCH.md'),
  BRAZE: raw('./BRAZE.md'),
  BUGSNAG: raw('./BUGSNAG.md'),
  CHARTBEAT: raw('./CHARTBEAT.md'),
  CLICKHOUSE: raw('./CLICKHOUSE.md'),
  COMSCORE: raw('./COMSCORE.md'),
  CONFLUENT_CLOUD: raw('./CONFLUENT_CLOUD.md'),
  CUSTOMERIO: raw('./CUSTOMERIO.md'),
  DIGITAL_OCEAN_SPACES: raw('./DIGITAL_OCEAN_SPACES.md'),
  EVENTBRIDGE: raw('./EVENTBRIDGE.md'),
  FACEBOOK_PIXEL: raw('./FACEBOOK_PIXEL.md'),
  FB: raw('./FB.md'),
  FIREBASE: raw('./FIREBASE.md'),
  FIREHOSE: raw('./FIREHOSE.md'),
  FULLSTORY: raw('./FULLSTORY.md'),
  GA: raw('./GA.md'),
  GA4: raw('./GA4.md'),
  GCS: raw('./GCS.md'),
  GOOGLEADS: raw('./GOOGLEADS.md'),
  GOOGLEPUBSUB: raw('./GOOGLEPUBSUB.md'),
  GTM: raw('./GTM.md'),
  HEAP: raw('./HEAP.md'),
  HOTJAR: raw('./HOTJAR.md'),
  HS: raw('./HS.md'),
  INDICATIVE: raw('./INDICATIVE.md'),
  INTERCOM: raw('./INTERCOM.md'),
  ITERABLE: raw('./ITERABLE.md'),
  KAFKA: raw('./KAFKA.md'),
  KEEN: raw('./KEEN.md'),
  KINESIS: raw('./KINESIS.md'),
  KISSMETRICS: raw('./KISSMETRICS.md'),
  KOCHAVA: raw('./KOCHAVA.md'),
  LEANPLUM: raw('./LEANPLUM.md'),
  LOTAME: raw('./LOTAME.md'),
  LYTICS: raw('./LYTICS.md'),
  LOTAME_MOBILE: raw('./LOTAME_MOBILE.md'),
  MAILCHIMP: raw('./MAILCHIMP.md'),
  MARKETO: raw('./MARKETO.md'),
  MINIO: raw('./MINIO.md'),
  MOENGAGE: raw('./MOENGAGE.md'),
  MONETATE: raw('./MONETATE.md'),
  MP: raw('./MP.md'),
  OPTIMIZELY: raw('./OPTIMIZELY.md'),
  OPTIMIZELY_FULLSTACK: raw('./OPTIMIZELY_FULLSTACK.md'),
  PENDO: raw('./PENDO.md'),
  PERSONALIZE: raw('./PERSONALIZE.md'),
  POSTGRES: raw('./POSTGRES.md'),
  POSTHOG: raw('./POSTHOG.md'),
  REDIS: raw('./REDIS.md'),
  RS: raw('./RS.md'),
  S3: raw('./S3.md'),
  SALESFORCE: raw('./SALESFORCE.md'),
  SEGMENT: raw('./SEGMENT.md'),
  SLACK: raw('./SLACK.md'),
  SNOWFLAKE: raw('./SNOWFLAKE.md'),
  TVSQUARED: raw('./TVSQUARED.md'),
  USERLIST: raw('./USERLIST.md'),
  VWO: raw('./VWO.md'),
  WEBHOOK: raw('./WEBHOOK.md'),
  ZENDESK: raw('./ZENDESK.md'),
};

export interface IDestinationConfigureProps {
  destinationDef?: IDestinationDef;
}
export interface IDestinationConfigureState {
  markdown: string;
}

export default class DestinationConfigure extends React.Component<
  IDestinationConfigureProps,
  IDestinationConfigureState
> {
  constructor(props: IDestinationConfigureProps) {
    super(props);
    this.state = {
      markdown: '',
    };
  }

  public render() {
    const { destinationDef } = this.props;
    return (
      <div className="p-l-lg">
        <Flex className="m-b-lg p-b-md b-b-grey" alignItems="center">
          <DestinationIcon
            destination={destinationDef!.name}
            height={theme.iconSize.large}
            width={theme.iconSize.large}
          ></DestinationIcon>
          <div className="m-l-md">
            <Header color={theme.color.black}>
              {destinationDef!.displayName}
            </Header>
          </div>
        </Flex>
        <div>
          <Link
            to={`/destinations/setup?destinationDefId=${destinationDef!.id}`}
          >
            <ButtonPrimary className="m-b-lg">Configure</ButtonPrimary>
          </Link>
          <ReactMarkdown source={(markdown as any)[destinationDef!.name]} />
        </div>
      </div>
    );
  }
}
