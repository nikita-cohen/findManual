function addButtonToWalmart() {
    const divToSetButton = document.querySelector('div.pt3');

    if (divToSetButton) {
        const insideButton = document.querySelector('div.pt3');

        const newDiv = document.createElement('div');

        const imageUrl = chrome.runtime.getURL('../asset/image/manual-image.svg');
        const strokeImageUrl = chrome.runtime.getURL('../asset/image/Stroke.svg');

        let styleElement = document.createElement('style');
        styleElement.innerHTML = `
            @font-face {
            font-family: Inter;
            src: local('Inter-SemiBold'), url(${chrome.runtime.getURL("asset/font/Inter-SemiBold.ttf")}) format('truetype');
            font-weight: 600;
            font-style: normal
            }
            
            .div-text {
            font-family: Inter, sans-serif;
            font-size: 22px;
            font-weight: 600;
            line-height: 27px;
            color: white;
            text-align: left;
            margin-left : 22px;
            }
            
            .stroke {
            margin-left : 100px;
            }
            `;
        styleElement.setAttribute('id', 'nightify');
        styleElement.setAttribute('type', "text/css");
        document.head.insertAdjacentElement('beforeend', styleElement);

        newDiv.innerHTML = `
            <div style="display: flex; align-items: center; width: 395px; height: 90px; background: linear-gradient(91.42deg, #1F80F1 0%, #005DCA 100%); margin-top: 20px; transform: translateX(-16px)">
            <img src="${imageUrl}" style="margin-left: 12px;" alt="url"/>
            <div class="div-text" style="width: 166px; height: 54px;">
            Find product manual
            </div>
            <img class="stroke" src="${strokeImageUrl}" alt="stroke">
            </div>
            `
        newDiv.style.cursor = 'pointer';
        newDiv.id = 'first-new-div';
        const product = document.querySelector('h1.f3.b.lh-copy.dark-gray.mt1.mb2');
        let productName = null;

        if (product) {
            productName = product.innerHTML;
        }
        if (productName) {
            newDiv.addEventListener('click', () => {
                window.open(chrome.runtime.getURL('html/OptionPage.html') + "#" + productName);
            })
        }

        insideButton.insertAdjacentElement('beforeend', newDiv);
    }
}

function addButtonToBestBuy() {
    const bustBuyDiv = document.querySelector('div.pricing-price.pricing-lib-price-19-2218-14.priceView-price');

    if (bustBuyDiv) {
        const trialDiv = document.querySelector('div.product-return-message.product-return-message--pdp.product-return-message--pdp-large');
        const newDiv = document.createElement('div');

        const imageUrl = chrome.runtime.getURL('../asset/image/manual-image.svg');
        const strokeImageUrl = chrome.runtime.getURL('../asset/image/Stroke.svg');

        let styleElement = document.createElement('style');
        styleElement.innerHTML = `
            @font-face {
            font-family: Inter;
            src: local('Inter-SemiBold'), url(${chrome.runtime.getURL("asset/font/Inter-SemiBold.ttf")}) format('truetype');
            font-weight: 600;
            font-style: normal
            }
            
            .div-text {
            margin-top: 25px; 
            height: 54px;
            font-family: Inter, sans-serif;
            font-size: 22px;
            font-weight: 600;
            line-height: 27px;
            color: white;
            text-align: left;
            margin-left : 22px;
            }
            
            .stroke {
            margin-left : 50px;
            }
            
            @media screen and (min-width: 1200px) {
            .stroke {
               margin-left : 10px;
              }
              
            .div-text {
              margin-top: 0;
            }
            }
            `;
        styleElement.setAttribute('id', 'nightify');
        styleElement.setAttribute('type', "text/css");
        document.head.insertAdjacentElement('beforeend', styleElement);

        newDiv.innerHTML = `
            <div style="display: flex; align-items: center; width: 100%; height: 67px; background: linear-gradient(91.42deg, #1F80F1 0%, #005DCA 100%); margin-top: 5px; ">
            <img src="${imageUrl}" style="margin-left: 16px;" alt="url"/>
            <div class="div-text">
            Find product manual
            </div>
            <img class="stroke" src="${strokeImageUrl}" alt="stroke">
            </div>
            `
        newDiv.style.cursor = 'pointer';
        const product = document.querySelector('h1.heading-5.v-fw-regular');
        let productName = null;

        if (product) {
            productName = product.innerHTML;
        }
        if (productName) {
            newDiv.addEventListener('click', () => {
                window.open(chrome.runtime.getURL('html/OptionPage.html') + "#" + productName);
            })
        }
        if (trialDiv) {
            trialDiv.after(newDiv)
        }
    }
}

function addButtonToAmazon() {
    const amazonBuyDiv = document.querySelector('div#atfRight1_feature_div.celwidget');
    const divAmazonBox = document.querySelector('div#rightCol.rightCol.rightCol-bbcxoverride');

    if (amazonBuyDiv || divAmazonBox) {
        const newDiv = document.createElement('div');

        const imageUrl = chrome.runtime.getURL('../asset/image/manual-image.svg');
        const strokeImageUrl = chrome.runtime.getURL('../asset/image/Stroke.svg');

        let styleElement = document.createElement('style');
        styleElement.innerHTML = `
            @font-face {
            font-family: Inter;
            src: local('Inter-SemiBold'), url(${chrome.runtime.getURL("asset/font/Inter-SemiBold.ttf")}) format('truetype');
            font-weight: 600;
            font-style: normal
            }
            
            .div-text {
            width : 161px;
            margin-top: 25px; 
            height: 54px;
            font-family: Inter, sans-serif;
            font-size: 22px;
            font-weight: 600;
            line-height: 27px;
            color: white;
            text-align: left;
            margin-left : 22px;
            display : flex;
            }
            
            .stroke {
           position: absolute;
           margin-top: 28px;
           margin-left: 89px;
            }
           
            .container {
            padding: 0;
            margin-bottom : 25px;
            justify-content : center;
            align-items : center;
            border: 1px solid rgba(0, 64, 227, 1);
            border-radius: 10px;
            display : flex;
            flex-direction: column;
            width: 100%;
            height: 168px;
            background: linear-gradient(91.42deg, #1F80F1 0%, #005DCA 100%);
            margin-top: 5px;
            }
            `;
        styleElement.setAttribute('id', 'nightify');
        styleElement.setAttribute('type', "text/css");
        document.head.insertAdjacentElement('beforeend', styleElement);

        newDiv.innerHTML = `
            <div class="container">
            <img src="${imageUrl}" style="width: 46px; height: 46px;" alt="url"/>
            <div class="div-text">
            Find product manual
            <img class="stroke" src="${strokeImageUrl}" alt="stroke">
            </div>
            
            </div>
            `
        newDiv.style.cursor = 'pointer';

        const product = document.querySelector('span#productTitle');

        let productName = null;

        if (product) {
            productName = product.innerHTML;
        }

        if (productName) {
            newDiv.addEventListener('click', () => {
                window.open(chrome.runtime.getURL('html/OptionPage.html') + "#" + productName);
            })
        }

        if (amazonBuyDiv) {
            amazonBuyDiv.parentNode.insertAdjacentElement('afterbegin', newDiv);
        } else {
            newDiv.querySelector('.container').style.width = '246px';
            newDiv.querySelector('.container').style.cursor = 'pointer';
            newDiv.style.display = 'flex';
            newDiv.style.justifyContent = 'flex-end';
            newDiv.style.cursor = 'default';
            divAmazonBox.insertAdjacentElement('afterbegin', newDiv);
        }

    }
}

window.addEventListener('load', (event) =>{
    if (window.location.host === "www.walmart.com") {
        addButtonToWalmart();
    }

    if (window.location.host === "www.bestbuy.com") {
        addButtonToBestBuy();
    }

    if (window.location.host === "www.amazon.com") {
        addButtonToAmazon();
    }
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        if (key === 'change_url') {
            console.log(key)
            setTimeout(() => {
                if (!document.querySelector('#first-new-div')){
                    addButtonToWalmart();
                }
            }, 1500)

        }
    }
})


