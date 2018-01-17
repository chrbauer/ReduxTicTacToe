import * as React from 'react';

import { Server, ServerState } from '../logic/Server';
import { Button } from 'semantic-ui-react'

export interface Props {
    server: Server;
    onFindMatch: () => void;
    onNewGame: () => void;
}


class ActionButtons extends React.Component<Props, object> {

  render() {
    const p = this.props;
    return (
	    <div>
	                <Button
  	       loading={p.server.state === ServerState.Searching}
 	       label="New Game"
	       onClick={p.onNewGame} />
            <Button
  	       loading={p.server.state === ServerState.Searching}
 	       label="Find Match"
	       onClick={p.onFindMatch} />
      </div>
    );
  }

}

export default ActionButtons
