let setId = setInterval(function () {
  if (mainVideo.ended) {
      document.querySelector('.m-again').style.display = 'block';
      videoPlay = 'off';
      document.querySelector('.pauseIcon i').className = 'fas fa-play';
      clearInterval(setId);
  }
}, 100);

// Replay Video
document.querySelector('.m-again').addEventListener('click', function () {
  videoPlay = 'on';
  mainVideo.play();
  document.querySelector('.pauseIcon i').className = 'fas fa-pause';
  this.style.display = 'none';
});

// Scroll to Next Section
let nextTop = document.querySelector('#section2').offsetTop;
document.querySelector('.nextIcon').addEventListener('click', function () {
  window.scrollTo({ top: nextTop, behavior: 'smooth' });
});

const TrandingWrap = $('.tranding-wrap');
let offset = TrandingWrap.offset().left;

TrandingWrap.on({
    mousemove(e) {
        // Check if mouse is beyond a certain limit
        if (e.pageX >= $(window).width() - 100) {  // Change 100 based on desired boundary
            return false;
        } else {
            // Adjust the position based on the mouse position relative to the offset
            $(this).css({ left: -(e.pageX - offset) });
        }
    }
});

$('.footer-currency>a').click(function(){
    $('.currencies').toggleClass('currencies1');
});




let container = document.querySelector('.gallery-wrap');
let loadMoreBtn = document.querySelector('.loadMoreBt');
let letAddItemCount = 6;
let added = 0;
let allData = [];

// JSON 데이터 로드
fetch('./data/video.json')
    .then(response => response.json())
    .then(data => {
        allData = data;
        addItem(); // 초기 항목 추가
        loadMoreBtn.addEventListener('click', addItem); // "Load More" 버튼 클릭 시 항목 추가
    })
    .catch(error => console.error('Error loading JSON:', error));

// 항목 추가 함수
function addItem() {
    let element = [];
    let slicedData = allData.slice(added, added += letAddItemCount);

    slicedData.forEach(item => {
        let itemHTML = `
            <li class="gallery-item">
                <div>
                    <a href="javascript:void(0);" class="galleryBt">
                        <span class="gallery-video">
                            <video autoplay muted loop playsinline src="${item.video}"></video>
                        </span>
                        <span class="galleryCap"></span>
                        <span class="gallery-title">
                            <span><strong>${item.title}</strong></span>
                            <span><b>${item.description}</b></span>
                            <span><i class="exploreBt">Explore</i></span>
                        </span>
                    </a>
                </div>
            </li>`;

        // DOM에 HTML 추가
        let liElement = document.createElement('li');
        liElement.classList.add('gallery-item');
        liElement.innerHTML = itemHTML;
        element.push(liElement);

        // "Load More" 버튼의 텍스트 업데이트
        if (added < allData.length) {
            loadMoreBtn.textContent = 'Load More';
        } else {
            loadMoreBtn.style.background = '#384244';
            loadMoreBtn.style.color = '#dee4e3';
            loadMoreBtn.style.border = '#5e686a 1px solid';
            loadMoreBtn.textContent = 'END';
        }
    });

    // 새로 생성한 항목들을 컨테이너에 추가
    element.forEach(item => {
        container.appendChild(item);
    });
}


