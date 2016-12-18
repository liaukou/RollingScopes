(function () {
    const $chatNameInput = $('.chat input');
    const $chatMsgList = $('.message-list');
    const $chatAddButton = $('.add-dlg-button');

    const addDialog = function (name) {
        const html = `<li>
                        <a href=""><img class="avatar" src="./img/ava.jpg" alt="Profile photo"></a>
                        <h3>${name}</h3>
                        <p class="message">Nothing here yet.</p>
                    </li>`;
        $chatMsgList.prepend(html);
        $chatMsgList.children().last().remove();
        $chatAddButton.off();
        $chatNameInput.val('');
    };

    $chatNameInput.on('change', function () {
        let name = $(this).val();
        $chatAddButton.on('click', addDialog(name));
    });
})();
