console.log('loaded')


function toggleMenu(){
    // const allMenuItems = document.querySelectorAll('.menu-item');

    // allMenuItems.forEach(item=>{
    //    const oldClasses = item.getAttribute('class');
    //    if(oldClasses.indexOf('hide')>-1){
    //     item.setAttribute('class',oldClasses.split('hide').join(''))
    //    }else{
    //     item.setAttribute('class',oldClasses + ' hide')
    //    }
    // })

    const menuDiv = document.getElementById('menu-items');
    const oldClasses = menuDiv.getAttribute('class');
    if(oldClasses.indexOf('hide')>-1){
        menuDiv.setAttribute('class','animated')
    }else{
        menuDiv.setAttribute('class','hiding');
        setTimeout(function(){
            menuDiv.setAttribute('class','hide')
        },300)
    }
}

function  scrollToEl(elementId){
    const el = document.getElementById(elementId);
    scrollTo({top:el.offsetTop-100, behavior:'smooth'})
}



let lastKnownScrollPosition = 0;
let ticking = false;
let cardAnimated = false;
let priceAnimated = false;
let testAnimated = false;

var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};


function doAnimation(scrollPos) {

  const el_cards = document.getElementById('cards');
  if(isInViewport(el_cards) && !cardAnimated){
    el_cards.classList.add('animate__animated', 'animate__bounceInUp','animate__slow');
    el_cards.classList.remove('hideEl');
    cardAnimated = true;
  }

  const el_price = document.getElementById('price-cards');
  let delay =0;
  if(isInViewport(el_price) && !priceAnimated){
    for(let e of el_price.children){
        console.log(e);
        e.classList.add('animate__animated', 'animate__fadeInUp',`animate__delay-${delay}s`);
        e.classList.remove('hideEl');
        delay++;
    }
    priceAnimated = true;
    
  }

  const el_test = document.getElementById('testimonials');

  if(isInViewport(el_test) && !testAnimated){
    el_test.classList.add('animate__animated', 'animate__fadeInRight');
    el_test.classList.remove('hideEl');
    testAnimated = true;
  }

}


document.addEventListener('scroll', (e) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      doAnimation(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});
