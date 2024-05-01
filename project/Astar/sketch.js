function Spot(i, j) {

    this.i = i;
    this.j = j;


    this.f = 0;
    this.g = 0;
    this.h = 0;


    this.neighbors = [];


    this.previous = undefined;


    this.wall = false;
    if (random(1) < 0.3) {
        this.wall = true;
    }


    this.show = function (col) {
        if (this.wall) {
            fill(0);
            noStroke();
            rect(this.i * w, this.j * h, w, h);
        } else if (col) {
            fill(col);
            rect(this.i * w, this.j * h, w, h);
        }
    };

    this.addNeighbors = function (grid) {
        var i = this.i;
        var j = this.j;
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }
    };
}


function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    var Manhattan_Distance = abs(a.i - b.i) + abs(a.j - b.j);
    return Manhattan_Distance;
}

var cols = 50;
var rows = 50;

var grid = new Array(cols);

var openSet = [];
var closedSet = [];

var start;
var end;

var w, h;

var path = [];


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function setup() {
    createCanvas(500, 500);
    console.log('A*');

    w = width / cols;
    h = height / rows;

    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }



    var start_x = getRandomInt(0, rows);
    var start_y = getRandomInt(0, cols);
    var end_x = getRandomInt(0, rows);
    var end_y = getRandomInt(0, cols);

    start = grid[start_x][start_y];

    end = grid[end_x][end_y];

    start.wall = false;
    end.wall = false;

    openSet.push(start);
}

function draw() {
    if (openSet.length > 0) {
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        var current = openSet[winner];

        if (current === end) {
            noLoop();
            console.log('DONE!');
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                var tempG = current.g + heuristic(neighbor, current);

                var newPath = false;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }

                if (newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        }
    } else {
        console.log('no solution');
        noLoop();
        return;
    }

    background(255);

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }

    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0, 50));
    }
    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0, 20));
    }

    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    for (var i = 0; i < path.length; i++) {
        path[i].show(color(0, 255, 0, 90));
    }
    start.show(color(0, 0, 255));
    end.show(color(255, 0, 0));

}

function display_path() {
    noFill();
    stroke(0, 255, 0);
    strokeWeight(w / 2);
    beginShape();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
    }
    endShape();
}

function mouseClicked() {
    display_path();
}
