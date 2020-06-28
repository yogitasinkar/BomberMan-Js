const $board = $("#board");
let bombs = null;
let score = 0;
const Rows = 9;
const Cols = 9;

function setBombs(){
  while(bombs.size !== 10) {
    bombs.add(Math.floor(Math.random() * 81));
  }
  console.log(bombs)
}

function createBoard(r,c) {
  $board.empty();
  let x = -1
  let board = $("#board");

  let table = $('<table>')
  table.border='1';

  let tableBody = $('<tbody>')
  table.append(tableBody);

  for (var i=0; i<r; i++){
     let tr = $('<tr>');
     tableBody.append(tr);

     for (var j=0; j<c; j++){
        x+=1;
         let td = $('<td>').attr('x',x).attr('id',i+""+j).attr('row',i).attr('col',j)

        //td.text("Cell " + i + "," + j);
        if(bombs.has(x)){
          td.addClass('bomb');
        }
         tr.append(td);
     }
  }
  board.append(table);
}

function start(){
  score = 0
  $("#score").text(score)
  //$(".Restart").hide();
  $("#msg").text("");
  bombs = new Set();
  setBombs();
  createBoard(Rows,Cols)
}

function gameOver(isWin){
  if(isWin){
    $("#msg").text("Congratulations you won the game! Play Again?");
    $("#msg").css({
      color:'green'
    })
  } else{
    $("#msg").text("You lost! Restart?");
    $("#msg").css({
      color:'indianred'
    })
    $(".bomb").css({
      background:'indianred'
    })
    $(".bomb").text("💣")
  }

  $('td').css({
    'pointer-events':'none'
  })

  $(".Restart").show();
}

start();
//$(".Restart").hide();


function showNumOfBombs(r,c,id) {
    let numBombs = 0;
    let above_id = `${r-1}${c}`;
    let above_right_id = `${r-1}${c+1}`;
    let above_left_id = `${r-1}${c-1}`;
    let right_id = `${r}${c+1}`;
    let below_id = `${r+1}${c}`;
    let below_right_id =`${r+1}${c+1}`;
    let below_left_id = `${r+1}${c-1}`;
    let left_id  = `${r}${c-1}`;
    console.log()
    if($("#"+above_id).hasClass('bomb')){
      numBombs+=1;
    }
    if($("#"+above_right_id).hasClass('bomb')){
      numBombs+=1;
    }
    if($("#"+above_left_id).hasClass('bomb')){
      numBombs+=1;
    }
    if($("#"+right_id).hasClass('bomb') ){
      numBombs+=1;
    }
    if($("#"+below_id).hasClass('bomb')){
      numBombs+=1;
    }
    if($("#"+below_right_id).hasClass('bomb')){
      numBombs+=1;
    }
    if($("#"+below_left_id).hasClass('bomb')){
      numBombs+=1;
    }
    if($("#"+left_id).hasClass('bomb')){
      numBombs+=1;
    }

  console.log('numb',numBombs);
  return numBombs;
}

$board.on('click', 'td', function() {
  console.log(this);
  const cell = $(this)

  const r = $(cell).attr('row');
  const c = $(cell).attr('col');
  const id = $(cell).attr('id');

  if(cell.hasClass('bomb')){
    gameOver(false);
  } else{
    let numBombs = showNumOfBombs(parseInt(r),parseInt(c),parseInt(id))
    cell.text(numBombs)
    score+=1;
    $(cell).css({
      background : 'slategray',
      opacity: '0.9',
      color: 'white'
    })

    if(score == 71){
      gameOver(true)
    }
  }
    $("#score").text(score)

})

$('td').contextmenu(function(e) {
  const cell = $(this)
  cell.text("❗");
  e.preventDefault();
});
