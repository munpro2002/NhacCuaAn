const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('.display-music-name .music-name');
const cdPic = $('.display-music .display-music-picture');
const audio = $('#audio');
const cd = $('.display-music-picture')
const playBtn = $('.btn-play');
const progress = $('.display-music-range');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const songList = $('.song-list');
const musicCategoryBtn = $('.music-category');

const PlAYER_STORAGE_KEY = 'Host-player';

const app = {
    currentIndex: 0,
    currentPlayList: 'vpop',
    isVpopList: true,
    isUsUkList: false,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: {
        us_uk: [
            {
                name: "Beautiful In White",
                image: "./img/us_uk/song1.jpg",
                author: "Shane Filan",
                path: "./music/us_uk/song1.mp3"
            },
            {
                name: "Love Is Gone",
                image: "./img/us_uk/song2.jpg",
                author: "Dylan Matthew",
                path: "./music/us_uk/song2.mp3"
            },
            {
                name: "Dacing With Ur Ghost",
                image: "./img/us_uk/song3.jpg",
                author: "Sasha Sloan",
                path: "./music/us_uk/song3.mp3"
            },
            {
                name: "Bad Lier",
                image: "./img/us_uk/song4.jpg",
                author: "Shane Filan",
                path: "./music/us_uk/song4.mp3"
            },
            {
                name: "Everything I Need",
                image: "./img/us_uk/song5.jpg",
                author: "Shane Filan",
                path: "./music/us_uk/song5.mp3"
            },
            {
                name: "I Love You 3000",
                image: "./img/us_uk/song6.jpg",
                author: "Shane Filan",
                path: "./music/us_uk/song6.mp3"
            },
            {
                name: "Im Comming Home",
                image: "./img/us_uk/song7.jpg",
                author: "Shane Filan",
                path: "./music/us_uk/song7.mp3"
            },
            {
                name: "Something Just Like This",
                image: "./img/us_uk/song8.jpg",
                author: "Shane Filan",
                path: "./music/us_uk/song8.mp3"
            },
            {
                name: "Umbrella",
                image: "./img/us_uk/song9.jpg",
                author: "Shane Filan",
                path: "./music/us_uk/song9.mp3"
            },
            {
                name: "Let Me Down Slowly",
                image: "./img/us_uk/song10.jpg",
                author: "Shane Filan",
                path: "./music/us_uk/song10.mp3"
            },
        ],

        vpop: [
            {
                name: "Biết Tìm Đấu",
                image: "./img/vpop/song1.jpg",
                author: "Shane Filan",
                path: "./music/vpop/song1.mp3"
            },
            {
                name: "Không Bằng",
                image: "./img/vpop/song2.jpg",
                author: "Dylan Matthew",
                path: "./music/vpop/song2.mp3"
            },
            {
                name: "Là Ai Từ Bỏ, Là Ai Vô Tình",
                image: "./img/vpop/song3.jpg",
                author: "Sasha Sloan",
                path: "./music/vpop/song3.mp3"
            },
            {
                name: "Nợ Ai Đó Lời Xin Lỗi",
                image: "./img/vpop/song4.jpg",
                author: "Shane Filan",
                path: "./music/vpop/song4.mp3"
            },
            {
                name: "Nụ Cười 18 20",
                image: "./img/vpop/song5.jpg",
                author: "Shane Filan",
                path: "./music/vpop/song5.mp3"
            },
            {
                name: "Những Ngày Vắng Em",
                image: "./img/vpop/song6.jpg",
                author: "Shane Filan",
                path: "./music/vpop/song6.mp3"
            },
            {
                name: "Tướng Quân",
                image: "./img/vpop/song7.jpg",
                author: "Shane Filan",
                path: "./music/vpop/song7.mp3"
            },
            {
                name: "Từ Ngày Em Đến",
                image: "./img/vpop/song8.jpg",
                author: "Shane Filan",
                path: "./music/vpop/song8.mp3"
            },
            {
                name: "Thương Em Đến Già",
                image: "./img/vpop/song9.jpg",
                author: "Shane Filan",
                path: "./music/vpop/song9.mp3"
            },
            {
                name: "Đế Vương",
                image: "./img/vpop/song10.jpg",
                author: "Shane Filan",
                path: "./music/vpop/song10.mp3"
            },
        ]
    },
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function () {
        const _this = this;
        let htmls = this.songs[this.currentPlayList].map(function (song, index) {
            return `
            <div class="song-item ${_this.currentIndex === index ? 'active' : ''}" data-index = "${index}">
                <div class="song-pic"></div>

                <div class="song-body">
                    <h3>${song.name}</h3>
                    <span>${song.author}</span>
                </div>

                <div class="song-option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        }).join('');

        songList.innerHTML = htmls;
        $$('.song-item .song-pic').forEach(function (picture, index) {
            picture.style.background = `url(./img/${_this.currentPlayList}/song${index + 1}.jpg) no-repeat center/cover`;
        });
        cd.style.backgroundImage = `url(./img/${this.currentPlayList}/song1.jpg)`
    },

    handleEvents: function () {
        const currentSize = cd.offsetWidth;
        const _this = this;
        const cdRotation = cd.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity
        })

        cdRotation.pause();

        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newSize = currentSize - scrollTop;

            cd.style.width = newSize > 0 ? newSize + 'px' : 0;
            cd.style.height = newSize > 0 ? newSize + 'px' : 0;
            cd.style.opacity = newSize / currentSize;
        }

        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        audio.onplay = function () {
            _this.isPlaying = true;
            $('.display-music').classList.add('active');
            $('.btn-play i').classList.remove('fa-play');
            cdRotation.play();
        }
        audio.onpause = function () {
            _this.isPlaying = false;
            $('.display-music').classList.remove('active');
            $('.btn-play i').classList.add('fa-play');
            cdRotation.pause();
        }
        audio.ontimeupdate = function () {
            if (this.duration) {
                const currentProgress = Math.floor(this.currentTime / this.duration * 100);
                progress.value = currentProgress;
            }
        }

        progress.onchange = function (e) {
            const seekTime = e.target.value / 100 * audio.duration;
            audio.currentTime = seekTime;
        }

        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.random();
            }
            else {
                _this.next();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveElement();
        }
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.random();
            }
            else {
                _this.prev();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveElement();
        }
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            this.classList.toggle('active', _this.isRandom);
        }
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            this.classList.toggle('active', _this.isRepeat);
        }

        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            }
            else nextBtn.click();
        }

        songList.onclick = function (e) {
            const songNode = e.target.closest('.song-item:not(.active)')
            if (songNode || e.target.closest('.song-option')) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
            }
        }

        musicCategoryBtn.onclick = function () {
            if (_this.isUsUkList) {
                musicCategoryBtn.textContent = 'VPop';
                _this.isUsUkList = !_this.isUsUkList;
                _this.isVpopList = !_this.isVpopList;
                _this.currentPlayList = 'vpop';
            }
            else {
                musicCategoryBtn.textContent = 'US-UK';
                _this.isUsUkList = !_this.isUsUkList;
                _this.isVpopList = !_this.isVpopList;
                _this.currentPlayList = 'us_uk';
            }
            _this.render();
            _this.loadCurrentSong();
        }
    },
    next: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs[this.currentPlayList].length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prev: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs[this.currentPlayList].length - 1;
        }
        this.loadCurrentSong();
    },
    random: function () {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.songs[this.currentPlayList].length);
        }
        while (randomIndex === this.currentIndex)
        this.currentIndex = randomIndex;
        this.loadCurrentSong();
    },

    scrollToActiveElement: function () {
        setTimeout(() => {
            $('.song-item.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 300)
    },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentPlayList][this.currentIndex];
            }
        })
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    loadCurrentSong: function () {
        heading.textContent = `${this.currentSong.name}`;
        cdPic.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path;
    },

    start: function () {
        this.loadConfig();

        this.defineProperties();

        this.handleEvents();

        this.loadCurrentSong();

        this.render();

        repeatBtn.classList.toggle('active', this.isRepeat);
        randomBtn.classList.toggle('active', this.isRandom);
    }

}

app.start();