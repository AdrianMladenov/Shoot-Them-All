

var bestScores = [0,0,0,0,0,0];

function init() {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let imageYPositionBasic = 0;
    let randomXCoord = Math.random();
    let randomArrayImageIndex = Math.random();
    let randomXSecondBasic = Math.random();
    let randomSecondArrayImageIndex = Math.random();
    let hitted = 0;
    let randomSpecialArrayImageIndex = Math.random();
    let randomXSpecialStart = Math.random();
    let randomSpecialGenerator = Math.random();
    let bonus = 0;
    let missed = 0;
    let currentLevel = 0;
    let bullets = 0;
    let flagBasicImage = false;
    let flagSecondBasicImage = false;
    let imageYPositionSecondBasic = 0;
    let imageYPositionSpecials = 0;
    let flagSpecialImage = false;
	let shootSound = document.getElementById('shootSound');
    let theBossIsComingSound = document.getElementById('theBossSound');
    let gameOverSound = document.getElementById('gameover');
    let levelUpSound = document.getElementById('levelUp');



    let arrayOfBasicImages = [];
    arrayOfBasicImages[0] = (document.getElementById("bojoImg"));
    arrayOfBasicImages[1] = (document.getElementById("achoImg"));
    arrayOfBasicImages[2] = (document.getElementById("dinkoImg"));
    arrayOfBasicImages[3] = (document.getElementById("georgiImg"));
    arrayOfBasicImages[4] = (document.getElementById("royalImg"));
    arrayOfBasicImages[5] = (document.getElementById("trifonImg"));
    arrayOfBasicImages[6] = (document.getElementById("simoImg"));
    arrayOfBasicImages[7] = (document.getElementById("viktor1Img"));
    arrayOfBasicImages[8] = (document.getElementById("viktor2Img"));
    arrayOfBasicImages[9] = (document.getElementById("nikiImg"));

    let arrayOfSpecialsImages = [];
    arrayOfSpecialsImages[0] = (document.getElementById("evchetoImg"));
    arrayOfSpecialsImages[1] = (document.getElementById("katiImg"));
    arrayOfSpecialsImages[2] = (document.getElementById("alexImg"));
    arrayOfSpecialsImages[3] = (document.getElementById('nakovImg'));


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

        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        ctx.shadowBlur = 5;

        ctx.font = "bold 24px verdana, sans-serif ";
       // ctx.font = "24px Arial";
        ctx.fillStyle = "rgba(35, 68, 101, 0.9)";
        ctx.opacity = 0.8;
        ctx.fillText(`Hits: ${hitted}`, 55, 25);
        ctx.fillText(`Level: ${currentLevel }`,300, 25);
        ctx.fillText(`Score: ${bonus}`, 580, 25);
        ctx.fillText(`Misses left: ${currentLevel - missed + 1} `, 1100, 25);
        ctx.fillText(`Bullets: ${currentLevel * 8 - bullets}`, 840, 25);
        ctx.drawImage(document.getElementById("hitsImg"), 25, 5);
        ctx.drawImage(document.getElementById("levelImg"), 270, 5);
        ctx.drawImage(document.getElementById("scoreImg"), 550, 5);
        ctx.drawImage(document.getElementById("bulletsImg"), 810, 5);
        ctx.drawImage(document.getElementById("missedImg"), 1070, 5);
        ctx.fill();

        ctx.beginPath();

        let xCoordsBasic = Math.round(randomXCoord * 1157);
        let yCoordsBasic = 550 - imageYPositionBasic;
        let xCoordsSecondBasic = Math.round(randomXSecondBasic * 1157);
        let yCoordsSecondBasic = 550 - imageYPositionSecondBasic;
        let xCoordsSpecials = Math.round(randomXSpecialStart * 1157);
        let yCoordsSpecials = 550 - imageYPositionSpecials;

        imageCenter = {xCoord: xCoordsBasic + 72, yCoord: yCoordsBasic + 72};
        imageCenter1 = {xCoord1: xCoordsSecondBasic + 72, yCoord1: yCoordsSecondBasic + 72};

        switch (Math.round(randomSpecialArrayImageIndex * 3)) {
            case 0:
                imageCenter2 = {xCoord2: xCoordsSpecials + 72, yCoord2: yCoordsSpecials + 72, name: 'evcheto'};
                break;
            case 1:
                imageCenter2 = {xCoord2: xCoordsSpecials + 72, yCoord2: yCoordsSpecials + 72, name: 'kati'};
                break;
            case 2:
                imageCenter2 = {xCoord2: xCoordsSpecials + 72, yCoord2: yCoordsSpecials + 72, name: 'alex'};
                break;
            case 3:
                imageCenter2 = {xCoord2: xCoordsSpecials + 72, yCoord2: yCoordsSpecials + 72, name: 'nakov'};
                break;
        }

        if (currentLevel > 2) {
            ctx.drawImage(arrayOfBasicImages[Math.round(randomSecondArrayImageIndex * 9)], xCoordsSecondBasic, yCoordsSecondBasic);
            imageYPositionSecondBasic += (3 + currentLevel / 3);

        }
        ctx.drawImage(arrayOfBasicImages[Math.round(randomArrayImageIndex * 9)], xCoordsBasic, yCoordsBasic);
        if (Math.round(randomSpecialGenerator * 3) <= 3) {
            ctx.drawImage(arrayOfSpecialsImages[Math.round(randomSpecialArrayImageIndex * 3)], xCoordsSpecials, yCoordsSpecials);
            imageYPositionSpecials += ((3 + currentLevel / 3) + (2 + currentLevel / 4)) / 2;
			if (Math.round(randomSpecialArrayImageIndex * 3) == 3){
                theBossIsComingSound.play();
            }

        }

        imageYPositionBasic += (2 + currentLevel / 4);


        if (imageYPositionBasic > 693) {

            imageYPositionBasic = 0;
            randomXCoord = Math.random();
            randomArrayImageIndex = Math.random();

            if (flagBasicImage == false) {
                missed++;

            }
            flagBasicImage = false;

        }

        if (imageYPositionSecondBasic > 693) {

            imageYPositionSecondBasic = 0;
            randomXSecondBasic = Math.random();
            randomSecondArrayImageIndex = Math.random();

            if (flagSecondBasicImage == false) {
                missed++;

            }
            flagSecondBasicImage = false;

        }
        if (imageYPositionSpecials > 693) {
            if (imageCenter2.name == "nakov") {
                missed--;
            }
            imageYPositionSpecials = 0;
            randomXSpecialStart = Math.random();
            randomSpecialArrayImageIndex = Math.random();
            randomSpecialGenerator = Math.random();
            if (flagSpecialImage == false) {
                missed++;

            }
            flagSpecialImage = false;

        }

        if (8 * currentLevel > bullets && missed <= currentLevel && currentLevel * 5 > hitted) {
            requestAnimationFrame(animate);
        }
        else if (currentLevel * 5 <= hitted) {
            cls();
            ctx.fillText("PRESS SPACE TO CONTINUE", 495, 300);
            ctx.fillText(`CURRENT SCORE: ${bonus}`, 540, 330);
			levelUpSound.play();
        }
        else {
            cls();
            ctx.fillText("!!! GAME OVER !!!", 545, 170, 1000);
			gameOverSound.play();

            bestScores = bestScores.sort((a, b) => b - a);
            if (bonus > bestScores[bestScores.length - 1]) {
                bestScores.pop();
                bestScores.push(bonus);
                bestScores.sort((a,b) => b-a)
            }
            ctx.fillText(`YOUR SCORE: ${bonus}`, 560, 250, 1000);
            ctx.fillText("BEST SCORES", 570, 300, 1000);
            for (let i=1; i<=bestScores.length-1 ; i++) {
                ctx.fillText(`${i}: ${bestScores[i-1]}`, 625, 300 + (i)*40, 1000);
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
            imageYPositionBasic = 2000;
            hitted++;
            bonus++;
            flagBasicImage = true;
        }
        if ((clickX >= imageCenter1.xCoord1 - 72 && clickX <= imageCenter1.xCoord1 + 72) && (clickY >= imageCenter1.yCoord1 - 72 && clickY <= imageCenter1.yCoord1 + 72)) {
            // console.log("SecondX:" +imageCenter1.xCoord1);
            // console.log("SecondY:" +imageCenter1.yCoord1)
            // console.log("Mouse:" + " X:" + clickX + " Y:" + clickY)
            imageYPositionSecondBasic = 2000;
            hitted++;
            bonus++;
            flagSecondBasicImage = true;
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
            imageYPositionSpecials = 2000;
            flagSpecialImage = true;
        }
        bullets++;
		shootSound.play();
    }

    function cls() {
        ctx.clearRect(0, 0, 1300, 550);
    }

    function reset() {
        randomXCoord = Math.random();
        randomArrayImageIndex = Math.random();
        hitted = 0;
        missed = 0;
        bullets = 0;
        imageYPositionBasic = 0;
        imageYPositionSecondBasic = 0;
        imageYPositionSpecials = 0;
    }

    requestAnimationFrame(main)
}

