const blogURL = location.origin ;
let position = ['top', 'right', 'bottom', 'left'];

const tip = tippy(`.md-content a[href^="${blogURL}"]`, {
    content:'',
    allowHTML: true,
    animation: 'scale-subtle',
    theme: 'translucent',
    followCursor: true,
    arrow: false,
    placement: position[Math.floor(Math.random() * position.length)],
    onShow(instance) {
        fetch(instance.reference.href)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                let firstPara = doc.querySelector('article');
                const element1 = document.querySelector(`[id^="tippy"]`);
                element1.classList.add('tippy')
                const partOfText = instance.reference.href.replace(/.*#/, '#');
                if (partOfText.startsWith('#')) {
                    firstPara = doc.querySelector(`[id="${partOfText.replace('#', '')}"]`);
                    
                    if (firstPara.tagName.startsWith('H')) {
                        firstPara = firstPara.nextElementSibling;
                    }
                    else {
                        firstPara = firstPara.innerText.replaceAll('↩', '').replaceAll('¶', '');
                    }
                    instance.popper.style.height = 'auto';
                }
                else {
                    if (firstPara.innerHTML.split(' ').length < 1000) {
                        instance.popper.style.height = '35%';
                    } else {
                        instance.popper.style.height= '5%';
                    }
                }
                instance.setContent(firstPara);
                
            })
            .catch(error => {
                console.log(error);
                instance.setContent('Error');
            });
    }
});

