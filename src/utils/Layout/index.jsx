import React, { Component } from 'react';
import { Helmet } from 'react-helmet';


class Layout extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Welcome to Bash</title>
        </Helmet>
        <section>
          <section className="navigation">
          </section>
          <section className="sidebar">
          </section>
          <section className="main_body">
          {
            this.props.children
          }
          </section>
          <section className="footer">
          </section>
        </section>
      </div>
    )
  }
}

export default Layout;