import React from 'react';

import { ReactComponent as Enabled } from './enabled.svg';
import { ReactComponent as ErrorIcon } from './error.svg';
import { ReactComponent as ForwardThick } from './ic-forward-thick.svg';
import { ReactComponent as Forward } from './ic-forward.svg';
import { ReactComponent as Connection } from './ic-menu-connections.svg';
import { ReactComponent as Destination } from './ic-menu-destinations.svg';
import { ReactComponent as Rudder } from './ic-menu-rudder.svg';
import { ReactComponent as Source } from './ic-menu-sources.svg';
import { ReactComponent as Transformation } from './ic-menu-transformations.svg';
import { ReactComponent as Signout } from './ic-signout.svg';
import { ReactComponent as Plus } from './plus.svg';
import { ReactComponent as Delete } from './delete.svg';
import { ReactComponent as Selected } from './selected.svg';
import { ReactComponent as Settings } from './settings.svg';
import { ReactComponent as SideArrow } from './sideArrow.svg';
import { ReactComponent as EmptyDestinations } from './emptyDestinations.svg';
import { ReactComponent as NoData } from './no-data.svg';
import { ReactComponent as NoDataGraph } from './no-data-graph.svg';
import { ReactComponent as LogoRudder } from './logo-rudder.svg';
import { ReactComponent as CaretDown } from './caret-down.svg';
import { ReactComponent as ChevronDown } from './chevron-down.svg';
import { ReactComponent as Bell } from './bell.svg';
import { ReactComponent as Close } from './close.svg';
import { ReactComponent as Check } from './check.svg';
import { ReactComponent as Checkbox } from './checkbox.svg';
import { ReactComponent as Edit } from './edit.svg';
import { ReactComponent as DotsHor } from './dots-hor.svg';
import { ReactComponent as ChartBar } from './chart-bar.svg';

interface SvgProps extends React.SVGAttributes<any> {
  name: string;
  size?: number;
}

const Svg: React.FC<SvgProps> = ({ name, size, ...svgProps }: any) => {
  let Icon;
  switch (name.toLowerCase()) {
    case 'chart':
      Icon = ChartBar;
      break;
    case 'rudder':
      Icon = Rudder;
      break;
    case 'connection':
      Icon = Connection;
      break;
    case 'source':
      Icon = Source;
      break;
    case 'destination':
      Icon = Destination;
      break;
    case 'ed':
      Icon = EmptyDestinations;
      break;
    case 'transformation':
      Icon = Transformation;
      break;
    case 'selected':
      Icon = Selected;
      break;
    case 'signout':
      Icon = Signout;
      break;
    case 'forward':
      Icon = Forward;
      break;
    case 'forward-thick':
      Icon = ForwardThick;
      break;
    case 'settings':
      Icon = Settings;
      break;
    case 'side-arrow':
      Icon = SideArrow;
      break;
    case 'plus':
      Icon = Plus;
      break;
    case 'error':
      Icon = ErrorIcon;
      break;
    case 'enabled':
      Icon = Enabled;
      break;
    case 'no-data':
      Icon = NoData;
      break;
    case 'no-data-graph':
      Icon = NoDataGraph;
      break;
    case 'logo-rudder':
      Icon = LogoRudder;
      break;
    case 'delete':
      Icon = Delete;
      break;
    case 'chevron-down':
      Icon = ChevronDown;
      break;
    case 'bell':
      Icon = Bell;
      break;
    case 'close':
      Icon = Close;
      break;
    case 'check':
      Icon = Check;
      break;
    case 'checkbox':
      Icon = Checkbox;
      break;
    case 'caret-down':
      Icon = CaretDown;
      break;
    case 'edit':
      Icon = Edit;
      break;
    case 'dots-hor':
      Icon = DotsHor;
      break;
    default:
      break;
  }
  const sizeProps =
    (size && {
      width: size,
      height: size,
    }) ||
    {};
  return Icon ? <Icon {...sizeProps} {...svgProps} /> : <div />;
};

export default Svg;
