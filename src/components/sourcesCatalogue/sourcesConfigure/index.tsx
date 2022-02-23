import { ButtonPrimary } from '@components/common/button';
import SourceIcon from '@components/icons/sourceIcon';
import { ISourceDefintion } from '@stores/sourceDefinitionsList';

// @ts-ignore
import raw from 'raw.macro';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import theme from '@css/theme';
import { Flex } from '../../common/misc';
import { Header, TextDiv } from '../../common/typography';

// @ts-ignore
export const markdown = {
  AMP: raw('./AMP.md'),
  Android: raw('./Android.md'),
  Auth0: raw('./Auth0.md'),
  Customerio: raw('./Customerio.md'),
  Go: raw('./Go.md'),
  HTTP: raw('./HTTP.md'),
  Java: raw('./JAVA.md'),
  Javascript: raw('./Javascript.md'),
  Looker: raw('./LOOKER.md'),
  Node: raw('./Node.md'),
  Python: raw('./Python.md'),
  ReactNative: raw('./ReactNative.md'),
  Ruby: raw('./Ruby.md'),
  Segment: raw('./SegmentSource.md'),
  Unity: raw('./Unity.md'),
  iOS: raw('./iOS.md'),
  DotNet: raw('./DotNet.md'),
  PHP: raw('./PHP.md'),
  Salesforce: raw('./Salesforce.md'),
  Bq: raw('./BQ.md'),
  Cordova: raw('./Cordova.md'),
  Custom: raw('./Custom.md'),
  GoogleSheets: raw('./GoogleSheets.md'),
  Hubspot: raw('./Hubspot.md'),
  Mssql: raw('./MSSQL.md'),
  Rs: raw('./RS.md'),
  Webhook: raw('./Webhook.md'),
  Zendesk: raw('./Zendesk.md'),

};

export interface ISourceConfigureProps {
  sourceDef?: ISourceDefintion;
}
export interface ISourceConfigureState {
  markdown: string;
}

export default class SourceConfigure extends React.Component<
  ISourceConfigureProps,
  ISourceConfigureState
> {
  constructor(props: ISourceConfigureProps) {
    super(props);
    this.state = {
      markdown: '',
    };
  }

  public render() {
    const { sourceDef } = this.props;
    return (
      <div className="p-l-lg">
        <Flex className="m-b-lg p-b-md b-b-grey">
          <SourceIcon
            source={sourceDef!.name}
            height={theme.iconSize.large}
            width={theme.iconSize.large}
          ></SourceIcon>
          <div className="m-l-md">
            <Header color={theme.color.black}>{sourceDef!.name}</Header>
          </div>
        </Flex>
        <div>
          <Link to={`/sources/setup?sourceDefId=${sourceDef!.id}`}>
            <ButtonPrimary className="m-b-lg">Configure</ButtonPrimary>
          </Link>
          <ReactMarkdown source={(markdown as any)[sourceDef!.name]} />
        </div>
      </div>
    );
  }
}
