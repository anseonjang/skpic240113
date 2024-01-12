$(function () {
    // ======================================================================================= logo, btnTop 클릭시 최상단
    $(".logo, .btnTop").on("click", () => {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 400); // 0.4초
    });

    // ======================================================================================= 스크롤 500px 이상 내릴때 btnTop 나타남 
    $(window).scroll(() => {
        if ($(this).scrollTop() > 500) {
            $(".btnTop").fadeIn();
        } else {
            $(".btnTop").fadeOut();
        }
    });


 // 메인 메뉴가 클릭되었는지 여부를 추적하는 새로운 변수 추가
let isMainMenuClicked = false;

function updateStyles(isScrolled, isHovered = false) {
    let imgSrc = isHovered || isScrolled ? './images/skPic-logo-or.png' : './images/skPic-logo.svg';

    let headerStyles = {
        'height': isHovered || isScrolled || isMainMenuClicked ? '110px' : '',
        'width': '100%',
        'background-color': isScrolled || isMainMenuClicked ? 'white' : (isHovered ? 'white' : ''),
        'border-bottom': isHovered || isScrolled || isMainMenuClicked ? '1px solid #ddd' : ''
    };

    let linkStyles = {
        'color': isHovered || isScrolled || isMainMenuClicked ? '#000' : '',
    };

    $("header img").attr('src', imgSrc);
    $("header").css(headerStyles);
    $("ul.searchLang li:nth-child(1) a i, ul.searchLang li:nth-child(3) a ").css('color', linkStyles.color);
    $(".nav-list>li>a, .submenu>li>a").css(linkStyles);
}

$(function () {
    // 변수 추가
    let isHovered = false;

    $(window).scroll(() => {
        let scrollTop = $(window).scrollTop();
        let isScrolled = scrollTop > 110;

        let headerStyles = {
            'height': isScrolled ? '110px' : '',
            'width': '100%',
            'background-color': isScrolled ? 'white' : '',
            'border-bottom': isScrolled ? '1px solid #ddd' : ''
        };

        let linkStyles = {
            'color': isHovered || isScrolled || isMainMenuClicked ? '#000' : '',
        };

        $("header img").attr('src', isScrolled ? './images/skPic-logo-or.png' : './images/skPic-logo.svg');
        $("header").css({
            ...headerStyles,
            'box-shadow': isScrolled ? '0 5px 5px rgba(0, 0, 0, 0.1)' : ''
        });

        updateStyles(isScrolled, isHovered);
    });

    // 대메뉴에 마우스 오버 및 아웃 이벤트 처리
    $("ul#menu, .innerHeader").hover(
        () => {
            $(".submenu, .smenu_bar").stop().slideDown('fast');
            isHovered = true; // 마우스가 올라갔음을 표시
            updateStyles($(window).scrollTop() > 110, isHovered);
        },
        () => {
            $(".submenu, .smenu_bar").stop().fadeOut('fast');
            isHovered = false; // 마우스가 나갔음을 표시
            updateStyles($(window).scrollTop() > 110, isHovered);
        }
    );

    // nav-list의 a에 hover 했을 때 a.active 색 나오도록 수정
    $(".nav-list>li").hover(
        function () {
            $(this).find(">a").addClass("active");
        },
        function () {
            $(this).find(">a").removeClass("active");
        }
    );

    $("ul#menu").slicknav();
});



// 나머지 부분은 동일하게 유지


    $(".submenu>li>a").mouseenter(function () {
        $(this).addClass("submenu-hovered");
        $(this).css({
            "color": "#999"
        });
    });

    $(".submenu>li>a").mouseleave(function () {
        $(this).removeClass("submenu-hovered");
        $(this).css({
            "color": ""
        });
    });

    $(window).scroll(updateStyleOnScroll);

    function updateStyleOnScroll() {
        let scrollTop = $(window).scrollTop();
        let isScrolled = scrollTop > 110;

        let headerStyles = {
            'height': isScrolled ? '110px' : '',
            'width': '100%',
            'background-color': isScrolled ? '#fff' : '',
            'border-bottom': isScrolled ? '1px solid #ddd' : ''
        };

        let linkStyles = {
            'color': isScrolled ? '#000' : ''
        };

        $("header img").attr('src', isScrolled ? './images/skPic-logo-or.png' : './images/skPic-logo.svg');
        $("header").css({
            ...headerStyles,
            'box-shadow': isScrolled ? '0 5px 5px rgba(0, 0, 0, 0.1)' : ''
        });

        updateStyles(isScrolled);
    }







    // ======================================================================================= 제품 아코디언
    let options = $(".pd_list .option");
    let currentIndex = 0;

    /* 옵션 클래스중 
     액티브 클래스 없는것 선택하여 이 요소중 화살표 클래스 내리고 투명도0 */
    $(".pd_list .option:not(.active) .wArrow").css({
        bottom: "-70px",
        opacity: 0

    });

    // 각 .option 버튼에 클릭 이벤트 추가
    options.on("click", function () {
        let option = $(this);

        if (option.hasClass("active")) {
            // 이미 열려있는 경우 닫기 
            option.removeClass("active");
        } else {
            // 열려있지 않은 경우 열기 
            // 모든 옵션요소의 클래스 제거
            options.removeClass("active");
            // 클릭한 옵션 요소에 클래스 추가
            option.addClass("active");
        }

        // 초기 배경 색과 투명도 설정
        updateBackground();

        // 선택된 옵션의 화살표만 보이도록 설정
        $(".wArrow").removeClass("active"); // 화살표 제거
        option.find(".wArrow").addClass("active");
        // 선택한 옵션 화살표에 액티브 클래스 추가

        let arrow = option.find(".wArrow");
        // 선택된 옵션에서 화살표를 찾아 변수 저장

        arrow.animate({
            bottom: "30px",
            opacity: 1
        }, 100); // 0.1초동안 위로 올리는 애니메이션

    });


    // 업데이트함수
    function updateBackground() {

        // 액티브 아닌 화살표 숨김
        $(".pd_list .option:not(.active) .wArrow").css({
            bottom: "-70px",
            opacity: 0
        });

    }
    // .each() - 모든 요소에 반복 작업 수행 



    // ======================================================================================= tab
    
    $(".inner_bbs li").click(function () {
        let $this = $(this);
        let index = $this.index();
        $this.addClass("active");
        $this.siblings(".inner_bbs li.active").removeClass("active");

        let $wrap = $this.closest(".inner_bbs");
        let $current = $wrap.find("> .tabs > .tab.active");
        let $post = $wrap.find("> .tabs > .tab").eq(index);

        $current.removeClass("active");
        $post.addClass("active");

        $(".slider").slick("setPosition");
    });

    $(".slider").slick({
        dots: true, // 페이지 번호 표시 (true 또는 false)
        arrows: true, // 화살표 표시 (true 또는 false)
        slidesToShow: 3, // 보여질 슬라이드 개수

        responsive: [{
                breakpoint: 1025, // 화면 폭 1025px 이하일 때 적용
                settings: {
                    slidesToShow: 2, // 보여질 슬라이드 개수 변경
                }
            },

            {
                breakpoint: 769, // 화면 폭 769px 이하일 때 적용
                settings: {
                    slidesToShow: 1, // 보여질 슬라이드 개수 변경
                    centerMode: true, // 슬라이드 중앙 정렬 활성화
                    centerPadding: '60px', // 중앙 정렬 시 양쪽 여백 설정
                }
            }
        ]
    });


});

// ... (전개연산자 또는 스프레드 연산자)
// : 이것은, 객체의 속성들을 복사하여 다른 객체에 넣음
// ex - let obj2 = {...obj1} // obj1 = {a:1, b:2};


// ======================================================================================= career news slide 
// DOMContentLoaded 모든 HTML 문서가 로드되었을때 실행하라는 이벤트
document.addEventListener("DOMContentLoaded", function () {
    // 슬라이드
    let newsSlide = document.querySelector('.news_slide');
    // 이전버튼
    let prevBtn = document.getElementById('prevBtn');
    // 다음버튼
    let nextBtn = document.getElementById('nextBtn');
    // 초기값 0 
    let currentIndex = 0;
    // 반복하여 실행하는 변수 
    let intervalId;

    // 자동슬라이드 함수 
    function startAutoSlide() {
        intervalId = setInterval(() => {
            // 0,1,2 순환시켜줌
            currentIndex = (currentIndex + 1) % newsSlide.children.length;
            updateNewsSlide();
        }, 2000); // 2초마다 슬라이드 이동
    }
    // setInterval 반복실행
    // clearInterval 반복실행 멈춤 

    // 슬라이드 멈춤 함수 
    function stopAutoSlide() {
        clearInterval(intervalId);
    }


    // 마우스가 아이템들에 들어왔을때 슬라이드 멈춤
    newsSlide.addEventListener('mouseenter', stopAutoSlide);
    // 마우스가 아이템들에 벗어났을때 슬라이드 멈춤
    newsSlide.addEventListener('mouseleave', startAutoSlide);


    // 초기에 자동 슬라이드 시작 
    startAutoSlide();



    // 이전버튼 클릭 이벤트
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        // 업데이트 함수 호출 
        updateNewsSlide();
    });


    // 다음버튼 클릭 이벤트
    nextBtn.addEventListener('click', () => {
        // newsSlide.children.length => .items갯수를 의미
        currentIndex = Math.min(currentIndex + 1, newsSlide.children.length - 1);
        // 업데이트 함수 호출 
        updateNewsSlide();
    });
    // 슬라이드 업데이트 함수 
    function updateNewsSlide() {
        // 각 아이템의 높이값 가져와 변수로 저장
        // .offsetHeight; html 높이값을 픽셀단위로 가져옴 
        let itemHeight = document.querySelector('.items').offsetHeight;
        let translateYValue = -currentIndex * itemHeight;
        // 현재 인덱스에 따라 translateY 값을 계산하여 업데이트
        newsSlide.style.transform = `translateY(${translateYValue}px)`; // 100px
    }

});
// newsSlide.children.length -1 : -1보다 크면 최대값인 
// newsSlide.children.length -1이 반환
// .max() -> 주어진 숫자들 중 가장 큰 값을 반환하는 메서드
// .min() -> 주어진 숫자들 중 가장 큰 값을 반환하는 메서드
// currentIndex = Math.max(currentIndex - 1, 0);
// 현재의 인덱스값을 1만큼 감소시키는 코드 
// 0보다 작아지지 않게 하는 역할을 함
// .max 최대값
// 주어진 요소들 중 가장 큰 값을 반환
// 1, 0을 비교해서 둘 중에 큰 값을 currentIndex에 할당
// currentIndex - 1 현재 인덱스에서 1을 뺀 값 
// 0을 최소값으로 설정하는 구조
// -1이 0보다 작으면, 최소값인 0이 반환되고, 그렇지 않으면, -1
// 인덱스를 1만큼 감소시키면서 최소값은 0으로 제한하는 역할



// ======================================================================================= 관련사이트 함수 

// 선택된 사이트 열기 함수
function Site() {
    // 각 사이트 URL 맵핑 (대입)
    let sites = {
        "SK": "https://www.sk.com",
        "SKC": "https://www.skc.co.kr",
        "SKN": "http://www.sknexilis.com/kr/",
        "SKEN": "https://www.skenpulse.com/",
        "SKPucore": "https://www.skpucore.com/"
    };
    // 선택된 사이트의 URL 가져오기
    let selectedSite = sites[$("#familySites").val()];
    // 만약 선택된 사이트가 존재하면 새 창으로 해당 url 열기 
    if (selectedSite) {
        window.open(selectedSite, "_blank");
    }
}