//When running this file, go to the directory you want to scrape to
//Requires Node.js, prior to running code run the two commands below in the shell
//npm install request cheerio 
//npm install jQuery

var request = require('request'),
	cheerio = require('cheerio'),
	fs = require ('fs'),
	urls = [];


request('https://imgur.com/r/soccer', function(err, resp, body){
	if(!err && resp.statusCode == 200){
		var $ = cheerio.load(body);
		//a.title refers to the a href class, using the nomenclature a.id
		//#imagelist below refers to the div id, allowing you to search within a specific area
		$('a.image-list-link', '#imagelist').each(function() {
			var url = $.attr('href');
			urls.push(url);
		});
		console.log(urls);
		for(var i = 0; i < urls.length; i++){
		request(urls[i]).pipe(fs.createWriteStream('img/' + i + '.jpg'));	
		}
		
	}

});
