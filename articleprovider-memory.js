var articleCounter = 1;

ArticleProvider = function(){};
ArticleProvider.prototype.dummyData = [];

ArticleProvider.prototype.findAll = function(callback) {
	callback(null, this.dummyData);
};

ArticleProvider.prototype.findById = function(id, callback) {
	var result = null;
	for (var i = 0; this.dummyData.length; i++) {
		if (this.dummyData[i]._id = id) {
			result = this.dummyData[i];
			break;			
		}
	}

	callback(null, result);
};

ArticleProvider.prototype.save = function(articles, callback) {
	var article = null;

	if (Object.prototype.toString.call(articles) !== "[object Array]") {
		articles = [articles];
	}

	for (var i = 0; i < articles.length; i++) {
		article = articles[i];
		article._id = articleCounter++;
		article.created_at = new Date();

		if (article.comments === undefined) {
			article.comments = [];
		}

		for (var j = 0; j < article.comments.length; j++) {
			article.comments[j].created_at = new Date();
		}

		this.dummyData[this.dummyData.length] = article;
	}

	callback(null, articles);
}

new ArticleProvider().save([
	{title: 'Post one', body: 'Body one', comments:[{author: 'Bob', comment:'Fantastic'}, {author: 'James da Troll', comment:'fla,e on'} ]},
	{title: 'Post one', body: 'Body one', comments:[{author: 'Bob', comment:'First post was better'}]},
	{title: 'Post one', body: 'Body one'}


	], function(error, articles){});

exports.ArticleProvider = ArticleProvider;