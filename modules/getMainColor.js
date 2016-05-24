function getMainColor (URL) {
    return new Promise (resolve => {
        let canvas = document.createElement('canvas'),
            img = new Image(),
            ctx = canvas.getContext('2d');
        img.src = URL;
        img.onload = () => {
            canvas.width = 50;
            canvas.height = img.height / img.width * 50;
            ctx.drawImage(img, 0, 0, 50, img.height / img.width * 50);
            let bitArray = ctx.getImageData(0, 0, canvas.width, canvas.height).data,
                colorMap = {};
            for (let i = 0; i < bitArray.length; i += 3) {
                let color = [
                        bitArray[i],
                        bitArray[i + 1],
                        bitArray[i + 2]
                    ],
                    id = color.join();
                if (colorMap[id]) {
                    colorMap[id].count += 1;
                }
                else {
                    colorMap[id] = {
                        color,
                        count: 1,
                        grey: (color.reduce((a, b) => a + b) / 3).toFixed(0)
                    };
                }
            }
            let colorArray = Object.keys(colorMap)
            .map(id => colorMap[id])
            .sort(({count: a}, {count: b}) =>  b - a)
            .filter(color => color.grey < 178);
            resolve(colorArray[0].color);
        };
    });
}

export default getMainColor;
