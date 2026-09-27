  const routes = ['home','about','contact','app-codesnap','app-codesnap-privacy','app-codesnap-terms','privacy'];

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
      window.location.href = 'mailto:developer.hadiawali@gmail.com?subject=Portfolio%20contact&body=' + body;
    });
  }
