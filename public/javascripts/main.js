try {
    const swiper = new Swiper(".footerSwiper", {
        slidesPerView: 3,
        grid: {
            rows: 2,
        },
        speed: 2500,
        spaceBetween: 20,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        slidesPerGroupSkip: 1,
    });
} catch (err) {
    console.log(err);
}




