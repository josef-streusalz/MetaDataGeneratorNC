document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("keyvalue-fields"),t=document.getElementById("output"),n=document.getElementById("folder-browser-modal"),r=document.getElementById("folder-container"),o=document.getElementById("current-folder-path"),a=document.getElementById("save-to-nextcloud"),l=document.getElementById("close-modal"),d=document.getElementById("browse-folder"),i=document.getElementById("save"),c=document.getElementById("back-button"),s=document.getElementById("file-content");document.getElementById("file-viewer");let m="/",p=null,f=[];async function u(e="/"){try{r.innerHTML="<p>Loading...</p>",e.startsWith("/admin/files/")&&(e=e.substring(13));const t=await fetch(`/index.php/apps/metadatagenerator/api/folder-structure?path=${encodeURIComponent(e)}`),n=t.headers.get("content-type");if(!n||!n.includes("application/json")){const e=await t.text();throw console.error("Server returned non-JSON response:",e),new Error("Invalid response from server: Expected JSON")}const a=await t.json();if(a.error)throw new Error(a.error);r.innerHTML="",a.folders&&a.folders.length>0?a.folders.forEach((t=>{const n=document.createElement("div");n.className="folder-item",n.textContent=t.name,n.dataset.path=t.path,n.addEventListener("click",(()=>{m=t.path,f.push(e),o.textContent=`Current Folder: ${m}`,u(t.path)})),r.appendChild(n)})):r.innerHTML="<p>No folders available.</p>",a.files&&a.files.length>0?a.files.forEach((e=>{const t=document.createElement("div");t.className="file-item",t.textContent=e.name,t.dataset.path=e.path,t.addEventListener("click",(()=>{p=e.path,async function(e){try{const t=await fetch(`/index.php/apps/metadatagenerator/api/file-content?path=${encodeURIComponent(e)}`),n=t.headers.get("content-type");if(!n||!n.includes("application/json")){const e=await t.text();throw console.error("Server returned non-JSON response:",e),new Error("Invalid response from server: Expected JSON")}const r=await t.json();if(r.error)throw new Error(r.error);s.innerHTML=`<h3>File Content:</h3><pre>${r.content}</pre>`}catch(e){console.error("Error displaying file content:",e),s.innerHTML=`<p>Error: ${e.message}</p>`}}(e.path)})),r.appendChild(t)})):r.innerHTML+="<p>No files available in this folder.</p>"}catch(e){console.error("Error loading folders:",e),r.innerHTML=`<p>Error: ${e.message}</p>`}}function h(){n.style.display="none"}c.addEventListener("click",(()=>{if(f.length>0){let e=f.pop();e.startsWith("/admin/files/")||(e="/admin/files/"+e),u(e),m=e,o.textContent=`Current Folder: ${m}`}else alert("You are already at the root folder.")})),document.getElementById("add-field").addEventListener("click",(function(){const t=document.createElement("div");t.className="field";const n=document.createElement("input");n.placeholder="Key",n.className="key";const r=document.createElement("input");r.placeholder="Value",r.className="value",t.appendChild(n),t.appendChild(r),e.appendChild(t)})),document.getElementById("generate").addEventListener("click",(function(){const e=document.querySelectorAll(".field");let n='<?xml version="1.0" encoding="UTF-8"?>\n<resource>';e.forEach((e=>{const t=e.querySelector(".key").value.trim(),r=e.querySelector(".value").value.trim();t&&r&&(n+=`\n\t<${t}>${r}</${t}>`)})),n+="\n</resource>",t.textContent=n})),i.addEventListener("click",(function(){const e=t.textContent;if(!e.trim())return void alert("No XML content to save.");const n=new Blob([e],{type:"application/xml"}),r=document.createElement("a");r.href=URL.createObjectURL(n),r.download="metadata.xml",r.click()})),d.addEventListener("click",(function(){n.style.display="block",u("/")})),l.addEventListener("click",h),a.addEventListener("click",(async function(){const e=t.textContent;if(!e.trim())return void alert("No XML content to save.");if(!m)return void alert("No folder selected.");let n=prompt("Enter a file name:","metadata.xml");if(n){n.endsWith(".xml")||(n+=".xml");try{let t=m.replace(/^\/admin\/files\//,"");if(!t)return void alert("No folder selected.");const r=await fetch("/index.php/apps/metadatagenerator/api/save",{method:"POST",headers:{"Content-Type":"application/json","OCS-APIREQUEST":"true"},body:JSON.stringify({folder:t,fileName:n,content:e})}),o=await r.json();o.message?(alert(o.message),h()):alert(o.error||"Error saving file.")}catch(e){console.error("Error saving file:",e),alert("Error saving file.")}}}))}));
//# sourceMappingURL=metadatagenerator-main.js.map