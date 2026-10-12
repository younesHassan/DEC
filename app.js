(function(){
  'use strict';
  const M=StudyMath, chapters=BOOK, $=id=>document.getElementById(id);
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arrow='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-5-5 5 5-5 5"/></svg>';
  const bookIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1zm0 0v15"/></svg>';
  const storageKey='palermo-encryption-book-v1';
  let storageWorks=true, saved={completed:[],last:'purpose'};
  try{const raw=JSON.parse(localStorage.getItem(storageKey)||'null');if(raw&&Array.isArray(raw.completed)){saved.completed=[...new Set(raw.completed.filter(id=>chapters.some(c=>c.id===id)))];if(chapters.some(c=>c.id===raw.last))saved.last=raw.last;}}catch{storageWorks=false;}
  let state={view:'read',id:saved.last,lab:'mod'}, stepCount=1, chapterFilter='',hOriginal=M.hammingEncode('1011'),hReceived=hOriginal;
  const labs={
    mod:{name:'Remainders',title:'Watch a number wrap',intro:'Remove complete turns and see exactly what remains. Negative inputs work too.',fields:[['a','Integer a','29'],['n','Modulus n','6']]},
    inverse:{name:'Modular inverses',title:'Find the undo value',intro:'Use Euclid’s steps to test whether an inverse exists. Then verify the result.',fields:[['a','Value a','3'],['n','Modulus n','13']]},
    power:{name:'Fast powers',title:'Square, reduce, repeat',intro:'Compute a modular power without building an enormous integer.',fields:[['a','Base a','3'],['e','Exponent e','13'],['n','Modulus n','7']]},
    caesar:{name:'Caesar cipher',title:'A tiny alphabet experiment',intro:'Use A = 0 through Z = 25. Spaces and punctuation stay in place. This historical cipher is for learning.',fields:[['text','Your message','CAT'],['k','Shift k','3']]},
    xor:{name:'XOR & the pad',title:'Compare bits one by one',intro:'Equal bits give 0; different bits give 1. Try encrypting the result with the same key again.',fields:[['a','Message bits','1010'],['b','Key bits','0110']]},
    rsa:{name:'Tiny RSA',title:'Encrypt, then recover',intro:'A fixed classroom key: p = 3, q = 11, n = 33, e = 3, d = 7. Explore every permitted message, including 0.',fields:[['m','Message m (0–32)','4']]},
    distance:{name:'Hamming distance',title:'Count the disagreements',intro:'Compare two equal-length binary words. Each mismatched position contributes one.',fields:[['a','First word','11001'],['b','Second word','10011']]},
    hamming:{name:'Repair a bit',title:'Give a mistake an address',intro:'Encode four data bits, click a codeword bit to flip it, and watch the parity checks locate a single error.',fields:[['data','Four message bits','1011']]}
  };
  function persist(){try{localStorage.setItem(storageKey,JSON.stringify(saved));}catch{storageWorks=false;}}
  function toast(message){$('toast').textContent=message;$('toast').hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').hidden=true,3500);}
  function completed(id){return saved.completed.includes(id);}
  function closeMenu(){ $('sidebar').classList.remove('open');$('sidebar').inert=window.matchMedia('(max-width:820px)').matches;$('backdrop').hidden=true;$('menu-toggle').setAttribute('aria-expanded','false');$('menu-toggle').setAttribute('aria-label','Open chapter navigation'); }
  function parseRoute(){
    const [view,detail]=location.hash.slice(1).split('/');
    state.view=['read','lab','symbols','map'].includes(view)?view:'read';
    if(state.view==='read'){state.id=chapters.some(c=>c.id===detail)?detail:saved.last;saved.last=state.id;persist();}
    if(state.view==='lab')state.lab=labs[detail]?detail:'mod';
    stepCount=1;closeMenu();render();
  }
  function renderSidebar(){
    let output='',lastPart='';
    chapters.forEach((c,i)=>{if(![c.title,c.goal,c.part,c.id,...c.sections.map(s=>s[0])].join(' ').toLowerCase().includes(chapterFilter.toLowerCase()))return;
      if(c.part!==lastPart){output+='<h3 class="part-title">'+escape(c.part)+'</h3>';lastPart=c.part;}
      const active=state.view==='read'&&state.id===c.id;
      output+='<a href="#read/'+c.id+'" class="chapter-link'+(active?' active':'')+'"'+(active?' aria-current="page"':'')+'><span class="chapter-num">'+String(i+1).padStart(2,'0')+'</span><span>'+escape(c.title)+'</span>'+(completed(c.id)?'<span class="done" aria-label="Check passed">✓</span>':'')+'</a>';
    });
    $('chapters').innerHTML=output||'<p class="empty-search">No matching chapters. Try “RSA” or “field”.</p>';
    $('progress-label').textContent=saved.completed.length+' / '+chapters.length;$('book-progress').value=saved.completed.length;$('book-progress').max=chapters.length;
    $('progress-note').textContent=storageWorks?'Progress saved in this browser.':'Progress is temporary; browser storage unavailable.';
  }
  function breadcrumb(end){return '<div class="breadcrumb"><span>DATA ENCRYPTION & CODES</span><span>/</span><span>'+escape(end)+'</span></div>';}
  function welcome(){return '<section class="welcome" aria-label="Welcome to your study book"><div><div class="eyebrow">A PRIVATE COURSE COMPANION · PALERMO</div><h1>Make sense of<br>secrets & signals.</h1><p>Start with the basics. Read a little, work through an example, then try it yourself. You don’t need to know the maths yet.</p><span class="pill">26 short chapters</span><span class="pill">Learn at your pace</span></div><div class="book-art" aria-hidden="true"><div><div class="book-lines">≡</div><div class="book-title">Encryption<br>& Codes</div><small>A BEGINNER’S STUDY BOOK</small></div></div></section>';}
  function renderRead(){
    const c=chapters.find(c=>c.id===state.id),i=chapters.indexOf(c),done=completed(c.id);
    document.title=c.title+' | Data Encryption & Codes';
    const next=chapters[i+1];
    $('content').innerHTML=breadcrumb(c.part)+(i===0?welcome():'')+
      (!storageWorks?'<p class="storage-note">Your browser cannot save progress. Checks still work during this visit.</p>':'')+
      '<div class="lesson-heading"><div><div class="lesson-meta"><span class="eyebrow">CHAPTER '+String(i+1).padStart(2,'0')+'</span><span>·</span><span>About '+c.minutes+' min</span>'+(done?'<span class="pill">✓ Check passed</span>':'')+'</div><h2>'+escape(c.title)+'</h2><p>'+escape(c.subtitle)+'</p></div><span class="chapter-badge" aria-hidden="true">'+String(i+1).padStart(2,'0')+'</span></div>'+
      '<div class="goal"><b>By the end of this chapter</b>'+escape(c.goal)+'</div><div class="reading-grid"><article class="prose">'+
      c.sections.map((s,j)=>'<section id="section-'+j+'"><h3><span class="section-no">'+(j+1)+'</span>'+escape(s[0])+'</h3><p>'+s[1]+'</p></section>').join('')+
      '<section id="symbols"><div class="formula-box"><span class="formula-label">The idea in symbols</span><div class="formula">'+escape(c.formula)+'</div><dl class="legend">'+c.legend.map(s=>'<dt>'+escape(s[0])+'</dt><dd>'+escape(s[1])+'</dd>').join('')+'</dl></div></section>'+
      '<section id="worked-example" class="example-box"><div class="box-header">'+bookIcon+'Worked example</div><h3>'+escape(c.example.title)+'</h3><ol id="example-steps" class="steps"></ol><div class="step-actions"><button class="button secondary" id="next-step">Reveal the next step '+arrow+'</button><button class="text-button" id="all-steps">Show all steps</button><span id="step-count" class="step-count"></span></div></section>'+
      '<section id="chapter-check" class="check-box"><div class="box-header">YOUR TURN</div><h3>Pause. Try the idea.</h3><p>A small check before you continue. Use the hint whenever you need it.</p><form id="check-form"><div class="question" id="question-label">'+escape(c.check.prompt)+'</div>'+
      (c.check.options?'<div role="radiogroup" aria-labelledby="question-label">'+c.check.options.map((option,j)=>'<label class="option"><input type="radio" name="choice" value="'+j+'"><span>'+escape(option)+'</span></label>').join('')+'</div>':'<label class="answer-label" for="numeric-answer">Your answer</label><input class="numeric-answer" id="numeric-answer" name="answer" type="text" inputmode="numeric" autocomplete="off" placeholder="Type your answer" aria-describedby="question-label">')+
      '<div class="check-actions"><button type="submit" class="button">Check my answer '+arrow+'</button><button type="button" class="text-button" id="show-hint" aria-expanded="false">I’d like a hint</button></div><p id="check-hint" class="hint" hidden>'+escape(c.check.hint)+'</p><div id="check-feedback" role="status" class="feedback'+(done?' success':'')+'"'+(done?'':' hidden')+'>'+(done?'✓ You passed this check. '+escape(c.check.explanation):'')+'</div></form></section>'+
      '<div class="takeaway"><span>Keep this idea</span>'+escape(c.takeaway)+'</div><div class="continue-row"><span class="continue-note" id="continue-note">'+(done?(next?'Check passed. Ready for the next idea.':'You’ve reached the final chapter. Revisit any topic or keep practicing.'):'Pass the check to unlock Continue. You can always open chapters from the contents.')+'</span><button id="continue" class="button" '+(done?'':'disabled')+'>'+(next?'Continue to chapter '+String(i+2).padStart(2,'0'):'Return to the course map')+' '+arrow+'</button></div><p class="source-note">Course anchor: '+escape(c.source)+'. Explanations and small worked examples are written for this companion.'+(c.lab?' <a href="#lab/'+c.lab+'">Practice this in the lab →</a>':'')+'</p></article><aside class="margin-rail" aria-label="On this page"><h3>ON THIS PAGE</h3>'+c.sections.map((s,j)=>'<a href="#section-'+j+'" data-scroll="section-'+j+'">'+escape(s[0])+'</a>').join('')+'<a href="#symbols" data-scroll="symbols">Symbol legend</a><a href="#worked-example" data-scroll="worked-example">Worked example</a><a href="#chapter-check" data-scroll="chapter-check">Your check</a><div class="rail-note">Read the words first.<br>Then read the symbols.<br>Both tell the same story.</div></aside></div>';
    renderSteps();
  }
  function renderSteps(){
    const c=chapters.find(c=>c.id===state.id);if(!$('example-steps'))return;
    $('example-steps').innerHTML=c.example.steps.slice(0,stepCount).map((s,i)=>'<li class="step"><span class="step-index">'+(i+1)+'</span><span>'+escape(s)+'</span></li>').join('');
    $('step-count').textContent=stepCount+' of '+c.example.steps.length+' steps';$('next-step').disabled=stepCount>=c.example.steps.length;$('all-steps').hidden=stepCount>=c.example.steps.length;
  }
  function submitCheck(form){
    const c=chapters.find(c=>c.id===state.id),value=c.check.options?(form.querySelector('input[name="choice"]:checked')?Number(form.querySelector('input[name="choice"]:checked').value):null):$('numeric-answer').value;
    const feedback=$('check-feedback');feedback.hidden=false;
    if(value===null||String(value).trim()===''){feedback.className='feedback';feedback.textContent='Choose an option or enter an answer first. Take your time.';return;}
    const passed=M.checkAnswer(c.check,value);feedback.className='feedback'+(passed?' success':'');
    feedback.textContent=passed?'✓ That’s right. '+c.check.explanation:'Try once more. '+c.check.hint;
    if(passed){const first=!completed(c.id);if(first)saved.completed.push(c.id);persist();renderSidebar();$('continue').disabled=false;$('continue-note').textContent='Check passed. Ready for the next idea.';if(first)toast('Chapter '+(chapters.indexOf(c)+1)+' complete. A little clearer.');}
  }
  function renderLab(){
    const lab=labs[state.lab];document.title='Practice lab | Data Encryption & Codes';
    $('content').innerHTML=breadcrumb('Practice lab')+'<div class="eyebrow">MAKE THE MATHS VISIBLE</div><h1 class="page-title">A place to try things.</h1><p class="page-intro">Change a number. Flip a bit. See what happens. These small experiments turn the book’s ideas into something you can test.</p><div class="lab-layout"><nav class="lab-menu" aria-label="Choose a practice tool">'+Object.entries(labs).map(([key,l])=>'<button data-lab="'+key+'" class="'+(key===state.lab?'active':'')+'"'+(key===state.lab?' aria-current="page"':'')+'>'+escape(l.name)+'</button>').join('')+'</nav><section class="lab-card"><h2>'+escape(lab.title)+'</h2><p>'+escape(lab.intro)+'</p><form id="lab-form"><div class="lab-fields">'+lab.fields.map(([key,label,value])=>'<label for="lab-'+key+'">'+escape(label)+'<input id="lab-'+key+'" name="'+key+'" value="'+escape(value)+'" autocomplete="off" '+(key==='text'?'maxlength="200"':key==='data'?'maxlength="4"':state.lab==='xor'||state.lab==='distance'?'maxlength="64"':'maxlength="16"')+' inputmode="'+(key==='text'?'text':'numeric')+'"></label>').join('')+'</div><button type="submit" class="button">'+(state.lab==='hamming'?'Encode the message':'Calculate & explain')+' '+arrow+'</button></form>'+(state.lab==='hamming'?'<div id="hamming-demo"></div>':'')+'<div id="lab-result" class="lab-result" role="status"></div><p class="source-note">Small teaching examples. Use these tools to understand the arithmetic, not to protect real messages.</p></section></div>';
    if(state.lab==='hamming')renderHamming();else runLab($('lab-form'));
  }
  function values(form){return Object.fromEntries(Array.from(form.querySelectorAll('input')).map(input=>[input.name,input.value]));}
  function runLab(form){
    const v=values(form),r=$('lab-result');let result='',steps=[];r.className='lab-result';
    try{
      if(state.lab==='mod'){const a=M.integer(v.a,-1000000,1000000,'Integer a'),n=M.integer(v.n,2,100000,'Modulus');result=a+' mod '+n+' = '+M.mod(a,n);steps=[a+' = '+Math.floor(a/n)+' × '+n+' + '+M.mod(a,n),'The remainder lies from 0 to '+(n-1)+'.'];}
      if(state.lab==='inverse'){const a=M.integer(v.a,-100000,100000,'Value a'),n=M.integer(v.n,2,100000,'Modulus'),answer=M.inverse(a,n);result=answer.value===null?'No inverse exists':a+'⁻¹ mod '+n+' = '+answer.value;steps=answer.steps.concat(answer.value===null?['gcd('+a+','+n+') = '+answer.gcd+', not 1. Multiplication by this value cannot be undone.']:['gcd('+a+','+n+') = 1. Extended Euclid gives the inverse '+answer.value+'.','Check: '+a+' × '+answer.value+' mod '+n+' = '+M.mod(a*answer.value,n)+'.']);}
      if(state.lab==='power'){const a=M.integer(v.a,-1000000,1000000,'Base'),e=M.integer(v.e,0,1000000,'Exponent'),n=M.integer(v.n,2,100000,'Modulus'),answer=M.power(a,e,n);result=a+'^'+e+' mod '+n+' = '+answer.value;steps=answer.steps.length?answer.steps:['A zeroth power is 1; reduce it modulo '+n+'.'];}
      if(state.lab==='caesar'){if(v.text.length>200)throw Error('Use a message of at most 200 characters.');const k=M.integer(v.k,-1000,1000,'Shift'),encrypted=M.caesar(v.text,k);result=encrypted||'(empty message)';steps=['Shift each A–Z letter by '+M.mod(k,26)+' places, wrapping modulo 26.','Decrypt by subtracting the shift: '+M.caesar(encrypted,-k)+'.','Spaces and punctuation stay in place. Letters are converted to uppercase.'];}
      if(state.lab==='xor'){const answer=M.xor(v.a,v.b);result=answer;steps=v.a.split('').map((b,i)=>'Position '+(i+1)+': '+b+' ⊕ '+v.b[i]+' = '+answer[i]);steps.push('Decrypt with the same key: '+answer+' ⊕ '+v.b+' = '+M.xor(answer,v.b)+'.');}
      if(state.lab==='rsa'){const m=M.integer(v.m,0,32,'Message'),c=M.power(m,3,33).value,recovered=M.power(c,7,33).value;result='Ciphertext: '+c;steps=['Public key: (33,3). Encrypt '+m+'³ mod 33 = '+c+'.','Private exponent: d = 7. Decrypt '+c+'⁷ mod 33 = '+recovered+'.','Recovered message '+recovered+' matches input '+m+'.'];}
      if(state.lab==='distance'){const d=M.distance(v.a,v.b),positions=v.a.split('').map((b,i)=>b!==v.b[i]?i+1:null).filter(Boolean);result='Distance: '+d;steps=['Compare corresponding positions in the two words.',positions.length?'Different positions: '+positions.join(', ')+'.':'All positions match.','First word weight: '+v.a.split('').filter(b=>b==='1').length+'. Weight and distance count different things.'];}
      if(state.lab==='hamming'){hOriginal=M.hammingEncode(v.data);hReceived=hOriginal;renderHamming();return;}
      r.innerHTML='<div class="big-result">'+escape(result)+'</div><ol>'+steps.map(s=>'<li>'+escape(s)+'</li>').join('')+'</ol>';
    }catch(error){r.className='lab-result error';r.textContent=error.message;}
  }
  function renderHamming(){
    const s=M.syndrome(hReceived),changed=M.distance(hOriginal,hReceived);
    $('hamming-demo').innerHTML='<p class="lab-caption" style="margin-top:22px">Encoded word: <b>'+hOriginal+'</b>. Click a bit below to simulate a transmission mistake.</p><div class="bit-row">'+hReceived.split('').map((b,i)=>'<button class="bit-button'+(b!==hOriginal[i]?' flipped':'')+'" data-bit="'+i+'" aria-label="Flip position '+(i+1)+', current bit '+b+'">'+b+'<small>position '+(i+1)+'</small></button>').join('')+'</div><button class="button secondary" id="repair-bit" '+(changed===1?'':'disabled')+'>Repair the single error</button> <button class="text-button" id="reset-bits">Restore original bits</button>';
    $('lab-result').className='lab-result'+(changed>1?' error':'');
    $('lab-result').innerHTML='<div class="big-result">'+(s?'Syndrome address: '+s:'Syndrome: 0')+'</div>Check 1: '+(s&1)+' · Check 2: '+((s>>1)&1)+' · Check 4: '+((s>>2)&1)+'<br>'+ (changed>1?'You flipped '+changed+' bits. This exceeds the one-error guarantee; the syndrome can mislead, so repair is disabled in this simulation.':changed===1?'Exactly one flipped bit. Failed-check labels add to '+s+', identifying the position to repair.':'No bits are currently flipped. Try clicking one bit.')+'<br><small>Data is in positions 3, 5, 6, 7. Multiple errors can also produce zero syndrome.</small>';
  }
  function symbolRows(){return chapters.flatMap(c=>c.legend.map(([symbol,meaning])=>({symbol,meaning,title:c.title,id:c.id})));}
  function renderSymbols(){document.title='Symbol guide | Data Encryption & Codes';$('content').innerHTML=breadcrumb('Symbol guide')+'<div class="eyebrow">READ THE SYMBOLS IN PLAIN ENGLISH</div><h1 class="page-title">Every mark has a meaning.</h1><p class="page-intro">A letter can mean different things in different chapters. Find the symbol, its plain-English meaning, and the chapter where it belongs.</p><label for="symbol-search" class="answer-label">Search a symbol or meaning</label><input id="symbol-search" class="search-wide" type="search" placeholder="Try “inverse”, “dimension”, or “⊕”…"><table class="symbols-table"><thead><tr><th scope="col">Symbol</th><th scope="col">Plain-English meaning</th><th scope="col">In the book</th></tr></thead><tbody id="symbol-rows"></tbody></table>';renderSymbolRows('');}
  function renderSymbolRows(query){const rows=symbolRows().filter(r=>(r.symbol+' '+r.meaning+' '+r.title).toLowerCase().includes(query.toLowerCase()));$('symbol-rows').innerHTML=rows.map(r=>'<tr><td>'+escape(r.symbol)+'</td><td>'+escape(r.meaning)+'</td><td><a href="#read/'+r.id+'">'+escape(r.title)+'</a></td></tr>').join('')||'<tr><td colspan="3">No matches. Try another symbol or word.</td></tr>';}
  function renderMap(){
    document.title='Course map | Data Encryption & Codes';const parts=[...new Set(chapters.map(c=>c.part))];
    $('content').innerHTML=breadcrumb('Course map')+'<div class="eyebrow">FROM FIRST PRINCIPLES TO THE BIG PICTURE</div><h1 class="page-title">Your subject, as a book.</h1><p class="page-intro">Read in order when a concept is new. Jump back to any chapter when revising. Each short chapter has an explanation, symbol legend, worked example, and a practice check.</p><a class="button" href="#read/'+saved.last+'">Resume your reading '+arrow+'</a>'+parts.map(part=>'<section class="map-part"><h2>'+escape(part)+'</h2><div class="map-grid">'+chapters.filter(c=>c.part===part).map(c=>'<a class="map-card" href="#read/'+c.id+'"><span class="chapter-num">'+String(chapters.indexOf(c)+1).padStart(2,'0')+'</span><div><strong>'+escape(c.title)+'</strong><p>'+escape(c.goal)+'</p><small>'+c.minutes+' min · '+(completed(c.id)?'✓ Check passed':'Ready to read')+'</small></div></a>').join('')+'</div></section>').join('')+
      '<section class="sources-panel"><h2>About this companion</h2><p>Written for Yunis’s Data Encryption and Codes studies at the University of Palermo. This is an independent study companion, not an official university website.</p><ul><li><b>Course basis:</b> “AppuntiFilippone - English(1).pdf” (Coding Theory and Cryptography, 6 March 2018) and “Coding Theory-REV2 - English.pdf” (12 November 2019, based on Professor Giovanni Falcone’s lectures). Their topic order supplies the book’s main path; this is not a verified 2026 syllabus.</li><li><b>Added teaching support:</b> a maths foundation, original small examples, symbol translations, and interactive checks. Advanced curve, divisor, and named-code constructions receive introductory coverage; use your notes for their complete proofs and larger exercises.</li><li><b>Clarifications:</b> GF(pʳ) is not integers modulo pʳ when r &gt; 1; Kasiski distances suggest candidate lengths; zero syndrome does not prove an error-free transmission.</li><li><b>Further primary references:</b> <a href="https://cacr.uwaterloo.ca/hac/about/chap2.pdf" target="_blank" rel="noopener noreferrer">Handbook of Applied Cryptography, mathematical background</a>; <a href="https://www.rfc-editor.org/rfc/rfc8017" target="_blank" rel="noopener noreferrer">RFC 8017, RSA schemes</a>. These support the field and RSA context; the chapters use original explanations.</li><li><b>Your progress:</b> saved in this browser, with no cross-device sync. Clearing browser data removes it. The private site’s access is managed by Sites.</li></ul></section>';
  }
  function render(){renderSidebar();document.querySelectorAll('[data-nav]').forEach(a=>{const active=a.getAttribute('data-nav')===state.view;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});if(state.view==='read')renderRead();if(state.view==='lab')renderLab();if(state.view==='symbols')renderSymbols();if(state.view==='map')renderMap();}
  document.addEventListener('click',e=>{
    const t=e.target.closest('button, a');if(!t)return;
    if(t.hasAttribute('data-scroll')){e.preventDefault();$(t.getAttribute('data-scroll')).scrollIntoView({behavior:'smooth',block:'start'});return;}
    if(t.id==='menu-toggle'){const open=!$('sidebar').classList.contains('open');$('sidebar').classList.toggle('open',open);$('sidebar').inert=!open&&window.matchMedia('(max-width:820px)').matches;$('backdrop').hidden=!open;t.setAttribute('aria-expanded',String(open));t.setAttribute('aria-label',open?'Close chapter navigation':'Open chapter navigation');}
    if(t.id==='backdrop')closeMenu();
    if(t.id==='next-step'){stepCount++;renderSteps();}
    if(t.id==='all-steps'){stepCount=chapters.find(c=>c.id===state.id).example.steps.length;renderSteps();}
    if(t.id==='show-hint'){$('check-hint').hidden=!$('check-hint').hidden;t.setAttribute('aria-expanded',String(!$('check-hint').hidden));}
    if(t.id==='continue'&&!t.disabled){const i=chapters.findIndex(c=>c.id===state.id);location.hash=chapters[i+1]?'read/'+chapters[i+1].id:'map';}
    if(t.hasAttribute('data-lab'))location.hash='lab/'+t.getAttribute('data-lab');
    if(t.hasAttribute('data-bit')){const i=+t.getAttribute('data-bit');hReceived=hReceived.split('').map((b,j)=>i===j?(b==='0'?'1':'0'):b).join('');renderHamming();}
    if(t.id==='repair-bit'&&!t.disabled){hReceived=M.correct(hReceived).word;renderHamming();toast('Bit repaired. Original data recovered.');}
    if(t.id==='reset-bits'){hReceived=hOriginal;renderHamming();}
  });
  document.addEventListener('submit',e=>{if(e.target.id==='check-form'){e.preventDefault();submitCheck(e.target);}if(e.target.id==='lab-form'){e.preventDefault();runLab(e.target);}});
  document.addEventListener('input',e=>{if(e.target.id==='chapter-search'){chapterFilter=e.target.value;renderSidebar();}if(e.target.id==='symbol-search')renderSymbolRows(e.target.value);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();$('menu-toggle').focus();}});
  window.addEventListener('hashchange',()=>{parseRoute();window.scrollTo({top:0,behavior:'instant'});$('content').focus({preventScroll:true});});
  window.addEventListener('resize',()=>{if(!window.matchMedia('(max-width:820px)').matches)closeMenu();else $('sidebar').inert=!$('sidebar').classList.contains('open');});
  parseRoute();
  // Controller hooks support non-browser integration checks without changing the UI.
  globalThis.StudyApp={state,saved,parseRoute,render,renderSteps,submitCheck,runLab,renderHamming,renderSymbolRows,symbolRows};
})();
