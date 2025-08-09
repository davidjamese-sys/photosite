(function(){
  const thumbs = Array.from(document.querySelectorAll('.thumb'));
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const closeBtn = document.querySelector('.lb-close');
  const prevBtn = document.querySelector('.lb-prev');
  const nextBtn = document.querySelector('.lb-next');
  let current = 0;

  function open(index){
    const t = thumbs[index];
    if(!t) return;
    const full = t.dataset.full || t.querySelector('img').src;
    const caption = t.dataset.caption || t.querySelector('img').alt || '';
    lbImg.src = full;
    lbImg.alt = t.querySelector('img').alt || '';
    lbCaption.textContent = caption;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
    current = index;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }
  function prev(){ open((current - 1 + thumbs.length) % thumbs.length); }
  function next(){ open((current + 1) % thumbs.length); }

  thumbs.forEach((t,i)=>{
    t.addEventListener('click', e=>{
      e.preventDefault();
      open(i);
    });
  });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  document.addEventListener('keydown', e=>{
    if(lb.classList.contains('open')){
      if(e.key === 'Escape') close();
      if(e.key === 'ArrowLeft') prev();
      if(e.key === 'ArrowRight') next();
    }
  });
  lb.addEventListener('click', e=>{
    if(e.target === lb) close();
  });
})();