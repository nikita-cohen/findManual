const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const backBtnAfterEnter = document.getElementById('back-btn-after-enter');
const backBtnHistory = document.getElementById('back-btn-history');
const historyButton = document.getElementById('image-history');
let timer = null;

async function onClickSearchButton(type) {
    const value = document.getElementById('search-input').value;
    const searchInputInFunc = document.getElementById('search-input');

    if (value !== "") {
        try {
            document.getElementById('search-input-container').style.height = 'auto';

            const response = await fetch('https://search.findmanual.guru/manual/search/all/' + value);
            const data = await response.json().catch(e => console.log(e));

            if (data?.length > 0) {
                const resultAfterEnter = document.getElementById('result-after-enter');

                if (type === "search") {
                    chrome.storage.local.get('history_list', (result) => {
                        saveHistoryElementToStorage(value, result);
                    })
                }

                const newDiv = document.createElement('div');
                newDiv.classList.add('header-after-search');
                newDiv.innerHTML = value;

                const innerResult = document.createElement('div')
                innerResult.classList.add('inner-result-after-enter');

                data.forEach(manual => {
                    const newSearchResult = document.createElement('a');
                    if (manual._source.title) {
                        newSearchResult.innerHTML = manual._source.title;
                        newSearchResult.href = manual._source.url;
                    } else {
                        newSearchResult.innerHTML = manual.label;
                        newSearchResult.href = manual._source.url;
                    }

                    newSearchResult.addEventListener('click' , (event) => {
                        window.open(event.target.href, '_blank');
                    })
                    innerResult.appendChild(newSearchResult);
                })

                resultAfterEnter.appendChild(newDiv);
                resultAfterEnter.appendChild(innerResult);

                const insideResult = document.getElementById('inside-result');

                let child = insideResult.lastElementChild;
                while (child) {
                    insideResult.removeChild(child);
                    child = insideResult.lastElementChild;
                }

                document.getElementById('list').style.display = 'none';

                searchInputInFunc.value = "";

                document.getElementById('first-container').style.display = 'none';
                document.getElementById('after-enter-container').style.display = 'block';
            } else {
                const insideResult = document.getElementById('inside-result');

                let child = insideResult.lastElementChild;
                while (child) {
                    insideResult.removeChild(child);
                    child = insideResult.lastElementChild;
                }

                document.getElementById('list').style.display = 'none';

                searchInputInFunc.value = "";

                document.getElementById('first-container').style.display = 'none';
                document.getElementById('after-enter-container').style.display = 'block';
            }

        } catch (e) {
            console.log(e)
        }

    }
}

function checkDate(date) {
    const obj = {}

    if ((date.getMonth() + 1).toString().length < 2) {
        obj.month = "0" + (date.getMonth() + 1);
    } else {
        obj.month = (date.getMonth() + 1);
    }

    if ((date.getHours() + 1).toString().length < 2) {
        obj.hour = "0" + date.getHours();
    } else {
        obj.hour = date.getHours();
    }

    if ((date.getMinutes() + 1).toString().length < 2) {
        obj.minutes = "0" + date.getMinutes();
    } else {
        obj.minutes = date.getMinutes();
    }

    if ((date.getUTCDate() + 1).toString().length < 2) {
        obj.day = "0" + date.getUTCDate();
    } else {
        obj.day = date.getUTCDate();
    }

    return obj;
}

function setOnChange() {
    searchInput.addEventListener('input', async (e) => {
        if(timer !== null) {
            clearTimeout(timer);
        }

        timer = setTimeout(async function() {
            const list = document.getElementById('list');
            if (e.target.value === "") {
                list.style.display = 'none';
                document.getElementById('search-input-container').style.height = 'auto';
            } else {
                try {
                    const insideResult = document.getElementById('inside-result');

                    let child = insideResult.lastElementChild;
                    while (child) {
                        insideResult.removeChild(child);
                        child = insideResult.lastElementChild;
                    }

                    const response = await fetch('https://search.findmanual.guru/manual/search/' + e.target.value);
                    const data = await response.json();

                    data.forEach(manual => {
                        const newSearchResult = document.createElement('a');
                        if (manual._source.title) {
                            newSearchResult.innerHTML = manual._source.title;
                        } else {
                            newSearchResult.innerHTML = manual.label;
                        }
                        newSearchResult.href = manual._source.url;
                        newSearchResult.addEventListener('click' , (event) => {
                            window.open(event.target.href, '_blank');
                        })
                        insideResult.appendChild(newSearchResult);
                    })

                    if (data.length > 0) {
                        document.getElementById('search-input-container').style.overflowY = 'auto';
                        document.getElementById('search-input-container').style.height = '300px';
                        list.style.display = 'block';
                    } else {
                        list.style.display = 'none';
                        document.getElementById('search-input-container').style.height = 'auto';
                    }
                } catch (e) {
                    console.log(e)
                }

            }
        }, 500);

    })
}

function setOnKeyPress() {
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            if (event.target.value !== "") {
                onClickSearchButton("search").then();
            }
        }
    })
}

function saveHistoryElementToStorage(link, result) {
    let today = new Date();
    const date = checkDate(today);

    let time = date.hour + ":" + date.minutes + " " + date.day + "." + date.month + "." + today.getFullYear();

    const newArray = result.history_list;
    if (link) {
        newArray.push({title: link , date: time});
    }

    chrome.storage.local.set({'history_list': newArray}).then(data => console.log("ok"));
}

function createHistoryElement(link) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('history-element');

    const item = document.createElement('div');
    item.classList.add('item');

    const img = document.createElement('img');
    img.src = '../asset/image/TimeCircle.svg';

    const aTag = document.createElement('a');
    aTag.innerHTML = link.title;

    aTag.addEventListener('click', (event) => {
        chrome.storage.local.get('history_list', (result) => {
            saveHistoryElementToStorage(link.title , result);
            const resultAfterEnter = document.getElementById('history-result');
            document.getElementById('search-input').value = link.title;
            while (resultAfterEnter.childNodes.length > 1) {
                resultAfterEnter.removeChild(resultAfterEnter.lastChild);
            }
            document.getElementById('history-container').style.display = 'none';
            onClickSearchButton("none").then();
        });
    })

    item.appendChild(img);
    item.appendChild(aTag);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('item-date');

    dateDiv.innerHTML = link.date;

    newDiv.appendChild(item);
    newDiv.appendChild(dateDiv);

    document.getElementById('history-result').appendChild(newDiv);
}

function setOnClick() {
    searchButton.addEventListener('click', (event) => {
        onClickSearchButton("search").then();
    })

    backBtnAfterEnter.addEventListener('click', (event) => {
        const resultAfterEnter = document.getElementById('result-after-enter');

        let child = resultAfterEnter.lastElementChild;
        while (child) {
            resultAfterEnter.removeChild(child);
            child = resultAfterEnter.lastElementChild;
        }

        document.getElementById('first-container').style.display = 'block';
        document.getElementById('after-enter-container').style.display = 'none';
    })

    backBtnHistory.addEventListener('click', (event) => {
        const resultAfterEnter = document.getElementById('history-result');

        while (resultAfterEnter.childNodes.length > 2) {
            resultAfterEnter.removeChild(resultAfterEnter.lastChild);
        }

        document.getElementById('first-container').style.display = 'block';
        document.getElementById('history-container').style.display = 'none';
    })

    historyButton.addEventListener('click', (event) => {
        chrome.storage.local.get('history_list', (result) => {
            document.getElementById('first-container').style.display = 'none';
            const searchInputInFunc = document.getElementById('search-input').value = "";
            const insideResult = document.getElementById('inside-result');

            let child = insideResult.lastElementChild;
            while (child) {
                insideResult.removeChild(child);
                child = insideResult.lastElementChild;
            }

            document.getElementById('list').style.display = 'none';

            searchInputInFunc.value = "";
            document.getElementById('search-input-container').style.height = 'auto';
            document.getElementById('history-container').style.display = 'block';

            if (result.history_list){
                console.log(result.history_list)
                if (result.history_list.length === 0) {
                    document.getElementById('no-history-result').style.display = 'flex';
                    document.getElementById('history-result').style.display = 'none';
                } else {
                    document.getElementById('no-history-result').style.display = 'none';
                    document.getElementById('history-result').style.display = 'flex';
                    result.history_list.reverse().forEach(link => {
                       createHistoryElement(link);
                    })
                }
            }

        })
    })
}

function init() {
    setOnKeyPress();
    setOnChange();
    setOnClick();
}

init();
