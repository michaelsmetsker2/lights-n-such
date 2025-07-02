const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const sizeSlider = document.getElementById("sizeSlider");
const guide = document.getElementById('keymap');

//i should probably not have this like it is, dear god
const keyLayout = [
    { keyId: 0, x: 0, y: 0, width: 50, height: 45}, // esc
    { keyId: 1, x: 95, y: 0, width: 44, height: 45}, // f keys
    { keyId: 2, x: 140, y: 0, width: 44, height: 45},
    { keyId: 3, x: 185, y: 0, width: 44, height: 45},
    { keyId: 4, x: 230, y: 0, width: 44, height: 45},
    { keyId: 5, x: 295, y: 0, width: 44, height: 45},
    { keyId: 6, x: 340, y: 0, width: 44, height: 45},
    { keyId: 7, x: 385, y: 0, width: 44, height: 45},
    { keyId: 8, x: 430, y: 0, width: 44, height: 45},
    { keyId: 9, x: 495, y: 0, width: 44, height: 45},
    { keyId: 10, x: 540, y: 0, width: 44, height: 45},
    { keyId: 11, x: 585, y: 0, width: 44, height: 45},
    { keyId: 12, x: 630, y: 0, width: 44, height: 45},

    { keyId: 14, x: 685, y: 0, width: 44, height: 45}, // PrntScreen
    { keyId: 15, x: 730, y: 0, width: 44, height: 45}, // Scrlk
    { keyId: 16, x: 775, y: 0, width: 44, height: 45}, // Pause

    { keyId: 21, x: 0, y: 46, width: 49, height: 49}, // tilde
    { keyId: 22, x: 50, y: 46, width: 44, height: 49}, // numbers
    { keyId: 23, x: 95, y: 46, width: 44, height: 49}, 
    { keyId: 24, x: 140, y: 46, width: 44, height: 49}, 
    { keyId: 25, x: 185, y: 46, width: 44, height: 49}, 
    { keyId: 26, x: 230, y: 46, width: 44, height: 49}, 
    { keyId: 27, x: 275, y: 46, width: 39, height: 49}, 
    { keyId: 28, x: 315, y: 46, width: 44, height: 49}, 
    { keyId: 29, x: 360, y: 46, width: 44, height: 49}, 
    { keyId: 30, x: 405, y: 46, width: 44, height: 49}, 
    { keyId: 31, x: 450, y: 46, width: 44, height: 49}, 
    { keyId: 32, x: 495, y: 46, width: 44, height: 49}, 
    { keyId: 33, x: 540, y: 46, width: 44, height: 49}, 
    { keyId: 34, x: 585, y: 46, width: 89, height: 49}, // backspace 

    { keyId: 35, x: 685, y: 46, width: 44, height: 49}, // Ins
    { keyId: 36, x: 730, y: 46, width: 44, height: 49}, // Home
    { keyId: 37, x: 775, y: 46, width: 44, height: 49}, // PgUp

    { keyId: 38, x: 830, y: 46, width: 44, height: 49}, // Numlk
    { keyId: 39, x: 875, y: 46, width: 44, height: 49}, // /
    { keyId: 40, x: 920, y: 46, width: 44, height: 49}, // *
    { keyId: 41, x: 965, y: 46, width: 44, height: 49}, // -

    { keyId: 42, x: 0, y: 95, width: 74, height: 44}, // tab
    { keyId: 43, x: 75, y: 95, width: 44, height: 44},
    { keyId: 44, x: 120, y: 95, width: 44, height: 44},
    { keyId: 45, x: 165, y: 95, width: 39, height: 44},
    { keyId: 46, x: 205, y: 95, width: 44, height: 44},
    { keyId: 47, x: 250, y: 95, width: 44, height: 44},
    { keyId: 48, x: 295, y: 95, width: 44, height: 44},
    { keyId: 49, x: 340, y: 95, width: 44, height: 44},
    { keyId: 50, x: 385, y: 95, width: 44, height: 44},
    { keyId: 51, x: 430, y: 95, width: 44, height: 44},
    { keyId: 52, x: 475, y: 95, width: 44, height: 44},
    { keyId: 53, x: 520, y: 95, width: 44, height: 44}, // [
    { keyId: 54, x: 565, y: 95, width: 44, height: 44}, // ]
    { keyId: 55, x: 610, y: 95, width: 64, height: 44}, // \

    { keyId: 56, x: 685, y: 95, width: 44, height: 44}, // Del
    { keyId: 57, x: 730, y: 95, width: 44, height: 44}, // End
    { keyId: 58, x: 775, y: 95, width: 44, height: 44}, // PgDn

    { keyId: 59, x: 830, y: 95, width: 44, height: 44}, // 7
    { keyId: 60, x: 875, y: 95, width: 44, height: 44}, // 8
    { keyId: 61, x: 920, y: 95, width: 44, height: 44}, // 9

    { keyId: 62, x: 965, y: 95, width: 44, height: 89}, // numpd+

    { keyId: 63, x: 0, y: 140, width: 84, height: 44}, // capslock
    { keyId: 64, x: 85, y: 140, width: 44, height: 44}, 
    { keyId: 65, x: 130, y: 140, width: 44, height: 44}, 
    { keyId: 66, x: 175, y: 140, width: 44, height: 44}, 
    { keyId: 67, x: 220, y: 140, width: 44, height: 44}, 
    { keyId: 68, x: 265, y: 140, width: 39, height: 44}, 
    { keyId: 69, x: 305, y: 140, width: 44, height: 44}, 
    { keyId: 70, x: 350, y: 140, width: 44, height: 44}, 
    { keyId: 71, x: 395, y: 140, width: 44, height: 44}, 
    { keyId: 72, x: 440, y: 140, width: 44, height: 44}, 
    { keyId: 73, x: 485, y: 140, width: 44, height: 44}, 
    { keyId: 74, x: 530, y: 140, width: 44, height: 44}, 
    { keyId: 76, x: 575, y: 140, width: 99, height: 44}, // enter

    { keyId: 80, x: 830, y: 140, width: 44, height: 44}, // 4
    { keyId: 81, x: 875, y: 140, width: 44, height: 44}, // 5
    { keyId: 82, x: 920, y: 140, width: 44, height: 44}, // 6

    { keyId: 84, x: 0, y: 185, width: 104, height: 44}, // shift
    { keyId: 86, x: 105, y: 185, width: 44, height: 44},
    { keyId: 87, x: 150, y: 185, width: 44, height: 44},
    { keyId: 88, x: 195, y: 185, width: 44, height: 44},
    { keyId: 89, x: 240, y: 185, width: 44, height: 44},
    { keyId: 90, x: 285, y: 185, width: 44, height: 44},
    { keyId: 91, x: 330, y: 185, width: 44, height: 44},
    { keyId: 92, x: 370, y: 185, width: 39, height: 44},
    { keyId: 93, x: 415, y: 185, width: 44, height: 44},
    { keyId: 94, x: 460, y: 185, width: 44, height: 44},
    { keyId: 95, x: 505, y: 185, width: 44, height: 44},
    { keyId: 97, x: 550, y: 185, width: 124, height: 44}, // Rshift

    { keyId: 99, x: 730, y: 185, width: 44, height: 44}, // up

    { keyId: 101, x: 830, y: 185, width: 44, height: 44}, // 1
    { keyId: 102, x: 875, y: 185, width: 44, height: 44}, // 2
    { keyId: 103, x: 920, y: 185, width: 44, height: 44}, // 3

    { keyId: 104, x: 965, y: 185, width: 44, height: 94}, // numpdEnter
    
    { keyId: 105, x: 0, y: 230, width: 59, height: 50}, // ctrl
    { keyId: 106, x: 60, y: 230, width: 59, height: 50}, // win
    { keyId: 107, x: 120, y: 230, width: 54, height: 50}, // alt
    { keyId: 108, x: 175, y: 230, width: 274, height: 50}, // space
    { keyId: 109, x: 450, y: 230, width: 54, height: 50}, // ralt
    { keyId: 110, x: 505, y: 230, width: 54, height: 50}, // fn
    { keyId: 111, x: 560, y: 230, width: 54, height: 50}, // ?
    { keyId: 113, x: 615, y: 230, width: 59, height: 50}, // rctrl

    { keyId: 119, x: 685, y: 230, width: 44, height: 50}, // left
    { keyId: 120, x: 730, y: 230, width: 44, height: 50}, // down
    { keyId: 121, x: 775, y: 230, width: 44, height: 50}, // right

    { keyId: 123, x: 830, y: 230, width: 90, height: 50}, // 0
    { keyId: 124, x: 920, y: 230, width: 44, height: 50}, // del

]

let drawing = false; // if the user is currently drawing on the canvas

// contains each keys color and index for submitting to the backend
const ledColors = []; // ledIndex: red: green: blue:

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = sizeSlider.value;
    ctx.lineCap = "round";
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

// stop drawing via releasing click or leaving the canvas
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseleave", () => drawing = false);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleGuide() {
    guide.style.display = (guide.style.display === 'none') ? 'block' : 'none';
}

// calculates each keys color and then sends the data to the backend
function submitColors() { 
    ledColors.length = 0; //clear previous

    keyLayout.forEach(({ keyId, x, y, width, height }) => {
        //get image data for the area
        const imgData = ctx.getImageData(x, y, width, height);
        const data = imgData.data;

        let rSum = 0, gSum = 0, bSum = 0, count = 0;

        for (let i = 0; i < data.length; i += 4) {

            rSum += data[i];
            gSum += data[i + 1];
            bSum += data[i + 2];
            count++;
        }

        if (count === 0) count = 1; // avoid div by zero

        const avgR = Math.round(rSum / count);
        const avgG = Math.round(gSum / count);
        const avgB = Math.round(bSum / count);

        ledColors.push({ keyId, red: avgR, green: avgG, blue: avgB });
    });

    void fetch("http://localhost:3000/api/colors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ledColors)
    });
}

console.log(ledColors);