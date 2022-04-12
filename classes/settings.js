let gameOptions = {
  gemSize: 100,
  fallSpeed: 100,
  destroySpeed: 200,
  offsetX: 50,
  offsetY: 250,
  rows: 9,
  cols: 7,
  gameMode: 'time', //moves, challenge
  defaultTime: 60,



}
let gameMode = 1
var onLevel = 0;
var onGroup = 0;
var win = false;
var puzzle;
let gameSettings;
var defaultValues = {
  mostDotsMoves: 0,
  mostDotsTime: 0,
  levelStatus: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  totalSquares: 0,
  group: 0,
  currentLevel: 0
}
let tileLettersValues = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10, 1, 1, 1, 1];

let lettersWeight =
  [
    ['a', 8.167],
    ['b', 1.492],
    ['c', 2.782],
    ['d', 4.253],
    ['e', 12.702],
    ['f', 2.228],
    ['g', 2.015],
    ['h', 6.094],
    ['i', 6.966],
    ['j', 0.153],
    ['k', 0.772],
    ['l', 4.025],
    ['m', 2.406],
    ['n', 6.769],
    ['o', 7.507],
    ['p', 1.929],
    ['q', 0.095],
    ['r', 5.987],
    ['s', 6.327],
    ['t', 9.056],
    ['u', 2.758],
    ['v', 0.978],
    ['w', 2.306],
    ['x', 0.150],
    ['y', 1.974],
    ['z', 0.074]
  ];


let tileLetters = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
  'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
  'w', 'x', 'y', 'z', 'e', 'a', 'r', 's', 'i', 't', 'o', 'n', 'h'
];