const totalCards = 20;
const availableCards = [{id:1, name:'shrimp', url:'assets/1.png'},{id:2, name:'fish', url:'assets/9.png'},{id:3, name:'donkey', url:'assets/3.png'},{id:4, name:'penguin', url:'assets/10.png'},{id:5, name:'bat', url:'assets/2.png'},{id:6, name:'chicken', url:'assets/7.png'},{id:7, name:'kangaroo', url:'assets/4.png'},{id:8, name:'bear', url:'assets/8.png'},{id:9, name:'deer', url:'assets/5.png'},{id:10, name:'fox', url:'assets/6.png'}];
const fruitCards= [{id:1, name:'apple', url:'assets/apple.png'},[{id:2, name:'avocado', url:'assets/avocado.png'}],[{id:3, name:'backberry', url:'assets/blackberry.png'}],[{id:4, name:'banana', url:'assets/banana.png'}],[{id:5, name:'blueberry', url:'assets/blueberry.png'}],[{id:6, name:'cherry', url:'assets/cherry.png'}],[{id:7, name:'grapes', url:'assets/grapes.png'}],[{id:8, name:'peach', url:'assets/peach.png'}],[{id:9, name:'tangerine', url:'assets/tangerine.png'}],[{id:10, name:'watermelon', url:'assets/watermelonS.png'}]]
const ProfessionsCards= [{id:1, name:'architect', url:'assets/architect.png'},{id:2, name:'astronaut', url:'assets/astronaut.png'},{id:3, name:'dentist', url:'assets/dentist.png'},{id:4, name:'doctor', url:'assets/doctor.png'},{id:5, name:'firefightert', url:'assets/firefighter.png'},{id:6, name:'lawyer', url:'assets/lawyer.png'},{id:7, name:'police', url:'assets/police.png'},{id:8, name:'soccer player', url:'assets/soccer player.png'},{id:9, name:'teacher', url:'assets/teacher.png'},{id:10, name:'vet', url:'assets/vet.png'}]
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"><img class="faceImage" src="" ></div></div>';

function activate(e) {
   if (currentMove < 2) {
      
      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active') ) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         if (++currentMove == 2) {

            currentAttempts++;
            document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

            if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
               selectedCards = [];
               currentMove = 0;
            }
            else {
               setTimeout(() => {
                  selectedCards[0].classList.remove('active');
                  selectedCards[1].classList.remove('active');
                  selectedCards = [];
                  currentMove = 0;
               }, 600);
            }
         }
      }
   }
}

function randomValue() {
   let rnd = Math.floor(Math.random() * totalCards * 0.5);
   let values = valuesUsed.filter(value => value === rnd);
   if (values.length < 2) {
      valuesUsed.push(rnd);
   }
   else {
      randomValue();
   }
}

function getFaceValue(value) {
   let rtn = value;
   if (value < availableCards.length) {
      rtn = availableCards[value].url;
   }
   return rtn;
}

for (let i=0; i < totalCards; i++) {
   let div = document.createElement('div');
   div.innerHTML = cardTemplate;
   cards.push(div);
   document.querySelector('#game').append(cards[i]);
   randomValue();
   cards[i].querySelectorAll('.faceImage')[0].setAttribute('src', getFaceValue(valuesUsed[i]))
   cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}
