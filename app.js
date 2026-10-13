const projects = window.portfolioProjects || [];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function artwork(project) {
  if (project.image) return `<img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)}" loading="lazy">`;
  const paths = Array.from({length:15},(_,i)=>`<path d="M-20 ${30+i*15} C100 ${30+i*15} 145 ${i<8?i*9:170+i*7} 225 ${i<8?i*10:160+i*7} S360 ${30+i*15} 440 ${30+i*15}"/>`).join('');
  let shape = `<g fill="none" stroke="#639584" stroke-width="1">${paths}</g><path d="M115 143 C135 95 220 105 335 150 C240 155 148 175 115 143Z" fill="#d8dfd4" stroke="#536c5b"/>`;
  if(project.category==='cad') shape='<g transform="translate(200 135)" stroke="#7b8172" stroke-width="1.4"><path d="M-135 20L-35-35 125 20 22 82Z" fill="#bbc1af"/><path d="M-135 20V45L22 106V82Z" fill="#929e8b"/><path d="M22 82L125 20V46L22 106Z" fill="#d5d7c9"/><path d="M-73-9V-48L-4-88 72-59V24L5 64-73 35Z" fill="#d6d7c8"/><path d="M-73-48L5-19 72-59M5-19V64" fill="none"/><ellipse cx="-33" cy="-4" rx="19" ry="29" transform="rotate(-20 -33 -4)" fill="#8c9987"/><ellipse cx="-28" cy="-5" rx="11" ry="21" transform="rotate(-20 -28 -5)" fill="#edece3"/><path d="M94-80V-28M67-65L121-44M-155 71L-82 99" fill="none" stroke-dasharray="4 4"/></g>';
  if(project.id==='duct') shape='<defs><linearGradient id="pipe"><stop stop-color="#476d9c"/><stop offset=".45" stop-color="#58acb5"/><stop offset=".7" stop-color="#d6c16e"/><stop offset="1" stop-color="#ad7154"/></linearGradient></defs><path d="M70 220V145Q70 80 140 80H240Q300 80 300 145V220" fill="none" stroke="#c4d1d1" stroke-width="59"/><path d="M70 220V145Q70 80 140 80H240Q300 80 300 145V220" fill="none" stroke="url(#pipe)" stroke-width="48"/><path d="M70 220V145Q70 80 140 80H240Q300 80 300 145V220" fill="none" stroke="#ffffffaa" stroke-width="1.5" stroke-dasharray="6 7"/><g fill="#486976" font-size="10" font-family="monospace"><text x="48" y="251">INLET</text><text x="278" y="251">OUTLET</text></g>';
  return `<svg viewBox="0 0 400 280" role="img" aria-label="工程概念示意图，非真实项目结果">${shape}</svg>`;
}
const grid=document.querySelector('#projects');
grid.innerHTML=projects.map(p=>`<article class="project-card" data-category="${escapeHTML(p.category)}"><button class="project-open" data-project="${escapeHTML(p.id)}" aria-label="查看${escapeHTML(p.title)}详情"><div class="project-art">${artwork(p)}${p.sample?'<span class="sample-badge">示例项目</span>':''}</div><div class="project-meta">${escapeHTML(p.subtitle)}</div><div class="project-title"><h3>${escapeHTML(p.title)}</h3><span aria-hidden="true">↗</span></div><p class="project-description">${escapeHTML(p.description)}</p></button><div class="tags">${p.tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div></article>`).join('');
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  let count=0;document.querySelectorAll('.project-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});
  document.querySelector('#filter-status').textContent=`显示 ${count} 个项目`;
}));
const dialog=document.querySelector('#project-dialog');let opener;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  const p=projects.find(p=>p.id===button.dataset.project);opener=button;
  document.querySelector('#dialog-content').innerHTML=`<p class="eyebrow">${escapeHTML(p.tool)} ${p.sample?' / 示例项目':''}</p><h2 id="dialog-title">${escapeHTML(p.title)}</h2><p>${escapeHTML(p.description)}</p><div class="dialog-art">${artwork(p)}</div>${p.sections.map(([title,body])=>`<h3>${escapeHTML(title)}</h3><p>${escapeHTML(body)}</p>`).join('')}`;
  dialog.showModal();
}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>opener?.focus());
document.querySelector('#year').textContent=new Date().getFullYear();
