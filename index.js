const baseURL = "https://min-api.cryptocompare.com/data/"
const cryptoURL = baseURL + "pricemulti?fsyms=BTC,LTC,ETH,QTUM,GEO,BTG,ETC,XRP,SWIFT,OMNI,IOT,XEM,DASH,BCH,ZEC&tsyms=USD&extraParams=your_app_name";
const startsURL = baseURL + "pricemultifull?fsyms=BTC&tsyms=USD";
const calcExchangeURL = baseURL + "price?fsym=BTC&tsyms=USD,GBP,CNY,JPY,EUR,TWD,JPY,RUB,CHF,CAD,AUD,SGD";
const newsURL = "https://newsapi.org/v2/top-headlines?q=bitcoin&sortBy=popularity&language=en&apiKey=29b9b388e7c142329c131bb139ff5429";

function handleNavigation() {
   // select nav elements on"click'
   $("nav a").click(function(event) {
      //prevent default
      event.preventDefault();
      //current page is current target using data method 
      const currentPage = $(this).data("page");
      //hiding elements using class
      $(".page").hide();
      //display current page
      $(`.${currentPage}`).show();
   });
}
//navigation slide 
function openNav() {
   document.getElementById("mySidenav").style.width = "15%";
   document.getElementById("main").style.marginLeft = "15%";
}

// Clear form values
function resetBitcoinExchange() {
   $("#bitcoinAmount").val('');
   $("#btnCalculateRates").show();
}
//show landing page
function showStartPage() {
   $(".page").hide();
   $(".start-page").show();
}

function setEventListeners() {
   handleNavigation();
}
//get data for landing page from api and display
function fetchOnScreenLoad() {
   $.getJSON(startsURL, function(data) {
      showFirstValueOnScreenLoad(data);
   });
}

function showFirstValueOnScreenLoad(results) {
   var firstValue = results.RAW.BTC.USD.PRICE;
   $(`.firstValue`).text("Bitcoin current value: $" + firstValue.toFixed(2));
   let openday = results.RAW.BTC.USD.OPENDAY;
   $(`#openday`).text("$" + openday.toFixed(2));
   let todaysHigh = results.RAW.BTC.USD.HIGHDAY;
   $(`#todaysHigh`).text("$" + todaysHigh.toFixed(2));
   let todaysLow = results.RAW.BTC.USD.LOWDAY;
   $(`#todaysLow`).text("$" + todaysLow.toFixed(2));
   let twentyfour = results.RAW.BTC.USD.CHANGEDAY;
   $(`#twentyfour`).text("$" + twentyfour.toFixed(2));
   let pctChange = results.RAW.BTC.USD.CHANGEPCTDAY;
   $(`#pctChange`).text(pctChange.toFixed(2) + "%");
   let supply = results.RAW.BTC.USD.SUPPLY;
   $(`#supply`).text(supply);
   let marketCap = results.RAW.BTC.USD.MKTCAP;
   $(`#marketCap`).text(marketCap.toFixed(1));
}

// Get cryptocurrency exchange rates from api and display 
function fetchCryptoExchangeRates() {
   $.getJSON(cryptoURL, function(data) {
      showCryptoExchangeRates(data);
   });
}

function showCryptoExchangeRates(results) {
   let lite = results.LTC.USD;
   $(`#lite`).text("$" + lite.toFixed(2));
   let iot = results.IOT.USD;
   $(`#IOT`).text("$" + iot.toFixed(2));
   let omni = results.OMNI.USD;
   $(`#OMNI`).text("$" + omni);
   let swift = results.SWIFT.USD;
   $(`#SWIFT`).text("$" + swift.toFixed(2));
   let qtum = results.QTUM.USD;
   $(`#QTUM`).text("$" + qtum.toFixed(2));
   let xem = results.XEM.USD;
   $(`#XEM`).text("$" + xem.toFixed(2));
   let zec = results.ZEC.USD;
   $(`#ZEC`).text("$" + zec.toFixed(2));
   let bch = results.BCH.USD;
   $(`#BCH`).text("$" + bch.toFixed(2));
   let eth = results.ETH.USD;
   $(`#ETH`).text("$" + eth);
   let btg = results.BTG.USD;
   $(`#BTG`).text("$" + btg.toFixed(2));
   let geo = results.GEO.USD;
   $(`#GEO`).text("$" + geo.toFixed(2));
   let etc = results.ETC.USD;
   $(`#ETC`).text("$" + etc);
   let xrp = results.XRP.USD;
   $(`#XRP`).text("$" + xrp);
}
//get and display exchange rate data using user-supplied params
function fetchBitcoinExchangeData() {
   const amount = $("input[name=bitcoinAmount]");
   const amountValue = amount.val();

   $.getJSON(calcExchangeURL, function(data) {
      showBitcoinExchangeData(data)
   })
}

function showBitcoinExchangeData(results) {
   const amount = $("input[name=bitcoinAmount]").val();
   let usd = results.USD;
   let usd2 = (usd * amount);
   $(`#USD`).text("$" + usd2.toFixed(2));
   let gbp = results.GBP;
   let gbp2 = (gbp * amount);
   $(`#GBP`).text("£" + gbp2.toFixed(2));
   let cny = results.CNY;
   let cny2 = (cny * amount);
   $(`#CNY`).text("¥" + cny2);
   let jpy = results.JPY;
   let jpy2 = (jpy * amount);
   $(`#JPY`).text("¥" + jpy2);
   let eur = results.EUR;
   let eur2 = (eur * amount);
   $(`#EUR`).text("€" + eur2.toFixed(2));
   let twd = results.TWD;
   let twd2 = (twd * amount);
   $(`#TWD`).text("$" + twd2.toFixed(2));
   let rub = results.RUB;
   let rub2 = (rub * amount);
   $(`#RUB`).text("₽" + rub2.toFixed(2));
   let chf = results.CHF;
   let chf2 = (chf * amount);
   $(`#CHF`).text("$" + chf2.toFixed(2));
   let aud = results.AUD;
   let aud2 = (aud * amount);
   $(`#AUD`).text("$" + aud2.toFixed(2));
   renderExchangeResults()
}
//clear out value of input box
function renderExchangeResults() {
   $("#bitcoinAmount").val("");
}

function showNewsPage() {
   $(".start-page").hide();
   $(".history-page").hide();
   $(".crypto-page").hide();
   $(".calc-page").hide();
   $(".news-page").show();
   getNews();
}
//get news stories from API
function getNews() {
   $.getJSON(newsURL, function(data) {
      showNews(data);
   });
}
//render news thumbnails to page
function showNews(results) {
   let article = `
   
   <a class="link" href="${results.articles[0].urlToImage}" target="_blank"><img class="thumb" src="${results.articles[0].urlToImage}"></a><br />
   
   <a class="title" href="${results.articles[0].urlToImage}" target="_blank">${results.articles[0].title}<alt="${results.articles[0].description}"></a><br /><br /><br />
   
   
   <a class="link" href="${results.articles[1].urlToImage}" target="_blank"><img class="thumb" src="${results.articles[1].urlToImage}"></a><br />
   
   <a class="title" href="${results.articles[1].urlToImage}" target="_blank">${results.articles[1].title} <alt="${results.articles[1].description}"></a><br /><br /><br />
   
 
   <a class="link" href="${results.articles[2].urlToImage}" target="_blank"><img class="thumb" src="${results.articles[2].urlToImage}"></a><br />
   
   <a class="title" href="${results.articles[2].urlToImage}" target="_blank">${results.articles[2].title}<alt="${results.articles[2].description}"></a><br /><br /><br />
 
 
   <a class="link" href="${results.articles[3].urlToImage}" target="_blank"><img class="thumb" src="${results.articles[3].urlToImage}"></a><br />
   
   <a class="title" href="${results.articles[3].urlToImage}" target="_blank">${results.articles[3].title}<alt="${results.articles[3].description}"></a><br /><br />
   
   `;
   $(".stories").html(article);
}
// On load event:
$(() => {
   setEventListeners();
   fetchOnScreenLoad();
   showStartPage();
   openNav();
})