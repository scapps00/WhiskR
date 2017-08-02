// THIS IS AN EXAMPLE ONLY "STARTER FILE"!!!!!


import React from "react";

import QueryItem from "./QueryItem";
import Saved from "./Saved";

export default class Result extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      savedItem:{}
    }
    this.saveArticle = this.saveArticle.bind(this);
  }

  saveArticle(itemClicked) {
    console.log(itemClicked);
    axios.post("/savearticle", {
        title: itemClicked.title,
        snippet:itemClicked.snippet,
        date: itemClicked.date,
        url: itemClicked.url,
        articleId:itemClicked.articleId
      })
      .then(function(results) {
        this.setState({savedItem:itemClicked});
      }.bind(this))
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
    <div>
      <div className="columns">
        <div className="column">
          <nav className="panel column is-8 is-offset-2">
            <p className="panel-heading has-text-centered">
              {this.props.headerName}
            </p>
            <div className={this.props.resultsFound.length > 0 ? "scrollIt": ""}>
              {
                this.props.resultsFound.map((doc,index) => {

                  let header = doc.abstract;
                  let formDate = doc.pub_date.split("T")[0];
                  return <QueryItem key={index} buttonEvent={this.saveArticle} articleId={doc._id} newsLink={doc.web_url} abstract={doc.headline.main} snippet={doc.snippet} articleDate={formDate} icon="fa fa-floppy-o" />
                })
              }
      </div>
    </nav>
  </div>
  </div>
  <Saved headerName="Saved" itemSaved={this.state.savedItem} />
</div>
    );
  }
}
