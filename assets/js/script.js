$(document).ready(function () {
    notionCarousel(
        {

        }
    );
    notionAccordion(
        {

        }
    );

    notionPricingTab();
});

function notionCarousel(props) {
    let parent = $(`.notion-carousel`)
    let carousels = parent.find(`.carousel-item`)
    let nextBtn = parent.find(`.carousel-next`)
    let prevBtn = parent.find(`.carousel-prev`)
    let navigator = parent.find(`.carousel-navigator`)


    nextBtn.on(`click`, function (e) {
        let current = $(`.carousel-item.active`)
        let next = current.next();

        if (next.index() == carousels.length ) next = carousels.eq(0)

        current.animate(
            {
                left: `-100%`
            },
            500,
            function (e) {
                $(this).removeClass(`active`)
            }
        )
        next.css(
            {
                left: `auto`,
                right: `-100%`,
                zIndex: 99
            }
        ).animate(
            {
                right: 0
            },
            500,
            function (e) {
                $(this).addClass(`active`)
            }
        )
    })
}

function notionAccordion(props) {
    let parent = $(`.notion-accordion`)
    let items = parent.find(`.accordion-item`)
    let keys = parent.find(`.accordion-key`)
    let contents = parent.find(`.accordion-content`)
    let openIcons = parent.find(`.accordion-key img:nth-child(1)`)
    let closeIcons = parent.find(`.accordion-key img:nth-child(2)`)
    let currentKey = parent.find(`.accordion-key.active`)
    let currentContent = parent.find(`.accordion-content.active`)
    let currentIndex = currentKey.parent().index();
    openIcons.eq(currentIndex).hide();
    closeIcons.eq(currentIndex).show()

    keys.on(`click`, function (e) {
        currentKey = parent.find(`.accordion-key.active`)
        currentContent = parent.find(`.accordion-content.active`)
        let clicked = $(this)
        clickedIndex = clicked.parent().index();
        currentIndex = currentKey.parent().index();


        currentContent.slideUp(300, function (e) {
            currentContent.removeClass(`active`)
            currentKey.removeClass(`active`)

            openIcons.eq(currentIndex).show();
            closeIcons.eq(currentIndex).hide()
        });



        if (clickedIndex != currentIndex) {
            items.eq(clickedIndex).find(`.accordion-content`).slideDown(300, function (e) {
                clicked.addClass(`active`)
                $(this).addClass(`active`)
                openIcons.eq(clickedIndex).hide();
                closeIcons.eq(clickedIndex).show()
            })
        }
    })
}

function notionPricingTab() {
    let parent = $(`.pricing-tab`)
    let keys = parent.find(`.tab-key`)
    let pages = parent.find(`.tab-page`)
    let currentKey = parent.find(`.tab-key.active`)
    let currentPage = parent.find(`.tab-page.active`)

    keys.on(`click`, function (e) {
        currentKey = parent.find(`.tab-key.active`)
        currentPage = parent.find(`.tab-page.active`)
        let self = $(this)

        currentKey.removeClass(`active`);
        currentPage.removeClass(`active`)

        self.addClass(`active`)

        currentPage.fadeOut(300, function (e) {
            pages.eq(self.index()).fadeIn(200, function (e) {
                $(this).addClass(`active`)
            })
        })
    })
}
