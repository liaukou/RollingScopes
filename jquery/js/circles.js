(function () {
    const circleStraightHeight = $('.circle-straight').height();
    const circleFill = document.getElementById('circle-fill');
    const circleAround = document.getElementById('circle-around');
    const SmallCircleRadius = (circleAround.height / 2) - 20;

    const drawPieChart = function (elemnt, color, start, end, rad = elemnt.height / 2) {
        let elementCtx = elemnt.getContext('2d');
        elementCtx.fillStyle = color;
        elementCtx.beginPath();
        elementCtx.moveTo(elemnt.width / 2, elemnt.height / 2);
        elementCtx.arc(elemnt.width / 2, elemnt.height / 2, rad,  start, end, false);
        elementCtx.lineTo(elemnt.width / 2, elemnt.height / 2);
        elementCtx.fill();
    };

    drawPieChart(circleFill, '#efefef', 0, 2*(Math.PI));
    drawPieChart(circleAround, '#efefef', 0, 2*(Math.PI));

    $('.circle-button').on('click', function () {
        const first = Number($('.circle-input-first-value').val());
        const second = Number($('.circle-input-second-value').val());
        const third = Number($('.circle-input-third-value').val());
        const linefactor = circleStraightHeight / 100;

        let numbers = [
            {color: '#56e5f6', value: first},
            {color: '#4cd9c0', value: second},
            {color: '#ec747d', value: third}
        ];

        let start = -Math.PI/2;
        let lineHeigth = 0;

        numbers.sort( function (a, b) {
            return a.value - b.value;
        });

        if (first + second + third > 100) {
            alert ('Incorrect data');
        }
        else {
            drawPieChart(circleFill, '#efefef', 0, 2*(Math.PI));
            drawPieChart(circleAround, '#efefef', 0, 2*(Math.PI));

            for (var i = 0; i < numbers.length; i++) {
                const step = 2 * (Math.PI) / 100;
                drawPieChart(circleFill, numbers[i].color, start, step * numbers[i].value + start);
                drawPieChart(circleAround, numbers[i].color, start, step * numbers[i].value + start);
                start = step * numbers[i].value + start;
            }

            drawPieChart(circleAround, 'white', 0, 2*(Math.PI), SmallCircleRadius);

            $('.circle-straight div').each( (i,v) => {
                $(v).height(numbers[i].value * linefactor);
                $(v).css('bottom', lineHeigth + 'px');
                $(v).css('background', numbers[i].color);
                lineHeigth += numbers[i].value * linefactor;
            });
        }
    });
})();
