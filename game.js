//created variable for each box, grabbed by jquery selector
let box0 = $('#box0');
let box1 = $('#box1');
let box2 = $('#box2');
let box3 = $('#box3');
let box4 = $('#box4');
let box5 = $('#box5');
let box6 = $('#box6');
let box7 = $('#box7');
let box8 = $('#box8');

//assigned players to "teams"
let player1 = 'X';
let player2 = 'O';

//turn counter created to decide when it's time to check for winner and when to call it tie
let turn = 0;
//no winner is default and will be used to determine if a new round is needed, if winner status changes
let winner = false;

//alerts hidden and will show under certain conditions
$('#alertStart').hide();
$('#alertWinner').hide();
$('#alertDraw').hide();

//keeps track of current player
let currentPlayer = '';

// array containing multple arrays where if there is a match, a winner is declared
const winningOutcomes = [
    [box0, box1, box2], [box3, box4, box5], [box6, box7, box8],
    [box0, box3, box6], [box1, box4, box7], [box2, box5, box8],
    [box0, box4, box8], [box2, box4, box6]
];

//function that declares game is over, and removes turn signals
const endGame = () => {
    console.log('GAME OVER');
    $('.box').css('pointer-value', 'none');
    $('#p1').removeClass('bg-light border border-info');
    $('#p2').removeClass('bg-light border border-info');
};

//function where the parameters is the current player's team (X or O), and the three boxes its checking to see if it matches with one of the arrays in winningOutcomes array
const checkWinner = (currentPlayer, a, b, c) => {

    //if there is a match, that player is declared the winner
    if(a.text() === currentPlayer && b.text() === currentPlayer && c.text() === currentPlayer){
        winner = true;
        console.log(`Found winner, it's ${currentPlayer}!`);

        //removes classes from the winning boxes
        a.removeClass('text-info bg-dark');
        b.removeClass('text-info bg-dark');
        c.removeClass('text-info bg-dark');

        //adds classes to demonstrate which boxes won the game
        a.addClass('text-dark bg-info');
        b.addClass('text-dark bg-info');
        c.addClass('text-dark bg-info');

        //identifies who the winning player was
        if(currentPlayer === 'X'){
            currentPlayer = 'Player 1';
        } else {
            currentPlayer = 'Player 2';
        };

        //sets text in a hidden alert and then shows it
        $('#alertWinner').text(`GAME OVER... ${currentPlayer} WINS!`);
        $('#alertWinner').show();

        //endGame function is called
        endGame();
    };
};

//function that uses checkWinner function and checks every possible winning outcome
const checkOutcomes = () => {
    checkWinner(currentPlayer, ...winningOutcomes[0]);
    checkWinner(currentPlayer, ...winningOutcomes[1]);
    checkWinner(currentPlayer, ...winningOutcomes[2]);
    checkWinner(currentPlayer, ...winningOutcomes[3]);
    checkWinner(currentPlayer, ...winningOutcomes[4]);
    checkWinner(currentPlayer, ...winningOutcomes[5]);
    checkWinner(currentPlayer, ...winningOutcomes[6]);
    checkWinner(currentPlayer, ...winningOutcomes[7]);
};

//function that gets tied to eventListener of start button
const startGame = () => {
    //game is started, first turn is counted, and whom the opening turn belongs to is decided
    console.log('Start Game!');
    console.log(turn++);
    currentPlayer = player1;

    //background of player 1 changes to signal it's their turn
    $('#p1').addClass('bg-light border border-info');

    //hidden start alert is shown
    $('#alertStart').show();

    //function runs when one of the boxes on the grid is clicked
    $('.box').on('click', function () {

        //hides starting alert once the first turn is taken
        $('#alertStart').hide();

        //the team (X or O) of the player is printed in the box
        $(this).text(currentPlayer);

        //once the turn counter reaches the amount where a win is possible, it will check for the outcome every time
        if(turn > 4){
            checkOutcomes();
        };

        //if no winner is declared, move on the the next turn and demonstrates who's turn it is with css, and turn counter increases by one
        if(winner === false){
            if(currentPlayer === player1){
                currentPlayer = player2;
                console.log(turn++);
                $('#p2').addClass('bg-light border border-info');
                $('#p1').removeClass('bg-light border border-info');
            } else {
                currentPlayer = player1;
                console.log(turn++);
                $('#p1').addClass('bg-light border border-info');
                $('#p2').removeClass('bg-light border border-info');
            };
        };
        
        //if the max amount of possible turn (once all boxes are taken up), and no winner can be found, then game is ended as a draw, where hidden draw alert is shown
        if(turn === 10 && winner === false){
            endGame();
            $('#alertDraw').show();
        };
    });
};

//event listeners added to buttons so game can be started or reloaded
document.getElementById('startBtn').addEventListener('click', ()=> startGame());
document.getElementById('resetBtn').addEventListener('click', ()=> document.location.reload(true));