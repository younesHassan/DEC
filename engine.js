/* Pure, bounded classroom calculations. Shared by the UI and validation. */
(function(root){
  'use strict';
  const mod=(a,n)=>((a%n)+n)%n;
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a;}
  function integer(value,min,max,label='Value'){
    if(typeof value==='string' && !/^[+-]?\d+$/.test(value.trim()))throw Error(label+' must be a whole number.');
    const n=Number(value);if(!Number.isSafeInteger(n)||n<min||n>max)throw Error(label+' must be a whole number from '+min+' to '+max+'.');return n;
  }
  function inverse(a,n){
    let t=0,nt=1,r=n,nr=mod(a,n);const steps=[];
    while(nr){const q=Math.floor(r/nr);steps.push(r+' = '+q+' × '+nr+' + '+(r-q*nr));[t,nt]=[nt,t-q*nt];[r,nr]=[nr,r-q*nr];}
    return {value:r===1?mod(t,n):null,gcd:r,steps};
  }
  function power(a,e,n){
    let base=BigInt(mod(a,n)),exp=BigInt(e),m=BigInt(n),value=1n%m;const steps=[];
    while(exp>0n){if(exp%2n){value=value*base%m;steps.push('Use this power: result = '+value+'.');}exp/=2n;if(exp){base=base*base%m;steps.push('Square and reduce the next power: '+base+'.');}}
    return {value:Number(value),steps};
  }
  function caesar(text,k){return text.toUpperCase().replace(/[A-Z]/g,c=>String.fromCharCode(65+mod(c.charCodeAt(0)-65+k,26)));}
  function bits(s,label){if(!/^[01]{1,64}$/.test(s))throw Error(label+' must contain 1–64 bits, using only 0 and 1.');return s;}
  function xor(a,b){bits(a,'First string');bits(b,'Second string');if(a.length!==b.length)throw Error('The two bit strings must have equal lengths.');return a.split('').map((x,i)=>x===b[i]?'0':'1').join('');}
  function distance(a,b){bits(a,'First word');bits(b,'Second word');if(a.length!==b.length)throw Error('The two words must have equal lengths.');return a.split('').filter((x,i)=>x!==b[i]).length;}
  function hammingEncode(data){if(!/^[01]{4}$/.test(data))throw Error('Enter exactly four message bits.');const b=[0,0,+data[0],0,+data[1],+data[2],+data[3]];b[0]=b[2]^b[4]^b[6];b[1]=b[2]^b[5]^b[6];b[3]=b[4]^b[5]^b[6];return b.join('');}
  function syndrome(word){if(!/^[01]{7}$/.test(word))throw Error('A Hamming word has seven bits.');let s=0;for(let i=0;i<7;i++){if(word[i]==='1')s^=(i+1);}return s;}
  function correct(word){const s=syndrome(word);return {position:s,word:word.split('').map((b,i)=>i===s-1?(b==='0'?'1':'0'):b).join('')};}
  function checkAnswer(check,value){if(check.options)return Number.isInteger(value)&&value===check.answer;const actual=String(value??'').trim();if(/^0[01]+$/.test(check.answer))return actual===check.answer;if(/^-?\d+$/.test(check.answer))return actual!==''&&/^[+-]?\d+(?:\.0+)?$/.test(actual)&&Number(actual)===Number(check.answer);return actual.toLowerCase()===check.answer.toLowerCase();}
  const api={mod,gcd,integer,inverse,power,caesar,xor,distance,hammingEncode,syndrome,correct,checkAnswer};root.StudyMath=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
