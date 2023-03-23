let listPlayer = JSON.parse(localStorage.getItem("listPlayer"));
function addButton() {
    console.log("11111");
    let namePlayer = document.getElementById("name").value;
    let score = 0;
    let player = {
        name: namePlayer,
        score: score,
    };
    if (listPlayer == null) {
        listPlayer = [];
        listPlayer.push(player);
        localStorage.setItem("listPlayer", JSON.stringify(listPlayer));
    } else {
        listPlayer.push(player);
        localStorage.setItem("listPlayer", JSON.stringify(listPlayer));
    }
    renderPlayer();
    renderCount();
}

let seconds = 0;
let intervalId;
let isRunning = false;

function startStopwatch() {
    if (!isRunning) {
        intervalId = setInterval(function () {
            seconds++;
            document.getElementById('stopwatch').innerHTML = seconds;
        }, 1000);
        isRunning = true;
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    seconds = 0;
    isRunning = false;
    document.getElementById('stopwatch').innerHTML = seconds;
}

function deletePlayer(id) {
    listPlayer.splice(id, 1);
    localStorage.setItem("listPlayer", JSON.stringify(listPlayer));
    renderPlayer();
    renderCount();
}


function renderPlayer() {
    let result = "";
    for (i = 0; i < listPlayer.length; i++) {
        result += `
            <tr>
                <td><button onclick="deletePlayer(${i})">X</button>
                <i class="fa-regular fa-crown fa-solid fa-crown onclick="crown()" id="crown"></i></td>
                <td>${listPlayer[i].name}</td>
                <td><button onclick="downPlayer(${i})">-</button></td>
                <td>${listPlayer[i].score}</td>
                <td><button onclick="upPlayer(${i})">+</button></td>
            </tr>
            `;
    }
    document.getElementById("result").innerHTML = result;
}
// let flagCrown = 0;
// function crown() {
//     let listPlayer = JSON.parse(localStorage.getItem("listPlayer"));
//     const crownIcon = document.getElementById('crown-icon');
//     let max=listPlayer[0].score;
//     var positions = [];
//   for (i=0;i<listPlayer.length;i++){
//     if(listPlayer[i].score>max){
//         max=listPlayer[i].score;
//         positions.push(c);
//     }
//   }
//   console.log(positions);

// }
function upPlayer(index) {
    listPlayer[index].score++;
    localStorage.setItem("listPlayer", JSON.stringify(listPlayer));
    renderPlayer();
    renderCount();
}

function downPlayer(index) {
    listPlayer[index].score--;
    localStorage.setItem("listPlayer", JSON.stringify(listPlayer));
    renderPlayer();
    renderCount();
}


function renderCount() {
    let a = 0;
    for (i = 0; i < listPlayer.length; i++) {
        a += listPlayer[i].score;
        sum = a;
    }
    let result = `
          <div>Players: ${listPlayer.length}</div>
          <div>Total Points: ${sum}</div>
    
      `;
    document.getElementById("total").innerHTML = result;
}
renderPlayer();
renderCount();
