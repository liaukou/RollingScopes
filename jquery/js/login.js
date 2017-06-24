(function () {
    const $emailInput = $('#email');
    const $emailBlock = $('.email-block');
    const $passwordInput = $('#password');
    const $passwordBlock = $('.password-block');

    const $allBlocks = $('.login-block > div');
    const $allButtons = $('.login-block button');

    const checkEmail = function (element, block) {
        let regexp = /^[\w\.]+@[a-z_]+?\.[a-z]{2,}$/i;
        if (regexp.test(element.val())) {
            block.addClass('valid')
                 .removeClass('invalid');
        } else {
            block.addClass('invalid')
                .removeClass('valid');
        }
    };

    const checkPassword = function (element, block) {
        if (element.val().length > 7) {
            block.addClass('valid')
                 .removeClass('invalid');
        } else {
            block.addClass('invalid')
                 .removeClass('valid');
        }
    };

    const checkAll = function (blocks) {
        let res = 0;
        blocks.each( (i, v) => {
            if ($(v).hasClass('valid')) {
                res++;
            }
        });
        if (res === blocks.length) {
            $('.login-block button').prop('disabled', false);
        }
        else {
            $('.login-block button').prop('disabled', true);
        }
    };

    $emailInput.on('input', function () {
        checkEmail($(this), $emailBlock);
        checkAll($allBlocks);
    });

    $passwordInput.on('input', function () {
        checkPassword($(this), $passwordBlock);
        checkAll($allBlocks);
    });

    $allButtons.on('click', function () {
        if (!$(this).prop('disabled')) {
            $(this).next().toggle();
        }
    });
})();
