const report = (statement) => {
    console.log(statement);
    document.querySelector("#log_solution").textContent = statement;
}
let board = undefined;

const check_board = (n) => {
    let invalid = false;
    let row_invalid = false;
    let col_invalid = false;
    let diagonal_invalid = false;

    let queen_seen = 0;

    // row and column check
    for(let i = 0; i<n; ++i) {
        let row_seen = 0;
        let col_seen = 0;
        for(let j = 0; j<n; ++j) {
            row_seen += board[i][j];
            col_seen += board[j][i];
            queen_seen += board[i][j];
            if (! row_invalid) {
                row_invalid = row_seen > 1;
            }
            if (! col_invalid) {
                col_invalid = col_seen > 1;
            }
        }
    }

    // diagonal check
    for(let i = 0; i<n+n; ++i) {
        let d1_seen = 0;
        let d2_seen = 0;
        for(let j = 0; j <n; ++j) {
            let row = j;
            let col1 = i+j;
            let col2 = i-j;
            if (col1 >= 0 && col1 <n) {
                d1_seen += board[j][col1];
            }
            if (col2 >= 0 && col2 <n) {
                d2_seen += board[j][col2];
            }
            if (! diagonal_invalid) {
                diagonal_invalid = d1_seen > 1 || d2_seen > 1;
            }
        }
    }

    let statement = '';
    if (row_invalid) {
        statement += "same row ";
        invalid = true;
    }
    if (col_invalid) {
        statement += "same column ";
        invalid = true;
    }
    if (diagonal_invalid) {
        statement += "same diagonal ";
        invalid = true;
    }
    if (invalid) {
        report(statement);
        return false;
    } 
    if (! invalid) {
        statement = "Ok"
    }
    if (queen_seen == n && ! invalid) {
        statement = "Yayyyy! You have found a solution. Congrats!";
    }
    report(statement);
    return true;
}
const click_square = (row, col, n, element) => {
    let square_id = row * n + col + 1;
    console.log("click at", row, col);
    let queenpresent = 1-board[row][col];
    board[row][col] = queenpresent;
    queen = element.querySelector(".queen");
    if (queenpresent === 0) {
        queen.style.visibility = "hidden";
    } else {
        queen.style.visibility = "visible";
    }
    check_board(n);
};

const init_board = (n) => {
    board = new Array(n);
    for(let i = 0; i<n; ++i){
        board[i] = new Array(n);
       for(let j = 0; j<n; ++j) {
            board[i][j] = 0;
        }
    }
}


const makeboard = (n=1) => {
    init_board(n);
    console.log(board);
    // Getting the chessboard container and clearing it
    let boardContainer = document.querySelector("#chessboard");
    boardContainer.innerHTML = '';

    let square_index = 0;
    for(let row = 0; row<n; ++row) {
        let row_name = `${n-row}`;

        // A row container
        var rowContainer = document.createElement("div");
        boardContainer.appendChild(rowContainer);
        rowContainer.className = "row";

        // The name of the row
        let rowName = document.createElement("div");
        rowContainer.appendChild(rowName);
        rowName.className = "row_name";
        rowName.textContent = row_name;

        for(let col = 0; col<n; ++col) {
            square_index += 1;
            // var col_name = String.fromCharCode(col + 'a'.charCodeAt());
            let boxId = `${square_index}`;

            // the square
            let square = document.createElement("div");
            rowContainer.appendChild(square);
            square.className = ((row+col)%2 === 0) ? "dark" : "light";
            square.classList.add("square");
            // square.textContent = 'box';

            // the queen
            let queen = document.createElement("div");
            square.appendChild(queen);
            queen.className = "queen";
            queen.textContent = "♛";


            // add event listener
            let num = n;
            let r = row;
            let c = col;
            let ele = square;
            square.addEventListener("click", () => {
                click_square(r, c, num, ele);
            })
        }
    }
    // column names
    var rowBar = document.createElement("div");
    boardContainer.appendChild(rowBar);
    rowBar.className = "row";

    var nothingBox = document.createElement("div");
    rowBar.appendChild(nothingBox);
    nothingBox.className = "horizontal_nothing"

    // column names
    for(let col = 0; col < n; ++col) {
        var col_name = String.fromCharCode(col + 'a'.charCodeAt());
        var colName = document.createElement("div");
        rowBar.appendChild(colName);
        colName.className = "column_name";
        colName.textContent = col_name;
    }

    // solved status
    var solvedStatus = document.createElement("div");
    boardContainer.appendChild(solvedStatus);
    solvedStatus.id = "log_solution"
    if (n != 0) {
        solvedStatus.textContent = "Please click a box to start.";
    } else {
        check_board(n);
        solvedStatus.textContent = "You found a trivial solution!";
    }

    // title
    var titleElement = document.querySelector("#title");
    titleElement.innerHTML = '';

    var decreaseButton = document.createElement("div");
    decreaseButton.className = 'button';
    decreaseButton.textContent = ' ◀️ ';
    decreaseButton.addEventListener("click",() =>{
        n--;
        n = n<0? 0 : n;
        makeboard(n);
        return;
    });
    var increaseButton = document.createElement("div");
    increaseButton.className = 'button';
    increaseButton.textContent = ' ▶️ ';
    increaseButton.addEventListener("click",() =>{
        n++;
        n = n>50? 50 : n;
        makeboard(n);
        return;
    });
    var textspan = document.createElement("span");
    textspan.textContent =  `  The ${n} queen${n==1?'':'s'} problem.  `;

    titleElement.appendChild(decreaseButton);
    titleElement.appendChild(textspan);
    titleElement.appendChild(increaseButton);
}

makeboard(8);