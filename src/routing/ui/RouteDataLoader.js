import React from "react";
import { connect } from "react-redux";
import CancelablePromise from "cancelable-promise";
import queryString from "query-string";
import PropTypes from "prop-types";

const fullUrl = location =>
  `${location.pathname}${location.search !== "" ? `${location.search}` : ""}`;

class RouteDataLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readyPushIsNeeded: true,
      dataIsLoaded: true,
      uiTreeIsReady: false
    };

    this.dispatchFetch = this.cancelAndDispatchFetchForLocation(
      "fetch",
      "fetchPromise"
    ).bind(this);
    this.dispatchFetchAfterSSR = this.cancelAndDispatchFetchForLocation(
      "fetchAfterSSR",
      "fetchAfterSSRPromise"
    ).bind(this);

    this.pushPageViewIfReady = this.pushPageViewIfReady.bind(this);
  }

  cancelAndDispatchFetchForLocation(fetchPropMethod, fetchPromise) {
    return location => {
      if (this[fetchPromise] && !this[fetchPromise]._canceled) {
        this[fetchPromise].cancel();
      }

      this[fetchPromise] = new CancelablePromise((resolve, reject) =>
        this.props[fetchPropMethod](
          location.pathname,
          queryString.parse(location.search)
        ).then(resolve, reject)
      );

      return this[fetchPromise];
    };
  }

  pushPageViewIfReady() {
    const { readyPushIsNeeded, dataIsLoaded, uiTreeIsReady } = this.state;
    const { onReady } = this.props;

    if (!readyPushIsNeeded || !dataIsLoaded || !uiTreeIsReady) {
      return;
    }

    onReady();

    this.setState({
      readyPushIsNeeded: false,
      dataIsLoaded: false,
      uiTreeIsReady: false
    });
  }

  dispatchFetchForLocation(location) {
    this.setState({ dataIsLoaded: false });

    this.dispatchFetch(location);

    this.fetchPromise.then(() => {
      this.setState({ dataIsLoaded: true }, this.pushPageViewIfReady);
    });
  }

  componentDidMount() {
    if (process.env.NODE_ENV === "development") {
      this.dispatchFetchForLocation(this.props.location);
    } else {
      this.dispatchFetchAfterSSR(this.props.location);
    }

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ uiTreeIsReady: true }, this.pushPageViewIfReady);
  }

  componentWillReceiveProps(nextProps) {
    if (fullUrl(nextProps.location) !== fullUrl(this.props.location)) {
      this.setState({ readyPushIsNeeded: true, uiTreeIsReady: false });
      this.dispatchFetchForLocation(nextProps.location);
    }
  }

  componentDidUpdate() {
    if (this.state.uiTreeIsReady) {
      return;
    }

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({ uiTreeIsReady: true }, this.pushPageViewIfReady);
  }

  render() {
    return this.props.children;
  }
}

RouteDataLoader.propTypes = {
  fetch: PropTypes.func.isRequired,
  fetchAfterSSR: PropTypes.func
};

RouteDataLoader.defaultProps = {
  onReady: () => {},
  fetchAfterSSR: Promise.resolve()
};

const mapStateToProps = state => ({
  location: state.router.location
});

export default connect(mapStateToProps)(RouteDataLoader);
