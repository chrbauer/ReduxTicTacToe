import * as React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

export interface Props {
    loading: boolean;
}

class Loading extends React.Component<Props, object> {
    render() {
        // const { children } = this.props;
        const { loading, children } = this.props;

        return (
            <Dimmer.Dimmable as="div" dimmed={false} className="boarddimmer" style={{
                marginLeft: "70px"
            }} >
                <Dimmer active={loading} inverted={false} >
                    <Loader
                        size='massive'>Searching...</Loader>
            </Dimmer>
            {children}
            </Dimmer.Dimmable >
        );
    }
}


export default Loading;
