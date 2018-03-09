/**
 * Header
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionPatients from 'material-ui/svg-icons/action/perm-contact-calendar';
import ActionHelp from 'material-ui/svg-icons/action/help';

import Logout from 'containers/Logout';
import { HOME_URL, PATIENTS_URL } from 'containers/App/constants';
import styles from './styles.css';

function Header() {
  return (
    <Toolbar className={styles.toolbar}>
      <ToolbarGroup firstChild>
        <span className={styles.iconButton}>
          <FlatButton
            label="Home"
            icon={<ActionHome />}
            containerElement={<Link to={HOME_URL} />}
            className={styles.font}
          />
        </span>
        <span className={styles.iconButton}>
          <FlatButton
            label="Patients"
            icon={<ActionPatients />}
            containerElement={<Link to={PATIENTS_URL} />}
            className={styles.font}
          />
        </span>
      </ToolbarGroup>
      <ToolbarGroup lastChild>
        <ToolbarSeparator />
        <span className={styles.iconButton}>
          <IconButton tooltip="Help">
            <ActionHelp />
          </IconButton>
        </span>
        <span className={styles.iconButton}>
          <Logout />
        </span>
      </ToolbarGroup>
    </Toolbar>
  );
}

Header.propTypes = {};

export default Header;
