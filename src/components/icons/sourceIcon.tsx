import React from 'react';
import { ReactComponent as Android } from '@svg/android.svg';
import { ReactComponent as Ios } from '@svg/ios.svg';
import { ReactComponent as Javascript } from '@svg/javascript.svg';
import { ReactComponent as Unity } from '@svg/unity.svg';
import { ReactComponent as Ruby } from '@svg/ruby.svg';
import { ReactComponent as Node } from '@svg/node.svg';
import { ReactComponent as Go } from '@svg/go.svg';
import { ReactComponent as ReactNative } from '@svg/reactnative.svg';
import { ReactComponent as Python } from '@svg/python.svg';
import { ReactComponent as HTTP } from '@svg/http.svg';
import { ReactComponent as AMP } from '@svg/amp.svg';
import { ReactComponent as CustomerIO } from '@svg/customerio.svg';
import { ReactComponent as Looker } from '@svg/looker.svg';
import { ReactComponent as Java } from '@svg/java.svg';
import { ReactComponent as Auth0 } from '@svg/auth0.svg';
import { ReactComponent as Segment } from '@svg/segment.svg';
import { ReactComponent as DotNet } from '@svg/dotnet.svg';
import { ReactComponent as PHP } from '@svg/php.svg';
import theme from '@css/theme';

const SourceIcon = (props: any) => {
  let height = props.height || theme.iconSize.medium;
  let width = props.width || theme.iconSize.medium;
  switch (props.source.toLowerCase()) {
    case 'android':
      return <Android width={width} height={height} />;
    case 'ios':
      return <Ios width={width} height={height} />;
    case 'javascript':
      return <Javascript width={width} height={height} />;
    case 'unity':
      return <Unity width={width} height={height} />;
    case 'ruby':
      return <Ruby width={width} height={height} />;
    case 'node':
      return <Node width={width} height={height} />;
    case 'go':
      return <Go width={width} height={height} />;
    case 'reactnative':
      return <ReactNative width={width} height={height} />;
    case 'python':
      return <Python width={width} height={height} />;
    case 'http':
      return <HTTP width={width} height={height} />;
    case 'amp':
      return <AMP width={width} height={height} />;
    case 'customerio':
      return <CustomerIO width={width} height={height} />;
    case 'looker':
      return <Looker width={width} height={height} />;
    case 'java':
      return <Java width={width} height={height} />;
    case 'auth0':
      return <Auth0 width={width} height={height} />;
    case 'segment':
      return <Segment width={width} height={height} />;
    case 'dotnet':
      return <DotNet width={width} height={height} />;
    case 'php':
      return <PHP width={width} height={height} />;
    default:
      break;
  }
  return <div />;
};

export default SourceIcon;
