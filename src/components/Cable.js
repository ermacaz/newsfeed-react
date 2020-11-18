import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';


const Cable = ({ newsSourceSet, handleReceivedSet }) => {
  return (
    <Fragment>
          <ActionCable
            key={newsSourceSet.id}
            channel={{ channel: 'NewsSourcesChannel' }}
            onReceived={handleReceivedSet}
          />
    </Fragment>
  );
};

export default Cable;