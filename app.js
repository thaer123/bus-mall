'use strict';

//global variables:
// var ctx = document.getElementById("main-content");
var ctx = document.getElementById("myChart").getContext('2d');
var totalClicks = 0; // clicks on images
var firstImg = document.getElementById('first');
var secondImg = document.getElementById('second');
var thirdImg = document.getElementById('third');
 var results = document.getElementById('result'); //declare the variable results to find results in html
var lastShownImages = [];

//set the foundation constructor 
var allProducts = [];

//Constructor function for 'Product' objects:
function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.views = 0; 
this.votes=0;

  var cOne = Math.floor(Math.random() * 255);
  var cTwo = Math.floor(Math.random() * 255);
  var cThree = Math.floor(Math.random() * 255);

  this.bgColor = `rgba(${cOne}, ${cTwo}, ${cThree}, 0.2)`;
  allProducts.push(this);  
}
// Creating local storage/////////////////////////////////////////////////////
function createLocalStorage(){
  var stringifiedImageArray = JSON.stringify(productVotes);
  localStorage.setItem('store votes', votes);
}

if (localStorage.productVotes) { //Is there a truthy value on the key in empty storage?
  allProducts = JSON.parse(localStorage.getItem('productVotes'));//look for the key 'produc'
}else{
  new Product('bag', './assets/bag.jpg');
  new Product('banana', './assets/banana.jpg');
  new Product('bathroom', './assets/bathroom.jpg');
  new Product('boots', './assets/boots.jpg');
  new Product('breakfast', './assets/breakfast.jpg');
  new Product('bubblegum', './assets/bubblegum.jpg');
  new Product('chair', './assets/chair.jpg');
  new Product('cthulhu', './assets/cthulhu.jpg');
  new Product('dog-duck', './assets/dog-duck.jpg');
  new Product('dragon', './assets/dragon.jpg');
  new Product('pen', './assets/pen.jpg');
  new Product('pet-sweep', './assets/pet-sweep.jpg');
  new Product('scissors', './assets/scissors.jpg');
  new Product('shark', './assets/shark.jpg');
  new Product('sweep', './assets/sweep.png');
  new Product('tauntaun', './assets/tauntaun.jpg');
  new Product('unicorn', './assets/unicorn.jpg');
  new Product('usb', './assets/usb.gif');
  new Product('water-can', './assets/water-can.jpg');
  new Product('wine-glass', './assets/wine-glass.jpg');
}

//create a random image function:
function randomImage() {
  var firstRandom = Math.floor(Math.random() * allProducts.length);
  var secondRandom = Math.floor(Math.random() * allProducts.length);
  var thirdRandom = Math.floor(Math.random() * allProducts.length);

  while (firstRandom === secondRandom || firstRandom === thirdRandom || secondRandom === thirdRandom || lastShownImages.includes(firstRandom) || lastShownImages.includes(secondRandom) || lastShownImages.includes(thirdRandom)) {
    firstRandom = Math.floor(Math.random() * allProducts.length);
    secondRandom = Math.floor(Math.random() * allProducts.length);
    thirdRandom = Math.floor(Math.random() * allProducts.length);
  }
  //once the while loop stops running update the array 
  lastShownImages[0] = firstRandom;
  lastShownImages[1] = secondRandom;
  lastShownImages[2] = thirdRandom;

  firstImg.src = allProducts[firstRandom].imgPath;
  secondImg.src = allProducts[secondRandom].imgPath;
  thirdImg.src = allProducts[thirdRandom].imgPath;

  //increment the clicker counter
  firstImg.alt = allProducts[firstRandom].name;
  secondImg.alt = allProducts[secondRandom].name;
  thirdImg.alt = allProducts[thirdRandom].name;

  //update the view count after the user is shown a photo and increment it by 1
  allProducts[firstRandom].views++;
  allProducts[secondRandom].views++;
  allProducts[thirdRandom].views++;

  //everytime a random image is called 'totaClicks' increments
  totalClicks++;
  //to stop running on 25
  if (totalClicks === 25) {
    firstImg.removeEventListener('click', handleImageClick);
    secondImg.removeEventListener('click', handleImageClick);
    thirdImg.removeEventListener('click', handleImageClick);
    displayResults(); //call result

    localStorage.setItem('productVotes', JSON.stringify(allProducts)); //is there a truthy value on the key ('productVotes') in empty storage?
  
  }

}
function handleImageClick(event) {
 
  for (var i = 0; i < allProducts.length; i++) {
    if (event.target.alt === allProducts[i].name) {
      allProducts[i].votes++;
      // createLocalStorage();// creat locla storage for votes
    }
  }
  
  randomImage();
}

randomImage();
//generate a string for every object
function displayResults() {

// var ul1=document.getElementById('result');
// for (var i = 0; i < allProducts.length; i++) {
// var li=document.createElement('li');
// li.textContent= `${allProducts[i].name} has ${allProducts[i].views} views and ${allProducts[i].votes} clicks`;
// ul1.append(li);

//   }

var names = [];
var votes = [];
var colors=[];
for (var i = 0; i < allProducts.length; i++) {
  names.push(allProducts[i].name);
  votes.push(allProducts[i].votes);
  colors.push(allProducts[i].bgColor);
}





var chartConfig = {
  type: 'bar',
  data: {
    labels: names,
    datasets: [{
      label: '# of votes',
      data: votes,
      
      // labels:'# of clicks',
      // data:views,
      backgroundColor: colors,
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
};

return new Chart(ctx, chartConfig);
}



//add event listeners
firstImg.addEventListener('click', handleImageClick);
secondImg.addEventListener('click', handleImageClick);
thirdImg.addEventListener('click', handleImageClick);
//  localStorage();