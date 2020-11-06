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
  // config-gen-md
OPTIMIZELY_FULLSTACK: raw('./OPTIMIZELY_FULLSTACK.md'),
DIGITAL_OCEAN_SPACES: raw('./DIGITAL_OCEAN_SPACES.md'),
INDICATIVE: raw('./INDICATIVE.md'),
OPTIMIZELY: raw('./OPTIMIZELY.md'),
  GA: raw('./GA.md'),
  AM: raw('./AM.md'),
  MP: raw('./MP.md'),
  FB: raw('./FB.md'),
  ADJ: raw('./ADJ.md'),
  HS: raw('./HS.md'),
  S3: raw('./S3.md'),
  MINIO: raw('./MINIO.md'),
  RS: raw('./RS.md'),
  BQ: raw('./BQ.md'),
  SNOWFLAKE: raw('./SNOWFLAKE.md'),
  AF: raw('./AF.md'),
  MAILCHIMP: raw('./MAILCHIMP.md'),
  HOTJAR: raw('./HOTJAR.md'),
  SALESFORCE: raw('./SALESFORCE.md'),
  SEGMENT: raw('./SEGMENT.md'),
  AUTOPILOT: raw('./AUTOPILOT.md'),
  GOOGLEADS: raw('./GOOGLEADS.md'),
  VWO: raw('./VWO.md'),
  INTERCOM: raw('./INTERCOM.md'),
  BRANCH: raw('./BRANCH.md'),
  BRAZE: raw('./BRAZE.md'),
  GTM: raw('./GTM.md'),
  HEAP: raw('./HEAP.md'),
  KEEN: raw('./KEEN.md'),
  KOCHAVA: raw('./KOCHAVA.md'),
  KISSMETRICS: raw('./KISSMETRICS.md'),
  CUSTOMERIO: raw('./CUSTOMERIO.md'),
  CHARTBEAT: raw('./CHARTBEAT.md'),
  COMSCORE: raw('./COMSCORE.md'),
  FIREBASE: raw('./FIREBASE.md'),
  LEANPLUM: raw('./LEANPLUM.md'),
  WEBHOOK: raw('./WEBHOOK.md'),
  FB_PIXEL: raw('./FB_PIXEL.md'),
  LOTAME: raw('./LOTAME.md'),
  SLACK: raw('./SLACK.md'),
  ZENDESK: raw('./ZENDESK.md'),
  AZURE_BLOB: raw('./AZURE_BLOB.md'),
  FULLSTORY: raw('./FULLSTORY.md'),
  GCS: raw('./GCS.md'),
  BUGSNAG: raw('./BUGSNAG.md'),
  KINESIS: raw('./KINESIS.md'),
  KAFKA: raw('./KAFKA.md'),
  AZURE_EVENT_HUB: raw('./AZURE_EVENT_HUB.md'),
  ITERABLE: raw('./ITERABLE.md'),
  LOTAME_MOBILE: raw('./LOTAME_MOBILE.md'),
  FIREHOSE: raw('./FIREHOSE.md'),
  EVENTBRIDGE: raw('./EVENTBRIDGE.md')
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
