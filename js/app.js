function init() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let iterator = 0;
    let randX = Math.random();
    let randImages = Math.random();
    let hitted = 0;
    let missed = 0;
    let currentLevel =0;
    let bullets = 0;
    let flag = false;

    let nakovImg = document.getElementById('nakovImg');

    let arrOfImages = [];

    arrOfImages[0] = (document.getElementById("bojoImg"));
    arrOfImages[1] = (document.getElementById("achoImg"));
    arrOfImages[2] = (document.getElementById("dinkoImg"));
    arrOfImages[3] = (document.getElementById("georgiImg"));
    arrOfImages[4] = (document.getElementById("royalImg"));
    arrOfImages[5] = (document.getElementById("evchetoImg"));
    arrOfImages[6] = (document.getElementById("katiImg"));
    arrOfImages[7] = (document.getElementById("alexImg"));
    arrOfImages[8] = (document.getElementById("trifonImg"));
    arrOfImages[9] = (document.getElementById("simoImg"));
    arrOfImages[10] = (document.getElementById("viktor1Img"));
    arrOfImages[11] = (document.getElementById("viktor2Img"));
    arrOfImages[12] = (document.getElementById("nikiImg"));



function main() {
    //console.log("main")
    update();
    render();
}

    function update() {
        if (8 * currentLevel >= bullets || missed <= currentLevel){
            //cls();
            //console.log('game over')

        }
        res();
        function res() {
            console.log("res")
            randX = Math.random();
            randImages = Math.random();
            hitted = 0;
            missed = 0;
            currentLevel++;
            bullets = 0;
        }


        }
        function render() {
            let imageCenter;
            animate();
            canvas.addEventListener('click', hitImage);
            function animate() {
                console.log('animate');
                cls();

                ctx.font = "24px Arial";
                ctx.fillStyle = 'red';
                ctx.opacity = 0.8;
                ctx.fillText(`Hits: ${hitted}`, 25, 25);
                ctx.fillText(`Level: ${currentLevel}`, 300, 25);
                ctx.fillText(`Missed: ${missed}`, 1050, 25);
                ctx.fillText(`Bulets: ${currentLevel * 8 - bullets}`, 700, 25);
                ctx.drawImage(document.getElementById("bulletImg"), 670, 5);
                ctx.fill();

                ctx.beginPath();

                let xCoords = Math.round(randX * 1057);
                let yCoords = 600 - iterator;

                imageCenter = {xCoord: xCoords + 72, yCoord: yCoords + 72};
                ctx.drawImage(arrOfImages[Math.round(randImages * 12)], xCoords, yCoords);

                iterator += (8 + currentLevel/2);

                if (iterator > 743) {

                    iterator = 0;
                    randX = Math.random();
                    randImages = Math.random();

                    if (flag == false) {
                        missed++;

                    }
                    flag = false;

                }
                if (8 * currentLevel >= bullets && missed <= currentLevel && currentLevel * 5 != hitted) {
                    requestAnimationFrame(animate);
                }
                else if (!(currentLevel * 5 != hitted)) {
                    cls();
                    ctx.fillText("CONTINUE TO NEXT LEVEL", 400, 300)
                }
                else {
                    cls();
                    ctx.fillText("GAME OVER" , 400, 300)

                }



                // Callbacks


            }

            function hitImage(event) {
                // if (missed > currentLevel){
                //     requestAnimationFrame(init)
                // }
                // else if (currentLevel*8 - bullets>0){
                //     requestAnimationFrame(init)
                // }
                // else if (hitted == currentLevel*5){
                //     requestAnimationFrame(main)
                // }
                // else{
                    let clickX = event.pageX;
                    let clickY = event.pageY;

                    if ((clickX >= imageCenter.xCoord - 72 && clickX <= imageCenter.xCoord + 72) && (clickY >= imageCenter.yCoord - 72 && clickY <= imageCenter.yCoord + 72)) {
                        iterator = 2000;
                        hitted++;
                        flag = true;

                    }
                    bullets++;
                // }
            }

            function cls() {
                ctx.clearRect(0, 0, 1200, 600);
            }
            //requestAnimationFrame(main)
        }
    requestAnimationFrame(main)
        //
        // function grid() {
        //     ctx.save();
        //
        //     ctx.strokeStyle = 'grey';
        //     ctx.lineWidth = 0.25;
        //     for (let row = 0; row < 60; row++) {
        //         if (row % 5 == 0) ctx.lineWidth = 0.5;
        //         if (row % 10 == 0) ctx.lineWidth = 1;
        //         ctx.beginPath();
        //         ctx.moveTo(0, row * 10);
        //         ctx.lineTo(800, row * 10);
        //         ctx.stroke();
        //         if (row % 5 == 0) ctx.lineWidth = 0.25;
        //     }
        //     for (let col = 0; col < 80; col++) {
        //         if (col % 5 == 0) ctx.lineWidth = 0.5;
        //         if (col % 10 == 0) ctx.lineWidth = 1;
        //         ctx.beginPath();
        //         ctx.moveTo(col * 10, 0);
        //         ctx.lineTo(col * 10, 600);
        //         ctx.stroke();
        //         if (col % 5 == 0) ctx.lineWidth = 0.25;
        //     }
        //
        //     ctx.restore();
        // }
        // requestAnimationFrame(main)
        // requestAnimationFrame(main)
    }


