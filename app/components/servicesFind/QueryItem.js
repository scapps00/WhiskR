// THIS IS AN EXAMPLE ONLY "STARTER FILE"!!!!!

import React from "react";

export default class QueryItem extends React.Component {
  constructor(){
    super();
    this.handleButton = this.handleButton.bind(this);
  }
  handleButton() {
    let title = this.props.abstract;
    let snippet = this.props.snippet;
    let date = this.props.articleDate;
    let url = this.props.newsLink;
    let articleId = this.props.articleId;
    this.props.buttonEvent(
      {
        title:title,
        snippet:snippet,
        date:date,
        url:url,
        articleId:articleId
      });
  }
  render() {
    return (
        <div className="column is-12">
        <article className="message">
          <div className="message-header">
            <a href={this.props.newsLink} target="_blank">{this.props.abstract}</a>
            <button onClick={this.handleButton} id={this.props.articleId} className={this.props.icon}></button>
          </div>
          <div className="message-body">
            {this.props.snippet}
            <br/>
            <small>{this.props.articleDate}</small>
          </div>
        </article>
      </div>
    );
  }
}
