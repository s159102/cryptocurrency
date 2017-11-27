//This object stores all data that we get from cryptocompare.com
var currencies = {
	BTC: {FULLNAME: "Bitcoin", COLOR: "#f7931a", PRICE: "?", CHANGE24HOUR: "?",  CHANGEPCT24HOUR: "?", OPEN24HOUR: "?", HIGH24HOUR: "?", LOW24HOUR: "?", VOLUME24HOUR: "?", VOLUME24HOURTO: "?", TOTALVOLUME24H: "?", TOTALVOLUME24HTO: "?", MKTCAP: "?", SUPPLY: "?"},
	ETH: {FULLNAME: "Ethereum", COLOR: "#343535", PRICE: "?", CHANGE24HOUR: "?",  CHANGEPCT24HOUR: "?", OPEN24HOUR: "?", HIGH24HOUR: "?", LOW24HOUR: "?", VOLUME24HOUR: "?", VOLUME24HOURTO: "?", TOTALVOLUME24H: "?", TOTALVOLUME24HTO: "?", MKTCAP: "?", SUPPLY: "?"},
	BCH: {FULLNAME: "Bitcoin Cash", COLOR: "#f7931a", PRICE: "?", CHANGE24HOUR: "?",  CHANGEPCT24HOUR: "?", OPEN24HOUR: "?", HIGH24HOUR: "?", LOW24HOUR: "?", VOLUME24HOUR: "?", VOLUME24HOURTO: "?", TOTALVOLUME24H: "?", TOTALVOLUME24HTO: "?", MKTCAP: "?", SUPPLY: "?"},
	XRP: {FULLNAME: "Ripple", COLOR: "#0098d2", PRICE: "?", CHANGE24HOUR: "?",  CHANGEPCT24HOUR: "?", OPEN24HOUR: "?", HIGH24HOUR: "?", LOW24HOUR: "?", VOLUME24HOUR: "?", VOLUME24HOURTO: "?", TOTALVOLUME24H: "?", TOTALVOLUME24HTO: "?", MKTCAP: "?", SUPPLY: "?"},
	LTC: {FULLNAME: "Litecoin", COLOR: "#b6b7ba", PRICE: "?", CHANGE24HOUR: "?",  CHANGEPCT24HOUR: "?", OPEN24HOUR: "?", HIGH24HOUR: "?", LOW24HOUR: "?", VOLUME24HOUR: "?", VOLUME24HOURTO: "?", TOTALVOLUME24H: "?", TOTALVOLUME24HTO: "?", MKTCAP: "?", SUPPLY: "?"},
	DASH: {FULLNAME: "Dash", COLOR: "#1c75bc", PRICE: "?", CHANGE24HOUR: "?",  CHANGEPCT24HOUR: "?", OPEN24HOUR: "?", HIGH24HOUR: "?", LOW24HOUR: "?", VOLUME24HOUR: "?", VOLUME24HOURTO: "?", TOTALVOLUME24H: "?", TOTALVOLUME24HTO: "?", MKTCAP: "?", SUPPLY: "?"},
	XEM: {FULLNAME: "NEM", COLOR: "#000000", PRICE: "?", CHANGE24HOUR: "?",  CHANGEPCT24HOUR: "?", OPEN24HOUR: "?", HIGH24HOUR: "?", LOW24HOUR: "?", VOLUME24HOUR: "?", VOLUME24HOURTO: "?", TOTALVOLUME24H: "?", TOTALVOLUME24HTO: "?", MKTCAP: "?", SUPPLY: "?"},
	NEO: {FULLNAME: "NEO", COLOR: "#58bf00", PRICE: "?", CHANGE24HOUR: "?",  CHANGEPCT24HOUR: "?", OPEN24HOUR: "?", HIGH24HOUR: "?", LOW24HOUR: "?", VOLUME24HOUR: "?", VOLUME24HOURTO: "?", TOTALVOLUME24H: "?", TOTALVOLUME24HTO: "?", MKTCAP: "?", SUPPLY: "?"},
	XMR: {FULLNAME: "Monero", COLOR: "#ff6600", PRICE: "?", CHANGE24HOUR: "?",  CHANGEPCT24HOUR: "?", OPEN24HOUR: "?", HIGH24HOUR: "?", LOW24HOUR: "?", VOLUME24HOUR: "?", VOLUME24HOURTO: "?", TOTALVOLUME24H: "?", TOTALVOLUME24HTO: "?", MKTCAP: "?", SUPPLY: "?"}
	}

var oldBig; //Stores the currency that is currently highlighted

$(document).ready(function(){
	getPrices();	//Get cryptocurrency price data
	oldBig = "BTC";	//Set a start value for oldBig (not used)
	getNews();		//Get cryptocurrency news date
});

//Every 5 seconds, update price data
setInterval(function() {
	getPrices();
}, 5000);

//This function retrieves the price data from a give currency
function getPrice(currency){
	$.ajax({
        type       : "GET",
        url        : "https://min-api.cryptocompare.com/data/pricemultifull",
        data       : {fsyms : currency, tsyms : 'EUR'},
        success    : function(response) {		
			
			//Store data
			currencies[currency]['PRICE'] = changeNotation(response['DISPLAY'][currency]['EUR']["PRICE"]);
			currencies[currency]['CHANGE24HOUR'] = changeNotation(response['DISPLAY'][currency]['EUR']["CHANGE24HOUR"]);
			currencies[currency]['CHANGEPCT24HOUR'] = changeNotation(response['DISPLAY'][currency]['EUR']["CHANGEPCT24HOUR"]);
			currencies[currency]['OPEN24HOUR'] = changeNotation(response['DISPLAY'][currency]['EUR']["OPEN24HOUR"]);
			currencies[currency]['HIGH24HOUR'] = changeNotation(response['DISPLAY'][currency]['EUR']["HIGH24HOUR"]);
			currencies[currency]['LOW24HOUR'] = changeNotation(response['DISPLAY'][currency]['EUR']["LOW24HOUR"]);
			currencies[currency]['VOLUME24HOUR'] = changeNotation(response['DISPLAY'][currency]['EUR']["VOLUME24HOUR"]);
			currencies[currency]['VOLUME24HOURTO'] = changeNotation(response['DISPLAY'][currency]['EUR']["VOLUME24HOURTO"]);
			currencies[currency]['TOTALVOLUME24H'] = changeNotation(response['DISPLAY'][currency]['EUR']["TOTALVOLUME24H"]);
			currencies[currency]['TOTALVOLUME24HTO'] = changeNotation(response['DISPLAY'][currency]['EUR']["TOTALVOLUME24HTO"]);
			currencies[currency]['MKTCAP'] = changeNotation(response['DISPLAY'][currency]['EUR']["MKTCAP"]);
			currencies[currency]['SUPPLY'] = changeNotation(response['DISPLAY'][currency]['EUR']["SUPPLY"]);
			
			//Update data on screen for the smaller div
			document.getElementById(currency+"price").innerHTML = currencies[currency]["PRICE"];
			document.getElementById(currency+"change24").innerHTML = currencies[currency]["CHANGE24HOUR"];
			document.getElementById(currency+"change24pct").innerHTML = currencies[currency]["CHANGEPCT24HOUR"];
			
			//Change color to red if change is negative
			if (changeNotation(currencies[currency]["CHANGEPCT24HOUR"]) < 0){
				document.getElementById(currency+"changeColor").className = "red";
			} else {
				document.getElementById(currency+"changeColor").className = "green";
			}

			//If there is no currency showed in the big div, then place this on in there, this is executed once
			if (document.getElementById("BIGfullName").innerHTML == ""){
				makeBig(currency);
			}

			if (oldBig == currency){
				makeBig(currency);
			}
        },
        error      : function() {
			error(currency);
        }
    });     
}

function getPrices(){
	for (var currency in currencies) {
		getPrice(currency);
	}
}

function error(currency){
	console.log("Er is iets misgegaan bij het ophalen van de gegevens van "+currency+". Probeer het later opnieuw.");
	if (document.getElementById(currency+"price").innerHTML == ""){
		document.getElementById(currency+"price").innerHTML = "?";
	}
}

function makeBig(currency){
	//Change border
	document.getElementById(oldBig).className = "col border-big price";
	oldBig = currency;
	document.getElementById(currency).className = "col border-big-pressed price";
	
	//Fil the div with the data
	document.getElementById("BIGfullName").innerHTML = currencies[currency]["FULLNAME"];
	document.getElementById("BIGfullName").style.color = currencies[currency]["COLOR"];
	document.getElementById("BIGtext24").style.borderBottom = "2px solid "+currencies[currency]["COLOR"];
	document.getElementById("BIGtextGeneral").style.borderBottom = "2px solid "+currencies[currency]["COLOR"];
	document.getElementById("BIGprice").innerHTML = currencies[currency]["PRICE"];
	document.getElementById("BIGchange24").innerHTML = currencies[currency]["CHANGE24HOUR"];
	document.getElementById("BIGchange24pct").innerHTML = currencies[currency]["CHANGEPCT24HOUR"];
	document.getElementById("BIGopen24").innerHTML = currencies[currency]["OPEN24HOUR"];
	document.getElementById("BIGvolume").innerHTML = currencies[currency]["VOLUME24HOUR"];
	document.getElementById("BIGvolumeEuro").innerHTML = currencies[currency]["VOLUME24HOURTO"];
	document.getElementById("BIGmktcap").innerHTML = currencies[currency]["MKTCAP"];
	document.getElementById("BIGsupply").innerHTML = currencies[currency]["SUPPLY"];
	
	$("#BIGimage").attr("src", "Files/"+currency+".png");
	$("#BIGimage2").attr("src", "Files/"+currency+".png");
	
	if (changeNotation(currencies[currency]["CHANGEPCT24HOUR"]) < 0){
		document.getElementById("BIGchangeColor").className = "red";
	} else {
		document.getElementById("BIGchangeColor").className = "green";
	}
}

function changeOverview(type){
	if (type == "day"){
		document.getElementById('news').className = "col menu-col";
		document.getElementById('day').className = "col menu-col selected";
		document.getElementById('newsView').style.display = "none";
		document.getElementById('dayView').style.display = "";
	} else if (type == "news"){
		document.getElementById('day').className = "col menu-col";
		document.getElementById('news').className = "col menu-col selected";
		document.getElementById('dayView').style.display = "none";
		document.getElementById('newsView').style.display = "";
	}
}

function getNews(){
	$.ajax({
        type       : "GET",
        url        : "https://newsapi.org/v2/top-headlines",
        data       : {sources : 'crypto-coins-news', apiKey : 'db7555205f424be499aa3ae6223e683d'},
        success    : function(response) {
			if (response['status'] == 'ok'){
				articles = response['articles'];
				for (var i = 0; i < articles.length - 1; i++){
					article = articles[i];
					document.getElementById('title'+i).innerHTML = article['title'];
					document.getElementById('picture'+i).src = article['urlToImage'];
					document.getElementById('description'+i).innerHTML = article['description'];
					document.getElementById('info'+i).innerHTML = article['author'];
					document.getElementById('newsBlock'+i).setAttribute( "onClick", "window.location.href = '"+article['url']+"';" );
				}
			}
        },
        error      : function() {
			console.log("Unable to retrieve news");
        }
    });     
}

function changeNotation(data){
	var string = data;
	
	string = string.replace(/[,.]/g, function (m) {
		// m is the match found in the string
		// If `,` is matched return `.`, if `.` matched return `,`
		return m === ',' ? '.' : ',';
	});
	
	return string;
}
