let minimap = document.createElement('div');
let minimapSize = document.createElement('div');
let viewer = document.createElement('div');
let minimapContent = document.createElement('iframe');
let scale = 0.1;
let realScale;

minimap.className = 'minimap__container';
minimapSize.className = 'minimap__size';
viewer.className = 'minimap__viewer';
minimapContent.className = 'minimap__content';

minimap.append(minimapSize, viewer, minimapContent);
document.body.appendChild(minimap);

let html = document.documentElement.outerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

let iframeDoc = minimapContent.contentWindow.document;

iframeDoc.open();
iframeDoc.write(html);
iframeDoc.close();


function getDimensions() {
    let bodyWidth = document.documentElement.scrollWidth;
    let bodyHeight = document.documentElement.scrollHeight;
    let bodyRatio = bodyHeight / bodyWidth;
    let winRatio = window.innerHeight / window.innerWidth;

    minimap.style.width = '15%';

    let minimapWidthScale = minimap.clientWidth / bodyWidth;
    let minimapHeightScale = minimap.clientHeight / bodyHeight;

    realScale = Math.min(minimapWidthScale, minimapHeightScale);

    minimapSize.style.paddingTop = `${bodyRatio * 100}%`;
    viewer.style.paddingTop = `${winRatio * 100}%`;

    minimapContent.style.transformOrigin = 'top left';
    minimapContent.style.transform = `scale(${realScale})`;
    minimapContent.style.width = `${bodyWidth}px`;
    minimapContent.style.height = `${bodyHeight}px`;

    if (bodyHeight > window.innerHeight) {
        viewer.style.display = 'block';
    } else {
        minimapContent.style.transform = 'scale(1)';
        minimapContent.style.width = '100%';
        minimapContent.style.height = '100%';
        viewer.style.display = 'none';
    }
}


function trackScroll(){
    viewer.style.transform = `translateY(${window.scrollY * realScale}px)`
}

getDimensions()
window.addEventListener('scroll', trackScroll)
window.addEventListener('resize', getDimensions)