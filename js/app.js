

var bestScores = [0,0,0,0,0,0];

function init() {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let iterator = 0;
    let randX = Math.random();
    let randImages = Math.random();
    let randX1 = Math.random();
    let randImages1 = Math.random();
    let hitted = 0;
    let randImages2 = Math.random();
    let randX2 = Math.random();
    let kurec = Math.random();
    let bonus = 0;
    let missed = 0;
    let currentLevel = 0;
    let bullets = 0;
    let flag = false;
    let flag1 = false;
    let iterator1 = 0;
    let iterator2 = 0;



    let arrOfUsers = [];
    arrOfUsers[0] = (document.getElementById("bojoImg"));
    arrOfUsers[1] = (document.getElementById("achoImg"));
    arrOfUsers[2] = (document.getElementById("dinkoImg"));
    arrOfUsers[3] = (document.getElementById("georgiImg"));
    arrOfUsers[4] = (document.getElementById("royalImg"));
    arrOfUsers[5] = (document.getElementById("trifonImg"));
    arrOfUsers[6] = (document.getElementById("simoImg"));
    arrOfUsers[7] = (document.getElementById("viktor1Img"));
    arrOfUsers[8] = (document.getElementById("viktor2Img"));
    arrOfUsers[9] = (document.getElementById("nikiImg"));

  


    canvas.addEventListener('click', hitImage);
    window.addEventListener('keyup', spaceToContinue, true);

    function main() {
        update();
        render();
    }

    function update() {
        currentLevel++;
        reset();
    }

    function render() {
        let imageCenter;
        animate();

    }

    function animate() {
        cls();


        ctx.font = "24px Arial";
        ctx.fillStyle = 'red';
        ctx.opacity = 0.8;
        ctx.fillText(`Hits: ${hitted}`, 25, 25);
        ctx.fillText(`Level: ${currentLevel }`, 250, 25);
        ctx.fillText(`Score: ${bonus}`, 550, 25);
        ctx.fillText(`Misses left: ${currentLevel - missed + 1} `, 1050, 25);
        ctx.fillText(`Bullets: ${currentLevel * 8 - bullets}`, 850, 25);
        ctx.drawImage(document.getElementById("bulletImg"), 670, 5);
        ctx.fill();

        ctx.beginPath();

        let xCoords = Math.round(randX * 1057);
        let yCoords = 600 - iterator;
        let xCoords1 = Math.round(randX1 * 1057);
        let yCoords1 = 600 - iterator1;
        let xCoords2 = Math.round(randX2 * 1057);
        let yCoords2 = 600 - iterator2;

        imageCenter = {xCoord: xCoords + 72, yCoord: yCoords + 72};
        imageCenter1 = {xCoord1: xCoords1 + 72, yCoord1: yCoords1 + 72};

        switch (Math.round(randImages2 * 3)) {
            case 0:
                imageCenter2 = {xCoord2: xCoords2 + 72, yCoord2: yCoords2 + 72, name: 'evcheto'};
                break;
            case 1:
                imageCenter2 = {xCoord2: xCoords2 + 72, yCoord2: yCoords2 + 72, name: 'kati'};
                break;
            case 2:
                imageCenter2 = {xCoord2: xCoords2 + 72, yCoord2: yCoords2 + 72, name: 'alex'};
                break;
            case 3:
                imageCenter2 = {xCoord2: xCoords2 + 72, yCoord2: yCoords2 + 72, name: 'nakov'};
                break;
        }

        if (currentLevel > 2) {
            ctx.drawImage(arrOfUsers[Math.round(randImages1 * 9)], xCoords1, yCoords1);
            iterator1 += (3 + currentLevel / 3);

        }
        ctx.drawImage(arrOfUsers[Math.round(randImages * 9)], xCoords, yCoords);
        if (Math.round(kurec * 3) <= 3) {
            ctx.drawImage(arrOfBombBonuses[Math.round(randImages2 * 3)], xCoords2, yCoords2);
            iterator2 += ((3 + currentLevel / 3) + (2 + currentLevel / 4)) / 2

        }

        iterator += (2 + currentLevel / 4);


        if (iterator > 743) {

            iterator = 0;
            randX = Math.random();
            randImages = Math.random();

            if (flag == false) {
                missed++;

            }
            flag = false;

        }

        if (iterator1 > 743) {

            iterator1 = 0;
            randX1 = Math.random();
            randImages1 = Math.random();

            if (flag1 == false) {
                missed++;

            }
            flag1 = false;

        }
        if (iterator2 > 743) {
            if (imageCenter2.name == "nakov") {
                missed--;
            }
            iterator2 = 0;
            randX2 = Math.random();
            randImages2 = Math.random();
            kurec = Math.random();
            if (flag2 == false) {
                missed++;

            }
            flag2 = false;

        }

        if (8 * currentLevel > bullets && missed <= currentLevel && currentLevel * 5 > hitted) {
            requestAnimationFrame(animate);
        }
        else if (currentLevel * 5 <= hitted) {
            cls();
            ctx.fillText("PRESS SPACE TO CONTINUE", 425, 300);
        }
        else {
            cls();
            ctx.fillText("GAME OVER", 530, 200, 1000);

            bestScores = bestScores.sort((a, b) => b - a);
            if (bonus > bestScores[bestScores.length - 1]) {
                bestScores.pop();
                bestScores.push(bonus);
                bestScores.sort((a,b) => b-a)
            }
            ctx.fillText(`YOUR SCORE: ${bonus}`, 515, 250, 1000);
            ctx.fillText("BEST SCORES", 525, 300, 1000);
            for (let i=1; i<=bestScores.length-1 ; i++) {
                ctx.fillText(`${i}: ${bestScores[i-1]}`, 575, 300 + (i)*30, 1000);
            }

        }
    }

    function spaceToContinue(event) {
        if (event.keyCode = 32 && currentLevel * 5 <= hitted && bullets < 2000) {
            requestAnimationFrame(main);
        }
    }

    function hitImage(event) {
        let clickX = event.pageX;
        let clickY = event.pageY;

        if ((clickX >= imageCenter.xCoord - 72 && clickX <= imageCenter.xCoord + 72) && (clickY >= imageCenter.yCoord - 72 && clickY <= imageCenter.yCoord + 72)) {
            // console.log("FirstX:" + imageCenter.xCoord);
            // console.log("FirstY:" + imageCenter.yCoord)
            // console.log("Mouse:" + " X:" + clickX + " Y:" + clickY)
            iterator = 2000;
            hitted++;
            bonus++;
            flag = true;
        }
        if ((clickX >= imageCenter1.xCoord1 - 72 && clickX <= imageCenter1.xCoord1 + 72) && (clickY >= imageCenter1.yCoord1 - 72 && clickY <= imageCenter1.yCoord1 + 72)) {
            // console.log("SecondX:" +imageCenter1.xCoord1);
            // console.log("SecondY:" +imageCenter1.yCoord1)
            // console.log("Mouse:" + " X:" + clickX + " Y:" + clickY)
            iterator1 = 2000;
            hitted++;
            bonus++;
            flag1 = true;
        }
        if ((clickX >= imageCenter2.xCoord2 - 72 && clickX <= imageCenter2.xCoord2 + 72) && (clickY >= imageCenter2.yCoord2 - 72 && clickY <= imageCenter2.yCoord2 + 72)) {
            switch (imageCenter2.name) {
                case "nakov":
                    bullets = 2000;
                    break;
                case "evcheto":
                    bonus += 5;
                    bullets--;
                    break;
                case "alex":
                    bonus += 5;
                    bullets--;
                    break;
                case "kati":
                    bonus += 5;
                    bullets--;
                    break;
            }
            iterator2 = 2000;
            flag2 = true;
        }
        bullets++;
    }

    function cls() {
        ctx.clearRect(0, 0, 1200, 600);
    }

    function reset() {
        randX = Math.random();
        randImages = Math.random();
        hitted = 0;
        missed = 0;
        bullets = 0;
        iterator = 0;
        iterator1 = 0;
        iterator2 = 0;
    }

    requestAnimationFrame(main)
}

