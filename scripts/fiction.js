function Fiction(){
	let _ = this;

	_.langs = ['en','ru','kz'];

	//let from = prompt("Выберите язык с какого перевод(0:en,1:ru,2:kz)")*1;
	//let to = prompt("Выберите язык на какой перевод(0:en,1:ru,2:kz)")*1;
	_.current_word = {};
	_.from = _.langs[0];
	_.to = _.langs[1];
	_.words = {};
		// trs = translates 
	
	_.langs.forEach(function(el){
		let xhr = new XMLHttpRequest();
		xhr.open('GET','file:///E:/JS/JS/fiction_lang/'+el+'.json',true);
		xhr.send();
		
		xhr.onreadystatechange = function ()
		{
		    if(xhr.readyState === 4)
		    {
		        if(xhr.status === 200 || xhr.status == 0)
		        {
		            var lang = JSON.parse(xhr.responseText);
		            console.log(el,lang);
		            _.words[el] = lang[el];
		        }
		    }
		}

	})
	_.choose_word = function(){
		let ind = _.words[_.from].length-1;
		if(ind < 0 ){
			ind = 0;
		}
		let rnd = Math.round(Math.random() * ind),
			id = _.words[_.from][rnd].id;
			words = _.words[_.from][rnd].words,
			wind = words.length-1;
		if(wind < 0 ){
			wind = 0;
		}
		_.current_word['id'] = id;
		_.current_word['word'] = words[Math.round(Math.random() * wind)];
	}
	setTimeout( function(){
		//console.log(_.words)
		_.find_word = function(_word){
			let translated_words = _.words[_.to];
			let filtered = translated_words.filter(function(word){
				return word['id'] == _.current_word['id'];
			})[0];
			let similar = filtered['words'].filter(function(word){
				return word == _word;
			})[0];

			if(similar){
				alert('Уcпех');
			}else{
				console.error("Ошибка")
			}
		}
		_.choose_word();
		let user_word = prompt(_.current_word['word']);
		while(user_word != '-1'){
			_.find_word(user_word);
			_.choose_word();
			user_word = prompt(_.current_word['word']);
		}
	},5000);
	//console.log(user_word);
}

let game = new Fiction();
