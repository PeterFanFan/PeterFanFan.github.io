document.addEventListener('DOMContentLoaded', function() {
    const characterButtons = document.querySelectorAll('.character-button');
    const videoSources = document.querySelectorAll('.emotion-item video source');

    const jayNotice = document.getElementById('jay-chou-notice');

    characterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新按钮状态
            characterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // 获取选中的人物
            const selectedCharacter = this.dataset.character;

            // 控制Jay Chou提示信息的显示
            if (selectedCharacter === 'zjl_zjl') {
                jayNotice.style.display = 'block';
            } else {
                jayNotice.style.display = 'none';
            }

            // 更新所有视频源
            videoSources.forEach(source => {
                const currentPath = source.src;
                const fileName = currentPath.split('/').pop(); // 获取文件名
                const attributeName = fileName.split('_').slice(1).join('_'); // 获取属性名部分
                
                // 构建新的视频路径
                const newPath = `videos/${selectedCharacter}/${selectedCharacter === 'Chris_Hemsworth_019' ? '823' : selectedCharacter.split('_')[0]}_${attributeName}`;
                source.src = newPath;

                // 重新加载视频
                source.parentElement.load();
            });
        });
    });

    // Add carousel functionality for Quality Comparison section
    const carouselVideos = document.querySelector('.carousel-videos');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselVideos.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Optional: Add touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carouselVideos.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carouselVideos.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    carouselVideos.addEventListener('touchend', () => {
        if (touchEndX < touchStartX - 50) { // Swipe left
            currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
        } else if (touchEndX > touchStartX + 50) { // Swipe right
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
        }
        updateCarousel();
    });
});