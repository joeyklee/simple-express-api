let myData;
let myDots = [];
const colors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"]
let postButton;

function preload() {
    myData = loadJSON("/api");
}

function setup() {
    createCanvas(400, 400);

    // Initialize the view with myDots
    // NOTICE: the x, y values are now strings rather than integers
    console.log(myData);
    for (p in myData) {
        const item = myData[p];
        const x = int(item.x);
        const y = int(item.y);
        myDots.push(new Dot(item.x, item.y, item.color, item._id))
    }

    postButton = createButton("add new circle")
    postButton.mousePressed(handlePost);

}

function handlePost(e) {
    console.log('adding new circle!')
    let colorSelection = colors[floor(random(colors.length))]
    let newCircle = {
        "color": colorSelection,
        "x": floor(random(width)),
        "y": floor(random(height))
    }
    httpPost("/api", newCircle, (result) => {
        // the result logs the object you submited
        console.log(result)
        // get the latest data and update myData
        updateMyDots()
    })
}

function updateMyDots() {
    // clear myDots
    myDots = [];
    loadJSON("/api", (result) => {
        myData = result;
        for (p in myData) {
            const item = myData[p];
            const x = int(item.x);
            const y = int(item.y);
            myDots.push(new Dot(item.x, item.y, item.color, item._id))
        }
    });
}

function draw() {
    background(200);

    myDots.forEach(item => {
        item.display()
    })
}

function mousePressed() {
    myDots.forEach(item => {
        item.intersects()
    })
}

class Dot {
    constructor(_x, _y, _color, _id) {
        this.x = _x;
        this.y = _y;
        this.id = _id;
        this.color = _color;
        this.remove = this.remove.bind(this);
        this.updateColor = this.updateColor.bind(this);
    }

    intersects() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < 20) {
            if (keyIsPressed) {
                this.updateColor();
            } else {
                this.remove();
            }
        }
    }

    updateColor() {
        let colorSelection = colors[floor(random(colors.length))]
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({
                "color": colorSelection
            })
        }
        fetch(`/api/${this.id}`, options).then(result => {
            updateMyDots()
        })
    }

    remove() {
        // see issue with readable stream: https://stackoverflow.com/questions/40385133/retrieve-data-from-a-readablestream-object
        console.log('removing!', this.id)
        fetch(`/api/${this.id}`, {
            method: 'DELETE'
        }).then(result => {
            updateMyDots()
        })
    }

    display() {
        fill(this.color);
        ellipse(this.x, this.y, 40, 40)
    }
}