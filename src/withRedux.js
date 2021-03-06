import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

export default function withRedux(ReactElement) {
  class WithRedux extends React.Component {
    static displayName = 'withRedux'
    static propTypes = {
      store: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
    }
    render() {
      let { store, history, ...rest } = this.props;
      return (
        <Provider store={store}>
          <ConnectedRouter basename={rest.baseUrl} history={history}>
            {typeof(ReactElement) === 'function'
            ? <ReactElement store={store} history={history} {...rest} />
            : ReactElement}
          </ConnectedRouter>
        </Provider>
      );
    }
  }

  return WithRedux;
}
