try {
    const btnGuests = document.getElementById('guestsList');

    if (btnGuests) {
        btnGuests.addEventListener('click', function (ev) {
            ev.preventDefault();
            let url = 'http://localhost:4008/guests?check-in=true';

            getAllData(url).catch(error => {
                error.message; // 'An error has occurred: 404'
            });

        });
    }
} catch (e) {
    console.log(e);
}
try {

    const searchName = document.getElementById('searchName');
    const listNames = document.querySelector('.search-page__result');
    if (searchName) {
        searchName.addEventListener('click', function (e) {
            e.preventDefault();

            // открытие виртуальной клавиатуры
            const keyboards = document.querySelectorAll('.hg-rows').length;
            if (keyboards === 0) {
                const Keyboard = window.SimpleKeyboard.default;
                const KeyboardLayouts = window.SimpleKeyboardLayouts.default;
                const layout = new KeyboardLayouts().get("russian");

                const myKeyboard = new Keyboard({
                    onChange: input => onChange(input),
                    onKeyPress: button => onKeyPress(button),
                    ...layout
                });
            }
            function onChange(input) {
                document.querySelector(".search-page__input").value = input;

                let value = input;

                if (!value) listNames.innerHTML = '';

                if (value && value.length > 2) {

                    listNames.innerHTML = '';

                    value = value.toLowerCase();
                    value = value.charAt(0).toUpperCase() + value.slice(1);
console.log(value);
                    let url = `http://localhost:4008/guests?lastname=${value}`;

                    // поиск по базе данных
                    getAllData(url)
                        .then((guests) => {
                            if (guests.length) {
                                guests.forEach(guest => {
                                    let listItem = document.createElement('li');
                                    listItem.className = 'search-page__result--item';
                                    listItem.innerHTML = `<a href="/greeting?id=${guest.id}">${guest.name} ${guest.lastname}</a>`;
                                    listNames.append(listItem);
                                });
                            }
                        })
                        .catch(error => {
                            error.message; // 'An error has occurred: 404'
                        });
                }


            }

            function onKeyPress(button) {
                // буквы в верхнем регистре при нажатии на Shift CapsLock
                if (button === "{shift}" || button === "{lock}") handleShift();
            }

            function handleShift() {
                let currentLayout = myKeyboard.options.layoutName;
                let shiftToggle = currentLayout === "default" ? "shift" : "default";

                myKeyboard.setOptions({
                    layoutName: shiftToggle
                });
            }

        });
    }


} catch (e) {
    console.log(e);
}

async function getAllData(url) {
    let options = {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
    };
    let response = await fetch(url, options);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    let text = await response.text();
    return JSON.parse(text);
}

function idleLogout() {
    let t;

        window.onload = resetTimer;
        window.onmousemove = resetTimer;
        window.onmousedown = resetTimer;  // catches touchscreen presses as well
        window.ontouchstart = resetTimer; // catches touchscreen swipes as well
        window.ontouchmove = resetTimer;  // required by some devices
        window.onclick = resetTimer;      // catches touchpad clicks as well
        window.onkeydown = resetTimer;
        window.addEventListener('scroll', resetTimer, true); // improved; see comments

    function yourFunction() {
        // your function for too long inactivity goes here
        let url = window.location.href;

        window.location.href = 'http://localhost:3008/';

    }

    function resetTimer() {
        clearTimeout(t);
        t = setTimeout(yourFunction, 60000);  // time is in milliseconds
    }
}

if (window.location.href !== 'http://localhost:3008/timing' && window.location.href !== 'http://localhost:3008/') {
    idleLogout();
}





