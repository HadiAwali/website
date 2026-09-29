  const routes = ['home','about','contact','app-codesnap','app-codesnap-privacy','app-codesnap-terms','privacy'];

  function nav(id){ location.hash = '#' + id; }

  function render(){
    let hash = location.hash.replace('#','') || 'home';
    const wantWhatsNew = hash === 'app-codesnap-whats-new';
    if(wantWhatsNew) hash = 'app-codesnap';
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
    if(wantWhatsNew){
      scrollToWhatsNew();
      return;
    }
    window.scrollTo(0,0);
  }

  function scrollToWhatsNew(){
    const target = document.getElementById('whats-new');
    if(!target) { window.scrollTo(0,0); return; }
    const smooth = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    const go = ()=> target.scrollIntoView({behavior:smooth, block:'start'});
    requestAnimationFrame(go);
    // showcase cards resize when their images finish loading, so settle again
    const imgs = [...document.querySelectorAll('#showcase img')];
    let pending = imgs.filter(i=>!i.complete).length;
    if(!pending) return;
    imgs.forEach(i=>{
      if(i.complete) return;
      const once = ()=>{ pending--; if(pending <= 0) go(); };
      i.addEventListener('load', once, {once:true});
      i.addEventListener('error', once, {once:true});
    });
  }
  window.addEventListener('hashchange', render);
  render();

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('nav');
  if(navToggle && navMenu){
    const setNav = open =>{
      navMenu.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    };
    navToggle.addEventListener('click', ()=>{
      setNav(!navMenu.classList.contains('open'));
    });
    navMenu.addEventListener('click', e=>{
      if(e.target.closest('a')) setNav(false);
    });
    document.addEventListener('click', e=>{
      if(!navMenu.classList.contains('open')) return;
      if(e.target.closest('#nav, #navToggle')) return;
      setNav(false);
    });
    document.addEventListener('keydown', e=>{
      if(e.key === 'Escape' && navMenu.classList.contains('open')){
        setNav(false);
        navToggle.focus();
      }
    });
    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 680) setNav(false);
    }, {passive:true});
  }

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
    const wrap = showcase.parentElement;
    const prev = wrap.querySelector('.sc-prev');
    const next = wrap.querySelector('.sc-next');
    if(prev && next){
      const upd = ()=>{
        prev.hidden = showcase.scrollLeft <= 4;
        next.hidden = showcase.scrollLeft + showcase.clientWidth >= showcase.scrollWidth - 4;
      };
      const step = ()=> Math.round(showcase.clientWidth * 0.8);
      next.addEventListener('click', ()=> showcase.scrollBy({left: step(), behavior:'smooth'}));
      prev.addEventListener('click', ()=> showcase.scrollBy({left: -step(), behavior:'smooth'}));
      showcase.addEventListener('scroll', upd, {passive:true});
      window.addEventListener('resize', upd, {passive:true});
      upd();
    }

    const screenshotCount = 5;
    for(let i = 1; i <= screenshotCount; i++){
      const card = document.createElement('div');
      card.className = 'screenshot';
      const img = document.createElement('img');
      img.alt = `App screenshot ${i}`;
      img.width = 350;
      img.height = 759;
      img.draggable = false;
      img.decoding = 'async';
      img.addEventListener('load', ()=>{ card.classList.add('loaded'); showcase.dispatchEvent(new Event('scroll')); });
      img.addEventListener('error', ()=>{ card.remove(); showcase.dispatchEvent(new Event('scroll')); });
      img.src = `assets/showcase/${i}.webp`;
      card.appendChild(img);
      showcase.appendChild(card);
    }
    showcase.dispatchEvent(new Event('scroll'));

    document.addEventListener('dragstart', e=>{ if(e.target.tagName === 'IMG') e.preventDefault(); });

    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    const lbCount = document.getElementById('lbCount');
    const lbClose = document.getElementById('lbClose');
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');
    if(lightbox && lbImg){
      const imgs = ()=> [...showcase.querySelectorAll('.screenshot img')];
      let idx = 0;
      let lastFocus = null;
      const show = ()=>{
        const list = imgs();
        if(!list.length){ close(); return; }
        idx = (idx + list.length) % list.length;
        lbImg.src = list[idx].src;
        lbImg.alt = list[idx].alt;
        lbCount.textContent = (idx + 1) + ' / ' + list.length;
        lbPrev.hidden = lbNext.hidden = list.length < 2;
      };
      function close(){
        lightbox.hidden = true;
        document.body.style.overflow = '';
        if(lastFocus){ lastFocus.focus(); lastFocus = null; }
      }
      const open = (i)=>{
        idx = i;
        lastFocus = document.activeElement;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        show();
        lbClose.focus();
      };
      showcase.addEventListener('click', e=>{
        const card = e.target.closest('.screenshot');
        if(!card) return;
        const cards = [...showcase.querySelectorAll('.screenshot')];
        open(cards.indexOf(card));
      });
      lbClose.addEventListener('click', close);
      lbPrev.addEventListener('click', ()=>{ idx--; show(); });
      lbNext.addEventListener('click', ()=>{ idx++; show(); });
      lightbox.addEventListener('click', e=>{ if(e.target === lightbox) close(); });
      document.addEventListener('keydown', e=>{
        if(lightbox.hidden) return;
        if(e.key === 'Escape') close();
        else if(e.key === 'ArrowLeft'){ idx--; show(); }
        else if(e.key === 'ArrowRight'){ idx++; show(); }
      });
    }
  }

  const aboutDesc = document.getElementById('aboutDesc');
  const readMore = document.getElementById('readMore');
  if(aboutDesc && readMore){
    const fit = ()=>{
      if(!aboutDesc.offsetHeight) return;
      if(aboutDesc.classList.contains('collapsed')){
        readMore.hidden = aboutDesc.scrollHeight <= aboutDesc.clientHeight + 4;
      }else{
        readMore.hidden = false;
      }
    };
    readMore.addEventListener('click', ()=>{
      const collapsed = aboutDesc.classList.toggle('collapsed');
      readMore.textContent = collapsed ? 'Read more' : 'Show less';
      readMore.setAttribute('aria-expanded', String(!collapsed));
      fit();
    });
    window.addEventListener('resize', fit, {passive:true});
    window.addEventListener('hashchange', ()=> setTimeout(fit, 0));
    fit();
  }
