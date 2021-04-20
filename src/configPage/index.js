import React from "react";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import PropTypes from "prop-types";
import { CookiesProvider } from "../hooks/cookies";

import Layout from "../components/Layout";
import ScrollToTop from "./ScrollToTop";

import "./index.css";

const Configpage = ({ error, route }) => (
  <>
    <ScrollToTop />
      <CookiesProvider>
          <Layout>
            {error ? (
              <div>
                <h1>ERROR</h1>
              </div>
            ) : (
              renderRoutes(route.routes)
            )}
          </Layout>
      </CookiesProvider>
  </>
);

Configpage.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf(PropTypes.string),
        ]),
        exact: PropTypes.bool,
        strict: PropTypes.bool,
        sensitive: PropTypes.bool,
        component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        render: PropTypes.func,
        loadData: PropTypes.func,
      })
    ).isRequired,
  }).isRequired,
  status: PropTypes.number,
};

const mapStateToProps = (state) => ({
  error: state.error.error,
});

export default connect(mapStateToProps)(React.memo(Configpage));
