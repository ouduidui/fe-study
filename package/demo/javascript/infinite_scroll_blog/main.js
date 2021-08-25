// 获取节点
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// fetch post from API
async function getPosts() {
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    return await res.json();
}

// show posts in DOM
async function showPosts() {
    const posts = await getPosts();
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        postsContainer.appendChild(postEl);
    })
}

// showLoading
async function showLoading() {
    loading.classList.add('show');
    page++;
    await showPosts();
    loading.classList.remove('show');
}

// filterPosts
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post =>{
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
            post.style.display = 'flex';
        }else {
            post.style.display = 'none';
        }
    })
}

showPosts();

// 事件监听
window.addEventListener('scroll',() => {
    const {scrollTop,scrollHeight,clientHeight} = document.documentElement;

    // 判断是否滚动到底部
    if(scrollTop + clientHeight >= scrollHeight - 5){
        showLoading();
    }
})

filter.addEventListener('input',filterPosts);