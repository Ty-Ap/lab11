'use strict';






// GLOBALS
let votingRounds = 25;
let productArray = [];


// DOMWINDOWS
let imgContainer = document.getElementById('img-container');

let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('rslts-btn');
// let resultsList = document.getElementById('rslts-cont');


// CONSTRUCTOR FUNCT
function Product(name, imgExtension = 'jpg'){
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
}



// UTILITIES/CHECKS










function randomIndex(){
  return Math.floor(Math.random() * productArray.length);
}

function renderImg(){
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();
  while(imgOneIndex===imgTwoIndex||imgOneIndex===imgThreeIndex||imgTwoIndex===imgThreeIndex){
    imgOneIndex = randomIndex();
    imgThreeIndex = randomIndex();
  }
  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;
  imgOne.title = productArray[imgOneIndex].name;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgThree.title = productArray[imgThreeIndex].name;
  imgOne.alt = `this is an image of ${productArray[imgOneIndex].name}`;
  imgTwo.alt = `this is an image of ${productArray[imgTwoIndex].name}`;
  imgThree.alt = `this is an image of ${productArray[imgThreeIndex].name}`;
  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;
}


function handleClick(event){
  let imgClicked = event.target.title;

  for(let i = 0; i < productArray.length; i++){
    if(imgClicked === productArray[i].name){
      productArray[i].votes++;
    }
  }
  votingRounds--;
  renderImg();

  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
}





let bagProduct = new Product('bag');
let bananaProduct = new Product('banana');
let bathroomProduct = new Product('bathroom');
let bootsProduct = new Product('boots');
let breakfastProduct = new Product('breakfast');
let bubblegumProduct = new Product('bubblegum');
let chairProduct = new Product('chair');
let cthulhuProduct = new Product('cthulhu');
let dogDuckProduct = new Product('dog-duck');
let dragonProduct = new Product('dragon');
let penProduct = new Product('pen');
let petSweepProduct = new Product('pet-sweep');
let scissorsProduct = new Product('scissors');
let sharkProduct = new Product('shark');
let sweepBabyProduct = new Product('sweepBaby', 'png');
let tauntaunProduct = new Product('tauntaun');
let unicornProduct = new Product('unicorn');
let waterCanProduct = new Product('water-can');
let wineGlassProduct = new Product('wine-glass');


productArray.push(bagProduct, bananaProduct, bathroomProduct, bootsProduct, breakfastProduct, bubblegumProduct, chairProduct, cthulhuProduct, dogDuckProduct, dragonProduct, penProduct, petSweepProduct, scissorsProduct, sharkProduct, sweepBabyProduct, tauntaunProduct, unicornProduct, waterCanProduct, wineGlassProduct);





let canvasElem = document.getElementById('mychart');

function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];
  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].name);
    productVotes.push(productArray[i].votes);
    productViews.push(productArray[i].views);
    let chartObj = {
      type: 'bar',
      data: {
        labels: this.productNames,
        datasets: [{
          label: '# of Votes',
          data: productVotes,
          borderWidth: 1,
          backgroundColor: 'pink'
        },
        {
          label: '# of Views',
          data: this.productViews,
          borderWidth: 1,
          backgroundColor: 'white'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    new Chart(canvasElem, chartObj);
  }
}


renderImg();

function handleShowResults(){
  if(votingRounds === 0){
    renderChart();
  }
}

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);


// vote/view * 100 = percent unsure of scope.


// - allow voting on imgx1week
// - get totals
// - graph after
// - also the percentage of times that an item was clicked when it was shown.
// - custom font, color palette, layout with semantic HTML, and so on
