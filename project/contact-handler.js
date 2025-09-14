
// Contact handler injected by assistant
(function(){
  const BACKEND_URL = '/api/contact'; // change if backend hosted elsewhere
  function serializeForm(form){
    const fd = new FormData(form);
    const obj = {};
    fd.forEach((v,k)=> obj[k]=v);
    return obj;
  }
  async function sendPayload(payload){
    try{
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      return json;
    }catch(e){
      return {ok:false, error: e.message || String(e)};
    }
  }
  function findInputsWithin(node){
    const inputs = node.querySelectorAll('input[name], textarea[name], select[name]');
    const obj = {};
    inputs.forEach(i=> obj[i.name]=i.value);
    return obj;
  }
  function attachToForm(form){
    if(!form || form.__assistant_attached) return;
    form.__assistant_attached = true;
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      const payload = serializeForm(form);
      // Basic validation for required fields present
      if(!payload.name || !payload.email || !payload.message){
        alert('Please fill name, email and message.');
        return;
      }
      const resp = await sendPayload(payload);
      if(resp && resp.ok){
        alert('Message sent successfully. Thank you!');
        form.reset();
      } else {
        alert('Error sending message: ' + (resp && (resp.error || resp.message) || 'Unknown error'));
      }
    });
  }
  function attachToButton(btn){
    if(!btn || btn.__assistant_btn) return;
    btn.__assistant_btn = true;
    btn.addEventListener('click', async function(e){
      // Try to prevent default navigation if inside a form/button type=submit
      try{ if(e.target && e.target.tagName==='A') e.preventDefault(); }catch(e){}
      // find nearest form
      let node = btn;
      let form = null;
      for(let i=0;i<5;i++){
        if(!node) break;
        if(node.tagName==='FORM'){ form = node; break; }
        node = node.parentElement;
      }
      let payload = null;
      if(form){
        payload = serializeForm(form);
      } else {
        // try to find inputs in the document or nearby container
        const container = btn.closest && btn.closest('section,div,main') || document;
        payload = findInputsWithin(container);
      }
      if(!payload) payload = {};
      // Basic required field check - try to map common placeholders to fields
      if(!payload.name){
        const nameField = document.querySelector('input[name=name], input[placeholder*="Name"], input[id*="name"]');
        if(nameField) payload.name = nameField.value;
      }
      if(!payload.email){
        const emailField = document.querySelector('input[name=email], input[type="email"], input[placeholder*="Email"], input[id*="email"]');
        if(emailField) payload.email = emailField.value;
      }
      if(!payload.message){
        const msgField = document.querySelector('textarea[name=message], textarea[placeholder*="Message"], textarea[id*="message"]');
        if(msgField) payload.message = msgField.value;
      }
      if(!payload.name || !payload.email || !payload.message){
        alert('Please fill Name, Email and Message fields before sending.');
        return;
      }
      const resp = await sendPayload(payload);
      if(resp && resp.ok){
        alert('Message sent successfully. Thank you!');
        // if form exists reset
        if(form) form.reset();
      } else {
        alert('Error sending message: ' + (resp && (resp.error || resp.message) || 'Unknown error'));
      }
    });
  }

  function init(){
    // attach to existing forms
    const forms = document.querySelectorAll('form');
    forms.forEach(attachToForm);

    // attach to buttons that look like send buttons
    const buttons = Array.from(document.querySelectorAll('button, input[type=button], a'));
    buttons.forEach(btn=>{
      const text = (btn.innerText || btn.value || btn.getAttribute('aria-label') || '').toLowerCase();
      const cls = (btn.className || '').toLowerCase();
      if(/send|submit|message|contact/.test(text) || /send|submit|contact|message/.test(cls) || btn.id && /send|submit/.test(btn.id.toLowerCase())){
        attachToButton(btn);
      }
    });

    // observe DOM for dynamically added forms/buttons
    const obs = new MutationObserver(muts=>{
      muts.forEach(m=>{
        m.addedNodes.forEach(node=>{
          if(node.nodeType!==1) return;
          if(node.tagName==='FORM') attachToForm(node);
          const btns = node.querySelectorAll && node.querySelectorAll('button, input[type=button], a') || [];
          btns.forEach(b=>{
            const text = (b.innerText || b.value || '').toLowerCase();
            const cls = (b.className || '').toLowerCase();
            if(/send|submit|message|contact/.test(text) || /send|submit|contact|message/.test(cls) || b.id && /send|submit/.test(b.id.toLowerCase())){
              attachToButton(b);
            }
          });
        });
      });
    });
    obs.observe(document.body || document.documentElement, {childList:true, subtree:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();