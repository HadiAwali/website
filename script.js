  const routes = ['home','about','contact','project-codesnap','project-discordbot','project-notebank','project-kemakzi'];

  function render(){
    let hash = location.hash.replace('#','') || 'home';
    if(!routes.includes(hash)) hash = 'home';
    routes.forEach(r=>{
      const el = document.getElementById(r);
      if(el) el.classList.toggle('active', r === hash);
    });
    document.querySelectorAll('#nav a').forEach(a=>{
      a.classList.toggle('active', a.dataset.r === hash);
    });
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange', render);
  render();

  // tabs within project pages
  document.querySelectorAll('.project-page').forEach(page=>{
    page.querySelectorAll('.tab').forEach(tab=>{
      tab.addEventListener('click', ()=>{
        page.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
        page.querySelectorAll('.tabpane').forEach(p=>p.classList.remove('active'));
        tab.classList.add('active');
        page.querySelector('[data-pane="'+tab.dataset.tab+'"]').classList.add('active');
      });
    });
  });

  // contact form -> mailto
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('cName').value;
    const email = document.getElementById('cEmail').value;
    const msg = document.getElementById('cMsg').value;
    const body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = 'mailto:developer.hadiawali@gmail.com?subject=Portfolio%20contact&body=' + body;
  });
