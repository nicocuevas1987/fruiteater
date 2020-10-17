function Game() {
  let loopRender = null;
  let loopMoveGhost = null;
  let map = null;
  const playerData = JSON.parse(localStorage.getItem('playerData'));
  const $game = document.querySelector("#game");
  const $score = document.querySelector("#score");
  const $controlButtons = document.querySelector(".controlls");
  

  /* const map = [function startGame() {
    loopRender = setInterval(function(){
      render();
    },100);
  
    loopMoveGhost = setInterval(function(){
      moveGhost();
    },500);
  }

  function endGame() {
    clearInterval(loopRender);
    clearInterval(loopMoveGhost);
  },0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ]; */

  const levels = {
    one:{
      name: "Nivel Uno",
      map: [
        [2,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0],
        [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0],
        [0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,1,0,0],
        [0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,1,0,1,0,0],
        [0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,4,0,0,0,0,0,0,0,0],
      ],
    },
    two:{
      name: "Nivel 2",
      map:[
        [2,0,0,0,3,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0],
        [0,0,1,0,0,1,0,0,3,0,1,0,0,0,0,0,0,1,0,0],
        [0,0,1,0,0,0,1,0,0,0,1,1,4,0,3,0,0,1,0,0],
        [0,1,1,1,1,0,1,0,0,0,0,3,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,1,1,0,4,3,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,0,1,0,0,1,0,0,3,1,0,1,0,0],
        [0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,3],
        [3,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,3,0],
        [0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,1,1,1,0,0,0,0,4,0,1,1,1,0,0,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,3,0,0,0,0,0,1,4,0,0,0,0,0,0,0,3],
      ]
    }
    
  };


  function render () {
    $game.innerHTML = '';
    for (let i=0; i < map.length; i++) {
      const $row = document.createElement('div');
      $row.classList.add('row');
      for (let j=0; j < map[i].length; j++) {
        const el = document.createElement('div');
        el.row = i;
        el.col = j;
        if (map[i][j] === 0) {
          el.classList.add('field');
        } else if (map[i][j] === 1) {
          el.classList.add('wall');
        } else if (map[i][j] === 2) {
          el.classList.add('pacman');
        } else if (map[i][j] === 3) {
          el.classList.add('fruit');
        }
        else if (map[i][j] === 4) {
          el.classList.add('ghost');
        }
        $row.appendChild(el);
      }
      $game.appendChild($row);
    }
    checkFruit();
  }


  function checkFruit(){
    const totalFruitLevel = document.querySelectorAll('.fruit').length;
    if (!totalFruitLevel) {
      stopGame();
      UIkit.modal.prompt('Nombre:', 'Escribe tu nombre Aqui!')
      .then(function(nombre) {
        const playerData = JSON.parse(localStorage.getItem('playerData'));
        playerData.playerName = nombre;
        localStorage.setItem('playerData', JSON.stringify(playerData));
        destroyRender();
        MainApp();
      }, function () {
        MainApp();
      });
    }
  }


  function changeGhostPosition ($ghost, $pacman) {
    if ($ghost.row < $pacman.row) {
      const topEl = map[$ghost.row+1][$ghost.col];
      if (topEl !== 1) {
        map[$ghost.row][$ghost.col] = 0
        $ghost.row++;
      } else {
        const rightEl = map[$ghost.row][$ghost.col+1];
        const leftEl = map[$ghost.row][$ghost.col-1];
        if (rightEl !== 1) {
          map[$ghost.row][$ghost.col] = 0
          $ghost.col++;
        } else if (leftEl !== 1) {
          map[$ghost.row][$ghost.col] = 0
          $ghost.col--;
        }
      }
    } else if ($ghost.row > $pacman.row) {
      const bottomEl = map[$ghost.row-1][$ghost.col];
      if (bottomEl !== 1) {
        map[$ghost.row][$ghost.col] = 0
        $ghost.row--;
      } else {
        const rightEl = map[$ghost.row][$ghost.col+1];
        const leftEl = map[$ghost.row][$ghost.col-1];
        if (rightEl !== 1) {
          map[$ghost.row][$ghost.col] = 0
          $ghost.col++;
        } else if (leftEl !== 1) {
          map[$ghost.row][$ghost.col] = 0
          $ghost.col--;
        }
      }
    } else if ($ghost.col < $pacman.col) {
        const rightEl = map[$ghost.row][$ghost.col+1];
        if (rightEl !== 1) {
          map[$ghost.row][$ghost.col] = 0
          $ghost.col++;
        } else {
          const topEl = map[$ghost.row+1][$ghost.col];
          const bottomEl = map[$ghost.row-1][$ghost.col];
          if (topEl !== 1) {
            map[$ghost.row][$ghost.col] = 0
            $ghost.row++;
          } else if (bottomEl !== 1) {
            map[$ghost.row][$ghost.col] = 0
            $ghost.row--;
          }
        }
      } else if ($ghost.col > $pacman.col) {
        const leftEl = map[$ghost.row][$ghost.col-1];
        if (leftEl !== 1) {
          map[$ghost.row][$ghost.col] = 0
          $ghost.col--;
        } else {
          const topEl = map[$ghost.row+1][$ghost.col];
          const bottomEl = map[$ghost.row-1][$ghost.col];
          if (topEl !== 1) {
            map[$ghost.row][$ghost.col] = 0
            $ghost.row--;
          } else if (bottomEl !== 1) {
            map[$ghost.row][$ghost.col] = 0
            $ghost.row++;
          }
        }
      }
  }

  function moveGhost () {
    const $ghost = document.querySelector(".ghost");
    const $pacman = document.querySelector(".pacman");
    changeGhostPosition($ghost, $pacman);
    map[$ghost.row][$ghost.col] = 4
  }

  function addScore(elValue){
    if (elValue === 3){
      playerData.score+= 100;
      localStorage.setItem('playerData', JSON.stringify(playerData));
      $score.innerHTML=`<h4>${playerData.score}</h4>`;
    }
  }


  //  eventos del teclado
  window.onkeypress = function(event) {
    const $pacman = document.querySelector(".pacman");
    const keyCode = event.keyCode;
    if (keyCode === 97 && $pacman.col > 0) {
      // letra A teclado
      const leftEl = map[$pacman.row][$pacman.col-1];
      if (leftEl !== 1) {
        map[$pacman.row][$pacman.col] = 0
        $pacman.col--;
        addScore(map[$pacman.row][$pacman.col]);
        map[$pacman.row][$pacman.col] = 2

      }
    } else if (keyCode === 100 && $pacman.col < map[$pacman.row].length -1) {
      // letra D teclado
      const rightEl = map[$pacman.row][$pacman.col+1];
      if (rightEl !== 1) {
        map[$pacman.row][$pacman.col] = 0
        $pacman.col++;
        addScore(map[$pacman.row][$pacman.col]);
        map[$pacman.row][$pacman.col] = 2
      }
    } else if (keyCode === 119 && $pacman.row > 0) {
      // letra W teclado
      const topEl = map[$pacman.row-1][$pacman.col];
      if (topEl !== 1) {
        map[$pacman.row][$pacman.col] = 0
        $pacman.row--;
        addScore(map[$pacman.row][$pacman.col]);
        map[$pacman.row][$pacman.col] = 2
      }
    } else if (keyCode === 115 && $pacman.row < map.length -1) {
      // letra S teclado
      const bottomEL = map[$pacman.row+1][$pacman.col];
      if (bottomEL !== 1) {
        map[$pacman.row][$pacman.col] = 0
        $pacman.row++;
        addScore(map[$pacman.row][$pacman.col]);
        map[$pacman.row][$pacman.col] = 2
      }
    }
  };


  //  eventos de los controles
  function handleStart(event){
    event.preventDefault();
    const $btn = event.target;
    const keyCode = $btn.dataset && $btn.dataset.btn;
    const $pacman = document.querySelector(".pacman");
    if (keyCode === 'LEFT' && $pacman.col > 0) {
      // letra A teclado
      const leftEl = map[$pacman.row][$pacman.col-1];
      if (leftEl !== 1) {
        map[$pacman.row][$pacman.col] = 0
        $pacman.col--;
        addScore(map[$pacman.row][$pacman.col]);
        map[$pacman.row][$pacman.col] = 2
      }
    } else if (keyCode === 'RIGHT' && $pacman.col < map[$pacman.row].length -1) {
      // letra D teclado
      const rightEl = map[$pacman.row][$pacman.col+1];
      if (rightEl !== 1) {
        map[$pacman.row][$pacman.col] = 0
        $pacman.col++;
        addScore(map[$pacman.row][$pacman.col]);
        map[$pacman.row][$pacman.col] = 2
      }
    } else if (keyCode === 'UP' && $pacman.row > 0) {
      // letra W teclado
      const topEl = map[$pacman.row-1][$pacman.col];
      if (topEl !== 1) {
        map[$pacman.row][$pacman.col] = 0
        $pacman.row--;
        addScore(map[$pacman.row][$pacman.col]);
        map[$pacman.row][$pacman.col] = 2
      }
    } else if (keyCode === 'DOWN' && $pacman.row < map.length -1) {
      // letra S teclado
      const bottomEL = map[$pacman.row+1][$pacman.col];
      if (bottomEL !== 1) {
        map[$pacman.row][$pacman.col] = 0
        $pacman.row++;
        addScore(map[$pacman.row][$pacman.col]);
        map[$pacman.row][$pacman.col] = 2
      }
    }
  }
  $controlButtons.addEventListener("click", handleStart, false);


  function startGame() {
    $game.parentElement.classList.remove('hide');
    loopRender = setInterval(function(){
      render();
    },100);
  
    loopMoveGhost = setInterval(function(){
      moveGhost();
    },500);
  }

  function stopGame() {
    clearInterval(loopRender);
    clearInterval(loopMoveGhost);
  }

  function destroyRender(){
    $game.innerHTML = '';
  }

  return {
    startGame: startGame,
    stopGame: stopGame,
    getLevels: function(){
      return ["one", "two"] ;
    },
    setLevel: function(level){
      map = levels[level].map;
    },
    destroy: destroyRender
  }
}
 

function createStorage(){
  if(window.localStorage && !localStorage.getItem('playerData')){
    const playerData = {
      score: 0,
      level: 'one',
      playerName: ''
    }
    localStorage.setItem('playerData', JSON.stringify(playerData));
  }
}

function MainApp() {
  createStorage();
  const $app = document.getElementById('app');
  const appTemplate = `
    <div class="uk-width-1-1 hide">
      <div id="game"></div>
      <div class="game--controlls">

      <div class="controlls">
          <button data-btn="UP" class="controlls--btn">
            ↑
          </button>
          <button data-btn="RIGHT" class="controlls--btn">
            →
          </button>
          <button data-btn="LEFT" class="controlls--btn">
           ←
          </button>
          <button data-btn="DOWN" class="controlls--btn">
            ↓
          </button>
        </div>
        <div id="score"></div>
      </div>
    </div>
    <div class="uk-width-1-1 main-menu">
      <div class="uk-child-width-1-2@m" uk-grid>
          <div>
              <div class="uk-card uk-card-default">
                  <div class="uk-card-media-top">
                      <img src="./img/pac-man.jpg" alt="">
                  </div>
                  <div class="uk-card-body">
                      <h3 class="uk-card-title">Fruit Eater</h3>
                  </div>
              </div>
          </div>
          <button type="button" class="nes-btn is-primary uk-padding-small" name="start">Start</button>
          <button type="button" class="nes-btn is-primary uk-padding-small" name="options">Options</button>
      </div>
    </div>
  `;
  $app.innerHTML = appTemplate;
  const $mainMenu = document.querySelector(".main-menu");
  $mainMenu.onclick = function(event){
    const game = Game();
    const $target = event.target;
    if ($target.name === 'start') {
      $mainMenu.classList.add('hide');
      game.setLevel('one');
      game.startGame();
    } else if ($target.name === 'options') {
      $mainMenu.classList.add('hide');
      alert("mostrar menu")
    }
  };


}


window.onload = function(event){
  MainApp();
}

