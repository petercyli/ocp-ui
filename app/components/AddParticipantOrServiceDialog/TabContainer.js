/**
 *
 * TabContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'material-ui-next';

function TabContainer(props) {
  return (
    <Typography component="div" >
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabContainer;