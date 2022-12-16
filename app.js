'use strict';






// GLOBALS
let votingRounds = 25;
let productArray = [];


// DOMWINDOWS
let imgContainer = document.getElementById('img-container');

let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

// let resultsBtn = document.getElementById('rslts-btn');
// let resultsList = document.getElementById('rslts-cont');


// CONSTRUCTOR FUNCT
function Product(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
  Product.productArray.push(this);
}

Product.productArray = [];

// UTILITIES/CHECKS









// random number function
function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}


let indexArray = [];

// image file population
function renderImg() {

  while (indexArray.length < 6) {
    let randomNum = randomIndex();
    if (!indexArray.includes(randomNum)) {
      indexArray.push(randomNum);
    }
  }
  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

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

// handles voting clicks and calls graph after voting comcludes
function handleClick(event) {
  let imgClicked = event.target.title;

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].votes++;
    }
  }
  votingRounds--;
  renderImg();

  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);
    renderChart();

    let savedProducts = JSON.stringify(productArray);
    localStorage.setItem('products',savedProducts);
  }
}

//graph function, uses chart.js external library.
function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];
  for (let i = 0; i < Product.productArray.length; i++) {
    productNames.push(Product.productArray[i].name);
    productVotes.push(Product.productArray[i].votes);
    productViews.push(Product.productArray[i].views);
  }

  const data = {
    labels: productNames,
    datasets: [{
      label: 'Likes',
      data: productVotes,
      backgroundColor: [
        'rgb(255,244,51)'
      ],
      borderColor: [
        'rgb(255,255,255)'
      ],
      borderWidth: 2
    },
    {
      label: 'Views',
      data: productViews,
      backgroundColor: [
        'rgb(155,89,208)'
      ],
      borderColor: [
        'rgb(255,255,255)'
      ],
      borderWidth: 2
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  let canvasChart = document.getElementById('myChart');
  const myChart = new Chart(canvasChart, config);
}


//cache storage and retrieval
let fetchedProducts = localStorage.getItem('products');
let parsedProducts = JSON.parse(fetchedProducts);

//using constructor to generate products and their img files
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

//pushes products into initialized global variable array
productArray.push(bagProduct, bananaProduct, bathroomProduct, bootsProduct, breakfastProduct, bubblegumProduct, chairProduct, cthulhuProduct, dogDuckProduct, dragonProduct, penProduct, petSweepProduct, scissorsProduct, sharkProduct, sweepBabyProduct, tauntaunProduct, unicornProduct, waterCanProduct, wineGlassProduct);







//if there are is a history in the cache, re-intigrate stored votes and views for each product.
if (parsedProducts) {
  for (let i = 0; i < productArray.length; i++){
    productArray[i].votes = parsedProducts[i].votes;
    productArray[i].views = parsedProducts[i].views;
  }
}


//calling render function and click/handleclick
renderImg();
imgContainer.addEventListener('click', handleClick);


