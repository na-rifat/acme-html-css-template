$(document).ready(function () {
    notionCarousel(
        {
            autoplay: true,
            autoplayInterval: 3000
        }
    );
    notionAccordion(
        {
            startIndex: 1
        }
    );

    notionPricingTab();
    notionToggleMenu();
});

/**
 * Handles Ndotiohive carousle
 * @author Nura Alam Rifat
 * @param {object} props 
 */
function notionCarousel(props) {
    let parent = $(`.notion-carousel`)
    let carousels = parent.find(`.carousel-item`)
    let nextBtn = parent.find(`.carousel-next`)
    let prevBtn = parent.find(`.carousel-prev`)
    let navigator = parent.find(`.navigator .buttons`)
    let indicator = parent.find(`.navigator .indicator`)
    let animationType = `swing`;
    let current = $(`.carousel-item.active`)

    carousels.each(function () {
        indicator.append(
            `<div></div>`
        )
    })

    let indicators = indicator.find(`div`)

    indicators.eq(current.index()).addClass(`active`)

    nextBtn.on(`click`, function (e) {
        let current = $(`.carousel-item.active`)
        let next = current.next();

        if (next.index() == carousels.length) next = carousels.eq(0)

        indicators.removeClass(`active`)

        current.animate(
            {
                left: `-100%`
            },
            500,
            animationType,
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
            animationType,
            function (e) {
                $(this).addClass(`active`)
                indicators.eq($(this).index()).addClass(`active`)
            }
        )
    })


    prevBtn.on(`click`, function (e) {
        let current = $(`.carousel-item.active`)
        let prev = carousels.eq(current.index() - 1);

        indicators.removeClass(`active`)

        current.css(
            {
                left: `auto`
            }
        ).animate(
            {
                right: `-100%`
            },
            500,
            animationType,
            function (e) {
                $(this).removeClass(`active`)
            }
        )

        prev.css(
            {
                right: `auto`,
                left: `-100%`,
                zIndex: 99
            }
        ).animate(
            {
                left: 0
            },
            500,
            animationType,
            function (e) {
                $(this).addClass(`active`)
                indicators.eq($(this).index()).addClass(`active`)
            }
        )
    })

    let interval = props.autoplayInterval == undefined ? 2000 : props.autoplayInterval
    let autoplay = props.autoplay == undefined ? false : props.autoplay;

    if (autoplay == true) {
        setInterval(() => {
            nextBtn.trigger(`click`)
        }, interval);
    }
}

/**
 * Handles Notionhive accordion
 * @author Nura Alam Rifat
 * @param {object} props 
 */
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

    if (props.startIndex != undefined) {
        keys.eq(props.startIndex).trigger(`click`)
    }
}

/**
 * Handles Notionhive pricing tab navigation
 * @author Nura Alam Rifat
 */
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

        if (currentKey.index() == self.index()) return;

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


/**
 * Handles menu toggle
 * @author Nura Alam Rifat
 */
function notionToggleMenu() {
    let toggler = $(`.toggler`);
    let menu = $(`.top-nav`);

    toggler.on(`click`, function (e) {
        if (menu.css(`display`) == `none`) {
            menu.slideDown(300)
            $(this).find(`img`).css(
                {
                    transition: `.3s all linear`,
                    transform: `rotate(90deg)`
                }
            )
        } else {
            menu.slideUp(300)
            $(this).find(`img`).css(
                {
                    transition: `.3s all linear`,
                    transform: `rotate(0deg)`
                }
            )
        }

    })
}