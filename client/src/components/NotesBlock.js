import React from 'react';
import PropTypes from 'prop-types';
import './NotesBlock.scss';

function NotesBlock({ lastUpdateUser }) {
  return (
    <p className="notes">
      This page was last updated by
      {' '}
      {lastUpdateUser}
      .
    </p>
  );
}

NotesBlock.propTypes = {
  lastUpdateUser: PropTypes.string.isRequired,
};

export default NotesBlock;
