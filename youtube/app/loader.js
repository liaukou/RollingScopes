class Loader {
    constructor(container) {
        this.key = 'AIzaSyBvTUJ8UAWRgNcBe-ZV-rsyaZmcVHLeXa4';
        this.container = container;
        this.q = '';
        this.nextPageToken = '';
        this.count = 0;
    }

    addItems(q) {
        if (!this.q) {
            this.q = q;
        } else if (q && this.q !== q) {
            this.q = q;
            this.nextPageToken = '';
            this.container.innerHTML = '';
            this.container.style = '';
            this.container.setAttribute('currentX', 0);
            this.count = 0;
        }
        let itemsIds = [];
        let items = `https://www.googleapis.com/youtube/v3/search?` +
            `key=${this.key}&` +
            `pageToken=${this.nextPageToken}&` +
            `type=video&` +
            `part=snippet&` +
            `maxResults=15&` +
            `q=${this.q}`;

        let renderContent = function(response) {
            let html = '';
            let width = this.count / Math.floor(document.documentElement.clientWidth / 320) * 100;
            let data = JSON.parse(response);

            this.container.style.width = `${width}vw`;
            for (let i = 0; i < data.items.length; i++) {
                html += this.tab(data.items[i]);
            }
            this.container.innerHTML += html;
            document.body.appendChild(this.container);
        }.bind(this);

        let takeStatistics = function(response) {
            this.nextPageToken = JSON.parse(response).nextPageToken;
            JSON.parse(response).items.map((v) => {
                itemsIds.push(v.id.videoId);
            });
            this.count += itemsIds.length;
            let statistics = `https://www.googleapis.com/youtube/v3/videos?` +
                `key=${this.key}&` +
                `id=${itemsIds.join(',')}&` +
                `part=snippet,statistics`;

            let xhr = new XMLHttpRequest();
            xhr.open('GET', statistics);
            xhr.send();

            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;

                if (xhr.status != 200) {
                    alert(xhr.status + ': ' + xhr.statusText);
                } else {
                    renderContent(xhr.responseText);
                }
            };
        }.bind(this);

        let xhr = new XMLHttpRequest();
        xhr.open('GET', items);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                takeStatistics(xhr.responseText);
            }
        };
    }

    tab(element) {
        return `<div class="tab">
            <img src="${element.snippet.thumbnails.medium.url}" alt="">
            <h4><a href="https://www.youtube.com/watch?v=${element.id}" target="_blank">${element.snippet.title.slice(0, 50)}</a></h4>
            <div class="caption">
                <p class="author">${element.snippet.channelTitle}</p>
                <p class="date">${new Date(element.snippet.publishedAt).toDateString()}</p>
                <p class="counter">${element.statistics.viewCount}</p>
                <p class="description">${element.snippet.description.slice(0, 100)}...</p>
            </div>
        </div>`;
    }
}

module.exports = Loader;
