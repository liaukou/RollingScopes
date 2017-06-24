(function () {
    const $usdInput = $('#usd');
    const $gbpInput = $('#gbp');
    const $bynInput = $('#byn');

    const gbpToUsd = 1.26;
    const usdToByn = 1.95;
    const gbpToByn = 2.46;

    const $converterAddButton = $('.add-currency');
    const $converterInputs = $('.converter input');

    const showByn = function () {
        $('.currency-list li:last-child').show();
        $converterAddButton.off()
            .on('click', hideByn)
            .addClass('active');
    };

    const hideByn = function () {
        $('.currency-list li:last-child').hide();
        $converterAddButton.off()
            .on('click', showByn)
            .removeClass('active');
    };

    const convert = function (value, factor) {
        if (!value) {
            return '';
        } else {
            let res = Math.floor(value * factor * 100) / 100;
            return res > 99 ? Math.floor(res) : res;
        }
    };

    const updateWidth = function (elemnts) {
        elemnts.each( (i, v) => {
            let tempSpan = $('<span>')
                .html($(v).val())
                .appendTo('body')
                .css('font-size', $(v).css('font-size'));
            let width = tempSpan.width();
            tempSpan.remove();
            $(v).width(width + 10);
        });
    };

    const checkLength = function (elemnts) {
        elemnts.each( (i, v) => {
            if ($(v).val().length > 5) {
                $(v).val($(v).val().slice(0, 5));
            }
        });
    };

    const checkOnNumber = function (element) {
        element.val(
            element.val()
                .replace(/^\.|[^\d\.]/g,'')
                .replace(/\./, 'x')
                .replace(/\./g, '')
                .replace(/x/, '.')
        );
    };


    $converterAddButton.on('click', showByn);

    $converterInputs.parent().on('click', function () {
        $(this).children('input').focus();
    });

    $converterInputs.on('input', function () {
        checkOnNumber($(this));
        checkLength($converterInputs);
    });

    $usdInput.on('input', function () {
        $gbpInput.val(convert($(this).val(), 1/gbpToUsd));
        $bynInput.val(convert($(this).val(), usdToByn));
        updateWidth($converterInputs);
    });

    $gbpInput.on('input', function () {
        $usdInput.val(convert($(this).val(), gbpToUsd));
        $bynInput.val(convert($(this).val(), gbpToByn));
        updateWidth($converterInputs);
    });

    $bynInput.on('input', function () {
        $usdInput.val(convert($(this).val(), 1/usdToByn));
        $gbpInput.val(convert($(this).val(), 1/gbpToByn));
        updateWidth($converterInputs);
    });
})();
