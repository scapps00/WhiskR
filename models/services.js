
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ArticleSchema = mongoose.Schema({
  title: String,
  articleId:String,
  synopsis: String,
  date: String,
  url: String
});

ArticleSchema.statics.gethistory = function(){
  return this.find();
};

ArticleSchema.statics.addArticle = function(article){
  return this.create(article);
};

ArticleSchema.statics.removeArticle = function(articleId){
  return this.findOneAndRemove(articleId);
};

let Article = mongoose.model("Article",ArticleSchema);

module.exports = Article;
