import React from 'react';
import { ReactComponent as Android } from '@svg/android.svg';
import { ReactComponent as Appcenter } from '@svg/appcenter.svg';
import { ReactComponent as Appsflyer } from '@svg/af.svg';
import { ReactComponent as BigQuery } from '@svg/bigquery.svg';
import { ReactComponent as ClickHouse } from '@svg/clickhouse.svg';
import { ReactComponent as Extole } from '@svg/extole.svg';
import { ReactComponent as FacebookAds } from '@svg/facebook_ads.svg';
import { ReactComponent as Flutter } from '@svg/flutter.svg';
import { ReactComponent as FreshDesk } from '@svg/freshdesk.svg';
import { ReactComponent as GoogleAdwords } from '@svg/googleads.svg';
import { ReactComponent as GoogleAnalytics } from '@svg/googleanalytics.svg';
import { ReactComponent as GoogleSearchConsole } from '@svg/google_search_console.svg';
import { ReactComponent as Hubspot } from '@svg/hubspot.svg';
import { ReactComponent as Intercom } from '@svg/intercom.svg';
import { ReactComponent as Ios } from '@svg/ios.svg';
import { ReactComponent as Javascript } from '@svg/javascript.svg';
import { ReactComponent as MailChimp } from '@svg/mailchimp.svg';
import { ReactComponent as MixPanel } from '@svg/mp.svg';
import { ReactComponent as Pardot } from '@svg/pardot.svg';
import { ReactComponent as Postgres } from '@svg/postgres.svg';
import { ReactComponent as Python } from '@svg/python.svg';
import { ReactComponent as QuickBooks } from '@svg/quickbooks.svg';
import { ReactComponent as Unity } from '@svg/unity.svg';
import { ReactComponent as Ruby } from '@svg/ruby.svg';
import { ReactComponent as Redshift } from '@svg/redshift.svg';
import { ReactComponent as Node } from '@svg/node.svg';
import { ReactComponent as Go } from '@svg/go.svg';
import { ReactComponent as ReactNative } from '@svg/reactnative.svg';
import { ReactComponent as HTTP } from '@svg/http.svg';
import { ReactComponent as AMP } from '@svg/amp.svg';
import { ReactComponent as CustomerIO } from '@svg/customerio.svg';
import { ReactComponent as Looker } from '@svg/looker.svg';
import { ReactComponent as Java } from '@svg/java.svg';
import { ReactComponent as Auth0 } from '@svg/auth0.svg';
import { ReactComponent as Segment } from '@svg/segment.svg';
import { ReactComponent as DotNet } from '@svg/dotnet.svg';
import { ReactComponent as PHP } from '@svg/php.svg';
import { ReactComponent as Pipedrive } from '@svg/pipedrive.svg';
import { ReactComponent as Salesforce}  from '@svg/salesforce.svg';
import { ReactComponent as Snowflake}  from '@svg/snowflake.svg';
import { ReactComponent as Stripe}  from '@svg/stripe.svg';
import { ReactComponent as GoogleSheets}  from '@svg/google_sheets.svg';
import { ReactComponent as Zendesk}  from '@svg/zendesk.svg';

import theme from '@css/theme';

const SourceIcon = (props: any) => {
  let height = props.height || theme.iconSize.medium;
  let width = props.width || theme.iconSize.medium;
  switch (props.source.toLowerCase()) {
    case 'android':
      return <Android width={width} height={height} />;
    case 'appcenter':
      return <Appcenter width={width} height={height} />;
    case 'appsflyer':
      return <Appsflyer width={width} height={height} />;
    case 'bigquery':
      return <BigQuery width={width} height={height} />;
    case 'clickhouse':
      return <ClickHouse width={width} height={height} />;
    case 'extole':
      return <Extole width={width} height={height} />;
    case 'facebook_ads':
      return <FacebookAds width={width} height={height} />;
    case 'flutter':
      return <Flutter width={width} height={height} />;
    case 'freshdesk':
      return <FreshDesk width={width} height={height} />;
    case 'google_adwords':
      return <GoogleAdwords width={width} height={height} />;    
    case 'googleanalytics':
      return <GoogleAnalytics width={width} height={height} />;
    case 'google_search_console':
      return <GoogleSearchConsole width={width} height={height} />;
    case 'hubspot':
      return <Hubspot width={width} height={height} />;
    case 'intercom':
      return <Intercom width={width} height={height} />;
    case 'ios':
      return <Ios width={width} height={height} />;
    case 'javascript':
      return <Javascript width={width} height={height} />;
    case 'mailchimp':
      return <MailChimp width={width} height={height} />;
      case 'mixpanel':
        return <MixPanel width={width} height={height} />;  
    case 'unity':
      return <Unity width={width} height={height} />;
    case 'ruby':
      return <Ruby width={width} height={height} />;
    case 'node':
      return <Node width={width} height={height} />;
    case 'pardot':
      return <Pardot width={width} height={height} />;
    case 'go':
      return <Go width={width} height={height} />;
    case 'reactnative':
      return <ReactNative width={width} height={height} />;
    case 'python':
      return <Python width={width} height={height} />;
    case 'quickbooks':
      return <QuickBooks width={width} height={height} />;
    case 'http':
      return <HTTP width={width} height={height} />;
    case 'amp':
      return <AMP width={width} height={height} />;
    case 'customerio':
      return <CustomerIO width={width} height={height} />;
    case 'looker':
      return <Looker width={width} height={height} />;
    case 'postgres':
      return <Postgres width={width} height={height} />;  
    case 'pipedrive':
      return <Pipedrive width={width} height={height} />;  
    case 'java':
      return <Java width={width} height={height} />;
    case 'auth0':
      return <Auth0 width={width} height={height} />;
    case 'segment':
      return <Segment width={width} height={height} />;
    case 'salesforce':
      return <Salesforce width={width} height={height} />;
    case 'stripe':
      return <Stripe width={width} height={height} />;
    case 'redshift':
      return <Redshift width={width} height={height} />;
    case 'google_sheets':
      return <GoogleSheets width={width} height={height} />;
    case 'dotnet':
      return <DotNet width={width} height={height} />;
    case 'php':
      return <PHP width={width} height={height} />;
    case 'snowflake':
      return <Snowflake width={width} height={height} />;
    case 'zendesk':
      return <Zendesk width={width} height={height} />;
    default:
      break;
  }
  return <div />;
};

export default SourceIcon;
