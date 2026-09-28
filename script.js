  const routes = ['home','about','contact','app-codesnap','app-codesnap-privacy','app-codesnap-terms','app-codesnap-whats-new','privacy'];

  function nav(id){ location.hash = '#' + id; }

  function render(){
    let hash = location.hash.replace('#','') || 'home';
    if(!routes.includes(hash)) hash = 'home';
    const activeId = hash === 'privacy' ? 'app-codesnap-privacy' : hash;
    routes.forEach(r=>{
      const el = document.getElementById(r);
      if(el) el.classList.toggle('active', r === activeId);
    });
    const topLevel = ['home','about','contact'].includes(hash) ? hash : null;
    document.querySelectorAll('#nav a').forEach(a=>{
      a.classList.toggle('active', a.dataset.r === topLevel);
    });
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange', render);
  render();

  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('cName').value;
      const email = document.getElementById('cEmail').value;
      const msg = document.getElementById('cMsg').value;
      const body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=developer.hadiawali@gmail.com&su=Portfolio%20contact&body=' + body, '_blank');
    });
  }

  const showcase = document.getElementById('showcase');
  if(showcase){
    const screenshotCount = 5;
    for(let i = 1; i <= screenshotCount; i++){
      const card = document.createElement('div');
      card.className = 'screenshot';
      const img = document.createElement('img');
      img.src = `assets/showcase/${i}.webp`;
      img.alt = `App screenshot ${i}`;
      img.draggable = false;
      img.decoding = 'async';
      if(i > 3){ img.loading = 'lazy'; }
      img.addEventListener('load', ()=>{ card.classList.add('loaded'); });
      img.addEventListener('error', ()=>{ card.remove(); });
      card.appendChild(img);
      showcase.appendChild(card);
    }

    document.addEventListener('dragstart', e=>{ if(e.target.tagName === 'IMG') e.preventDefault(); });
  }
