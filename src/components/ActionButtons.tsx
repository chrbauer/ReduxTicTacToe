import * as React from 'react';

import { Server, ServerState } from '../logic/Server';
import { Button } from 'semantic-ui-react'

export interface Props {
       server: Server;
       onFindMatch: () => void;
}


class ActionButtons extends React.Component<Props, object> {

  render() {
    const p = this.props;
    return (
      <div>
            <Button
	      loading={p.server.state === ServerState.Searching}
	onClick={p.onFindMatch}>FindMatch {p.server.state}</Button>
      </div>
    );
  }

}

export default ActionButtons
