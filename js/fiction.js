function Fiction(){
	let _ = this;
	_.langs = ['en','ru','kz'];
	//let from = prompt("Выберите язык с какого перевод(0:en,1:ru,2:kz)")*1;
	//let to = prompt("Выберите язык на какой перевод(0:en,1:ru,2:kz)")*1;
	_.current_word = {}; // Текущее слово, которое предложил комп на перевод
	_.from = _.langs[0]; // С какого языка пользователь будет переводить
	_.to = _.langs[1]; // на какой язык будет переводить
	_.words = {}; //
	_.choose_word = function(){
		try{
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
			document.getElementById('translate-word').textContent= _.current_word['word']
		} catch (e) {
			if(e.name == 'TypeError'){
				console.warn("Не загружен язык перевода");
			}
		}
	}
	_.find_word = function(_word){
		try{
			let translated_words = _.words[_.to];
			let filtered = translated_words.filter(function(word){
				return word['id'] == _.current_word['id'];
			})[0];
			let similar = filtered['words'].filter(function(word){
				return word.toLowerCase() == _word.toLowerCase();
			})[0];
			if(similar){
				alert('Уcпех');
			}else{
				console.error("Ошибка")
			}
		}catch (e) {
			console.dir(e)
		}
	}
	_.word_counter = function(type){
		if(type == 'fail'){
		 	return;
		}
	}
	_.get_lang = function (lang) {
		let prom = new Promise(  function (resolve) {
			let xhr = new XMLHttpRequest();
			try {
				xhr.open ('GET' , '/js/translates/' + lang + '.json' , true);
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 404){
							console.warn("Файл перевода "+ lang+ "не найден");
						}
						if (xhr.status === 200 || xhr.status == 0) {
							var transl = JSON.parse (xhr.responseText);
							//_.words[lang] = transl[lang];
							let lang_obg = {};
							lang_obg[lang] = transl[lang];
							resolve(lang_obg);
						}
					}
				};
				xhr.send ();
			} catch (e) {
			}
		});
		return prom;
	};
	let promises  = [];
	promises.push(_.get_lang(_.from));
	promises.push(_.get_lang(_.to));
	Promise.all(promises).then(
		function (langs){
		/*		for(let i=0; i < langs.length;i++){
				let lang  = langs[i] , f=  lang[_.from], t=  lang[_.to];
				if(f){
					_.words[_.from]= f;
				}
				if(t){
					_.words[_.to]= t;
				}
			}*/
			_.words[_.from] = langs[0][_.from];
			_.words[_.to] = langs[1][_.to];
			_.choose_word();
			let user_word = document.getElementById('user-input');///prompt(_.current_word['word']);
			//console.log(user_word)
			//
			user_word.addEventListener('keypress',function (el) {
				if(el.keyCode === 13){
					_.find_word(user_word.value);
					_.choose_word();
					user_word.value = "";
				}
			});

				//user_word = prompt(_.current_word['word']);


		}
	);






	//console.log(user_word);
}
window.onload = function(){
	let game = new Fiction();
}
