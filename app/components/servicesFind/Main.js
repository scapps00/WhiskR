// // THIS IS AN EXAMPLE ONLY "STARTER FILE"!!!!!

import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <div className="columns">
        <section className="hero is-primary column is-12">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {this.props.primaryTitle}
              </h1>
              <h2 className="subtitle">
                {this.props.primarySub}
              </h2>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
