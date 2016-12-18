const $slider = $('.slider');

const $scaleButtons = $('.scale-button');

const $addPlaceForm = $('.add-place-form');
const $addPlaceButton = $('.add-place-button');
const $addPlaceInputs = $('.add-place-form input');
const $addPlace = $('.add-place');

const $listViewButton = $('.list-view-button');


const convertFahToCel = function () {
    $('.temperature').each( (i, v) => {
        let cel = Math.round((parseInt($(v).html(), 10) - 32) * 5/9 );
        $(v).html(cel);
    });
};

const convertCelToFah = function () {
    $('.temperature').each( (i, v) => {
        let fah = Math.round(parseInt($(v).html(), 10) * 9/5 +32 );
        $(v).html(fah);
    });
};

const addNewSlide = function (city, temp, imgUrl) {
    let timeNow = new Date().toLocaleTimeString('en-GB', { hour12: true }).replace(/:\d+ /, ' ');
    let html = `<div class="slide active">
           <img src="${imgUrl}" alt="${city}">
           <div class="caption">
               <div class="weather-info">
                   <p class="temperature">${temp}</p>
                   <p class="city">${city}</p>
                   <p>${timeNow}</p>
               </div>
           </div>
        </div>`;

    $('.controls li').add('.slide').removeClass('active');

    if ($('.slide').length > 8) {
        $('.slide').last().remove();
        $('.controls li').last().remove();
    }

    $slider.prepend(html);
    $('.controls').prepend($('<li class="active"></li>'));

    $addPlaceInputs.each( (i, v) => {
        $(v).val('');
    });
    $addPlace.prop('disabled', true);
};

$('.slider').on('click', function (event) {
    const $target = $(event.target);
    if ($target.is('li') || $target.is('.cities-list p')) {
        $('.slide').eq($target.index())
            .add($('.controls li').eq($target.index()))
            .addClass('active')
            .siblings()
            .removeClass('active');
        $('.cities-list').hide();
    }
});

$scaleButtons.on('click', function () {
    if (!$(this).hasClass('active')) {
        $(this).addClass('active')
            .siblings()
            .removeClass('active');
        if ($(this).hasClass('celsius')) {
            convertFahToCel();
        }
        else {
            convertCelToFah();
        }
    }
});

$addPlaceButton.on('click', function () {
    $addPlaceForm.toggle();
    $('.cities-list').hide();
});

$addPlace.on('click', function () {
    if (!$(this).prop('disabled')) {
        let $city = $('#city').val();
        let $temp = $('#temp').val();
        let $imgUrl = $('#img-url').val();

        $addPlaceForm.toggle();
        addNewSlide($city, $temp, $imgUrl);
    }
});

$addPlaceInputs.on('input', function () {
    let res = 0;
    $addPlaceInputs.each( (i, v) => {
        if ($(v).val()) {
            res++;
        }
    });
    if (res === $addPlaceInputs.length) {
        $addPlace.prop('disabled', false);
    }
    else {
        $addPlace.prop('disabled', true);
    }
});

$listViewButton.on('click', function () {
    $('.cities-list').html('').append($('.city').clone());
    $('.cities-list').toggle();
    $addPlaceForm.hide();
});
