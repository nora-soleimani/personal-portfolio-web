const BLOG_POSTS = [
  { id: 1, seed: 'blogpost1', title: 'What does it take to become a web developer?', excerpt: 'Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet…', tag: 'Web Developer', date: '10.Oct.2023', read: '1 Min' },
  { id: 2, seed: 'blogpost2', title: 'A beginner\'s guide to responsive design', excerpt: 'Responsive design ensures a website looks and works well on every screen size, from phones to widescreen monitors…', tag: 'CSS', date: '02.Nov.2023', read: '2 Min' },
  { id: 3, seed: 'blogpost3', title: 'Why every developer should learn React', excerpt: 'React has become one of the most in-demand libraries for building fast, component-driven user interfaces…', tag: 'React', date: '18.Nov.2023', read: '3 Min' },
  { id: 4, seed: 'blogpost4', title: 'Freelancing as a developer: lessons learned', excerpt: 'After years of freelance work, here are the habits and tools that made client projects run smoothly…', tag: 'Career', date: '05.Dec.2023', read: '2 Min' },
  { id: 5, seed: 'blogpost5', title: 'Clean code habits that save you time later', excerpt: 'Small, consistent habits in how you write and organize code pay off enormously once a project grows…', tag: 'Best Practices', date: '20.Dec.2023', read: '2 Min' },
  { id: 6, seed: 'blogpost6', title: 'Getting comfortable with DevOps basics', excerpt: 'CI/CD, containers, and deployment pipelines explained simply for front-end and full-stack developers…', tag: 'DevOps', date: '08.Jan.2024', read: '3 Min' }
];

function renderBlogList(containerId){
  const el = document.getElementById(containerId);
  if (!el) return;
  const params = new URLSearchParams(window.location.search);
  const q = (params.get('q') || '').toLowerCase();
  const posts = q ? BLOG_POSTS.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)) : BLOG_POSTS;
  if (!posts.length){
    el.innerHTML = '<p style="text-align:center;color:var(--grey-light);padding:40px 0">No posts match "' + q + '".</p>';
    return;
  }
  el.innerHTML = posts.map((p, i) => `
    <div class="blog-card ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
      <img src="images/blog-${p.id}.svg" alt="${p.title}">
      <div class="body">
        <a href="article.html?id=${p.id}" class="title-link"><h3>${p.title}</h3></a>
        <p>${p.excerpt}</p>
        <a href="article.html?id=${p.id}" class="read-more">Read More »</a>
        <div class="meta"><span><b>${p.tag}</b></span><span><b>Text</b> Nora</span><span><b>Date</b> ${p.date}</span><span><b>Read</b> ${p.read}</span></div>
      </div>
    </div>`).join('');
}

function renderRelated(containerId, excludeId){
  const el = document.getElementById(containerId);
  if (!el) return;
  const posts = BLOG_POSTS.filter(p => p.id !== excludeId).slice(0, 4);
  el.innerHTML = posts.map((p, i) => `
    <div class="blog-card ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
      <img src="images/blog-${p.id}.svg" alt="${p.title}">
      <div class="body">
        <a href="article.html?id=${p.id}" class="title-link"><h3>${p.title}</h3></a>
        <p>${p.excerpt}</p>
        <a href="article.html?id=${p.id}" class="read-more">Read More »</a>
        <div class="meta"><span><b>${p.tag}</b></span><span><b>Text</b> Nora</span><span><b>Date</b> ${p.date}</span><span><b>Read</b> ${p.read}</span></div>
      </div>
    </div>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderBlogList('blog-list');
});
