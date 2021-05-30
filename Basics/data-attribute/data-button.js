
var highlight = document.querySelectorAll('.tooltip');
highlight.forEach(function (item) {
    item.addEventListener('click', function () {
        if (item.dataset.highlightClick === 'on') {
            console.log('item: ', item);
            item.setAttribute('style', 'background-color: red');
        }
    }, false)
}, this);