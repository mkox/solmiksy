define("helpers/helpers",["jquery","underscore","backbone"],function(e,t,n){return{array_flip:function(e){for(key in e)e.hasOwnProperty(key),tmp_ar[e[key]]=key;return tmp_ar},createFrequencies:function(){var e="";for(var t=1;t<=111;t++){var n=Math.pow(2,(t-49)/12)*440;e+='"'+t+'":'+n.toFixed(2)+","}return e=e.slice(0,e.length-1),JSON.parse("{"+e+"}")},flipObject:function(t){var n={};return e.each(t,function(e,t){n[t]=e}),n},getPositionInScaleOfBasicTone:function(e){e<0&&(e+=12);var t=e%12;return t===0&&(t=12),t},getPositionInScaleOfToneNumber:function(e){var t=(e-3)%12;return t===0&&(t=12),t},scalesLimit:function(e){var t="";for(var n=e[0];n<=e[1];n++)t+='"'+n+'":'+'{"super":'+(e[1]-n)+',"sub":'+(n-e[0])+"},";return t=t.slice(0,t.length-1),JSON.parse("{"+t+"}")},setPositionStaffForSoundKey:function(e,t,n){console.log("helpers.js setPositionStaffForSoundKey");var r=t;for(var i=0;i<e[n].length;i++)e[n][i]<t&&(r-=1);return r},setScalesCurrent:function(t,n,r){return r.length>0&&e("#all-squares .squares-3x3").removeClass("scale-pos-"+r.join(" scale-pos-")),n>t[0]&&n<t[1]&&(r=[n+1,n,n-1]),console.log("setScalesCurrent, scalesCurrent after",r),e("#all-squares .squares-3x3").each(function(t){e(this).addClass("scale-pos-"+r[t])}),r}}}),define("helpers/createFrequencies",["jquery","underscore","backbone","helpers/helpers"],function(e,t,n,r){var i,s,o,u;return{getFrequenciesInfo:function(t,n,a,f,l,c){i=l,o=n,u=a,s=t;var h={};h={};var p=0,d=["major","minor"];for(var v=4;v<=111;v++){h[v]={};var m=Math.pow(2,(v-49)/12)*440;h[v].hertz=m.toFixed(2),h[v].scale=Math.ceil((v-3)/12);var g=r.getPositionInScaleOfToneNumber(v);h[v].scalePositionOf12=g,h[v].noteNameEnglish=c[g][0];var y=1,b=e.inArray(g,f.major);b>-1&&(y=0),h[v].whiteKey=y,p+=y,h[v].positionOf7=p,h[v].soundKey={};for(var w=0;w<d.length;w++){h[v].soundKey[d[w]]={};for(var E=1;E<=12;E++)if(s[d[w]][E]){var S=this.getSolmiToneOfSoundKeyFromFrequency(v,E,d[w],g);h[v].soundKey[d[w]][E]=S,h[v].soundKey[d[w]][E].name=s[d[w]][E].name}}}return console.log("getFrequenciesInfo frequencies: ",h),h},getSolmiToneOfSoundKeyFromFrequency:function(t,n,a,f){var l=t-(f-1),c=l+(n-1),h=r.getPositionInScaleOfBasicTone(t-c+1),p=e.inArray(h,i[a]),d={};d["TEST10-frequencyNr"]=t,d["TEST20-soundKeyNr"]=n,d["TEST30-scalePosition"]=f,d["TEST40-scaleBaseFrequencyNr"]=l,d["TEST50-soundKeyBaseFrequencyNr"]=c,d["TEST60-solmiToneNr-1"]=h,d["TEST70-solmiToneNr2"]=p,d.basicToneNrOf12orig=h;var v="";if(p===-1){var v=s[a][n].half;d["TEST80-half"]=v,v==="u"?h++:v==="i"?h--:v===""&&(h--,v="i"),d["TEST90-half"]=v}return a==="major"?(d.basicTone=o[h],d["TEST110-basicTone-major"]=o[h]):(d.basicTone=u[h],d["TEST120-basicTone-minor"]=u[h]),d.basicToneNrOf12=h,d.activeHalf=v,d}}}),define("solmiBasics",["jquery","underscore","backbone","helpers/helpers","helpers/createFrequencies"],function(e,t,n,r,i){console.log("solmiBasics.js 1, helpers",r);var s=new Array("d","r","m","f","s","l","t"),o={d:1,r:3,m:5,f:6,s:8,l:10,t:12},u=r.flipObject(o),a={l:1,t:3,d:4,r:6,m:8,f:9,s:11},f=r.flipObject(a),l={l:13,t:15,d:4,r:6,m:8,f:9,s:11},c={1:["C"],2:["C#","Db"],3:["D"],4:["D#","Es"],5:["E"],6:["F"],7:["F#","Gb"],8:["G"],9:["G#","Ab"],10:["A"],11:["A#","Bb"],12:"B"},h=[1,9],p=4,d=0+p,v=!1,m=[];m=r.setScalesCurrent(h,d,m),console.log("solmiBasics.js scalesCurrent",m);var g=r.scalesLimit(h),y={"signature-start-left":60,"start-left":120,"start-bottom":110,"height-diff":6.8,"notes-diff":4,"notes-left-current":0,"note-width":35,"inter-tone-signs-width":6,"continue":!0},b=[16,64],w={major:[2,4,7,9,11],minor:[2,5,7,10,12]},E={major:[1,3,5,6,8,10,12],minor:[1,3,4,6,8,9,11]},S={major:{C:{position:1,half:"",signs:0},Des:{position:2,half:"u",signs:5},D:{position:3,half:"i",signs:2},Es:{position:4,half:"u",signs:3},E:{position:5,half:"i",signs:4},F:{position:6,half:"u",signs:1},G:{position:8,half:"i",signs:1},As:{position:9,half:"u",signs:4},A:{position:10,half:"i",signs:3},B:{position:11,half:"u",signs:2},H:{position:12,half:"i",signs:5}},minor:{c:{position:1,half:"u",signs:3},cis:{position:2,half:"i",signs:4},d:{position:3,half:"u",signs:1},e:{position:5,half:"i",signs:1},f:{position:6,half:"u",signs:4},fis:{position:7,half:"i",signs:3},g:{position:8,half:"u",signs:2},gis:{position:9,half:"i",signs:5},a:{position:10,half:"",signs:0},b:{position:11,half:"u",signs:5},h:{position:12,half:"i",signs:2}}},x={major:{1:{name:"C",position:1,half:"",signs:0},2:{name:"Des",position:2,half:"u",signs:5},3:{name:"D",position:3,half:"i",signs:2},4:{name:"Es",position:4,half:"u",signs:3},5:{name:"E",position:5,half:"i",signs:4},6:{name:"F",position:6,half:"u",signs:1},7:{name:"Fis",position:7,half:"i",signs:6},8:{name:"G",position:8,half:"i",signs:1},9:{name:"As",position:9,half:"u",signs:4},10:{name:"A",position:10,half:"i",signs:3},11:{name:"B",position:11,half:"u",signs:2},12:{name:"H",position:12,half:"i",signs:5}},minor:{1:{name:"c",position:1,half:"u",signs:3},2:{name:"cis",position:2,half:"i",signs:4},3:{name:"d",position:3,half:"u",signs:1},4:{name:"es",position:4,half:"u",signs:6},5:{name:"e",position:5,half:"i",signs:1},6:{name:"f",position:6,half:"u",signs:4},7:{name:"fis",position:7,half:"i",signs:3},8:{name:"g",position:8,half:"u",signs:2},9:{name:"gis",position:9,half:"i",signs:5},10:{name:"a",position:10,half:"",signs:0},11:{name:"b",position:11,half:"u",signs:5},12:{name:"h",position:12,half:"i",signs:2}}};return{bPath:"/bundles/mkoxsolmik/",baseToneLength:500,basicTones:s,basicTonesMajor:o,basicTonesMajor2:u,basicTonesMinorRaw:a,basicTonesMinorRaw2:f,basicTonesMinor:l,basicTonesMajorStaff:{d:1,r:2,m:3,f:4,s:5,l:6,t:7},basicTonesMinorStaff:{l:8,t:9,d:3,r:4,m:5,f:6,s:7},tonePositions:{d:[3,1],r:[3,2],m:[3,3],f:[2,2],s:[2,3],l:[1,2],t:[1,3]},noIU:v,currentNumberOfPlaying:1,remainingNumberOfPlaying:1,scaleRange:h,centralViewScaleForStart:p,centralViewScale:d,scalesCurrent:m,scalesLimit:g,positionOfHalvesInScale:w,positionOfFullInScale:E,positionInSquare:{n:"center",u:"center bottom",i:"center top"},soundKeys:S,soundKeys2:x,startTimeOfPlay:0,currentTimeOfPlay:0,positonsSharp:new Array(0,-3,1,-2,-5),positonsFlat:new Array(0,3,-1,2,-2),soundKeyCurrent:{key:"C",position:1,position_staff:1,half:"",signs:0,mm:"major"},setSoundKeyCurrent:function(e){var t=e.split(""),n="";t[0]===t[0].toUpperCase()?n="major":n="minor",this.soundKeyCurrent=this.soundKeys[n][e],this.soundKeyCurrent.mm=n,this.soundKeyCurrent.key=e,this.soundKeyCurrent.position_staff=r.setPositionStaffForSoundKey(this.positionOfHalvesInScale,this.soundKeyCurrent.position,this.soundKeyCurrent.mm),console.log("sb setSoundKeyCurrent this.soundKeyCurrent:",this.soundKeyCurrent)},currentRandomMode:"withSoundKeysMajor",playData:{notes:{}},notesInStaffStart:y,noteLengths:{4:{imageNamePart:"1-1"},2:{imageNamePart:"1-2"},1:{imageNamePart:"1-4"},.5:{imageNamePart:"1-8"},.25:{imageNamePart:"1-16"},.125:{imageNamePart:"1-32"}},notesInStaff:e.extend(!0,{},y),staffRange:b,notesNrAndName:{16:"C",17:"Cis/Des",18:"D",19:"Dis/Es",20:"E",21:"F",22:"Fis/Ges",23:"G",24:"Gis/As",25:"A",26:"Ais/B",27:"H",28:"c",29:"cis/des",30:"d",31:"dis/es",32:"e",33:"f",34:"fis/ges",35:"g",36:"gis/as",37:"a",38:"ais/b",39:"h",40:"c<sup>1</sup>",41:"cis/des<sup>1</sup>",42:"d<sup>1</sup>",43:"dis/es<sup>1</sup>",44:"e<sup>1</sup>",45:"f<sup>1</sup>",46:"fis/ges<sup>1</sup>",47:"g<sup>1</sup>",48:"gis/as<sup>1</sup>",49:"a<sup>1</sup>",50:"ais/b<sup>1</sup>",51:"h<sup>1</sup>",52:"c<sup>2</sup>",53:"cis/des<sup>2</sup>",54:"d<sup>2</sup>",55:"dis/es<sup>2</sup>",56:"e<sup>2</sup>",57:"f<sup>2</sup>",58:"fis/ges<sup>2</sup>",59:"g<sup>2</sup>",60:"gis/as<sup>2</sup>",61:"a<sup>2</sup>",62:"ais/b<sup>2</sup>",63:"h<sup>2</sup>",64:"c<sup>3</sup>"},randomRange:new Array(28,52),rangeOfNumberOfNotesInStaff:new Array(1,25),numberOfNotesInStaffCurrent:4,maxDeviationFromFirstSound:0,instruments:new Array("piano","organ","acoustic","edm"),currentInstrument:"acoustic",toneFrequencies:r.createFrequencies(),frequencies:i.getFrequenciesInfo(x,u,f,w,E,c),messageNotValid:"Not a valid string in this context: ",messageToneOutOfRange:"This tone can't be shown here: ",messageToneLengthNotExist:"This tone length does not exist: ",messageMaxToneNotSmallerThanMin:"max tone can't be smaller than min tone!"}}),define("models/playSound",["jquery","underscore","backbone","solmiBasics","helpers/helpers","audiosynth"],function(e,t,n,r,i){return{playSound:function(e){var t=new Audio(r.playData.notes[e].audioURI);t.play()},prepareForPlaySound:function(e,t,n,i,s){console.log("prepareForPlaySound sb.soundKeyCurrent:",r.soundKeyCurrent);var o=r.basicTonesMajor[e[0]];r.soundKeyCurrent.mm==="minor"&&(o=r.basicTonesMinor[e[0]]),console.log("prepareForPlaySound sb.soundKeyCurrent",r.soundKeyCurrent),console.log("prepareForPlaySound basicToneNr",o);var u=3+(t-1)*12+r.soundKeyCurrent.position+(o-1);n!==""&&(n==="u"?u-=1:n==="i"&&(u+=1)),r.playData.notes[i]["frequency-nr"]=u,this.generateAndStoreSound(r.currentInstrument,u,i)},generateAndStoreSound:function(e,t,n){var i=r.playData.notes[n].length*r.baseToneLength/1e3;r.playData.notes[n].audioURI=Synth.generate(e,r.frequencies[t].noteNameEnglish,r.frequencies[t].scale,i)}}}),define("models/playStaff",["jquery","underscore","backbone","solmiBasics","helpers/helpers"],function(e,t,n,r,i){return{createKeySignature:function(){if(r.soundKeyCurrent.half!==""){var t=10,n=4,i=r.positonsSharp,s="Sharp.svg";r.soundKeyCurrent.half==="u"&&(t=6,n=8,i=r.positonsFlat,s="Flat.svg");var o=r.notesInStaffStart["start-bottom"]+t*r.notesInStaffStart["height-diff"],u=r.notesInStaffStart["start-bottom"]-n*r.notesInStaffStart["height-diff"],a=r.notesInStaffStart["signature-start-left"],f=new Array("violin","bass"),l=new Array(o,u);console.log("createKeySignature staffHeights:",l);for(var c=0;c<r.soundKeyCurrent.signs;c++){for(var h=0;h<f.length;h++){console.log("createKeySignature i - j:",c+" - "+h),e("div#staff").append('<img src="'+r.bPath+"images/"+s+'" class="sign '+f[h]+" starthalf starthalf-"+c+'" alt="'+r.soundKeyCurrent.half+'">');var p=l[h]+i[c]*r.notesInStaff["height-diff"];e("div#staff ."+f[h]+".starthalf-"+c).css({position:"absolute",bottom:p+"px",left:a+"px"})}a+=r.notesInStaff["inter-tone-signs-width"]}}},playStaff:function(t){var n=r.bPath+"images/",i=["Sharp","Flat","Natural"];if(t>0){var s=r.noteLengths[r.playData.notes[t-1].length].imageNamePart;e("div#staff .note-"+(t-1)).attr("src",r.bPath+"images/"+s+"_note.svg");var o=e("div#staff .half-"+(t-1));if(!e.isEmptyObject(o))for(var u=0;u<i.length;u++)if(o.attr("src")===n+i[u]+"_current.svg"){o.attr("src",n+i[u]+".svg");break}}var a=r.noteLengths[r.playData.notes[t].length].imageNamePart;e("div#staff .note-"+t).attr("src",r.bPath+"images/"+a+"_note_current.svg");var f=e("div#staff .half-"+t);if(!e.isEmptyObject(f))for(var u=0;u<i.length;u++)if(f.attr("src")===n+i[u]+".svg"){f.attr("src",n+i[u]+"_current.svg");break}},prepareForPlayStaff:function(t,n){console.log("prepareForPlayStaff solmiArray: ",n),console.log("prepareForPlayStaff position: ",t),console.log("prepareForPlayStaff sb.playData: ",r.playData);var i=r.playData.notes[t]["frequency-nr"];console.log("prepareForPlayStaff frequencyNr",i);var s=r.noteLengths[r.playData.notes[t].length].imageNamePart;if(i>=r.staffRange[0]&&i<=r.staffRange[1]){var o=r.frequencies[40].positionOf7,u=r.frequencies[i];console.log("prepareForPlayStaff frequency:",u);var a=u.soundKey[r.soundKeyCurrent.mm][r.soundKeyCurrent.position],f=u.positionOf7-o,l=r.playData.notes[t].half,c="",h="";if(u.whiteKey!==1){console.log("prepareForPlayStaff 300");var p="";a.activeHalf||(p="_ofKey");if(l==="i"||!a.activeHalf&&r.soundKeyCurrent.half==="i")c="Sharp"+p+".svg",h="i";else if(l==="u"||!a.activeHalf&&r.soundKeyCurrent.half==="u")f+=1,c="Flat"+p+".svg",h="u"}else console.log("prepareForPlayStaff 400"),a.activeHalf!==""&&(c="Natural.svg",h="na");var d=r.notesInStaff["start-bottom"]+f*r.notesInStaff["height-diff"],v=r.notesInStaff["start-left"]+r.notesInStaff["notes-left-current"]+r.notesInStaff["notes-diff"];console.log("prepareForPlayStaff, left [[before half]]:",v),c!==""&&(e("div#staff").append('<img src="'+r.bPath+"images/"+c+'" class="sign half half-'+t+'" alt="'+h+'">'),e("div#staff .half-"+t).css({position:"absolute",bottom:d+"px",left:v+"px"}),v+=r.notesInStaff["inter-tone-signs-width"]),e("div#staff").append('<img src="'+r.bPath+"images/"+s+'_note.svg" class="sign note note-'+t+'" alt="'+a.basicTone+'">'),e("div#staff .note-"+t).css({position:"absolute",bottom:d+"px",left:v+"px"}),v+=r.notesInStaff["note-width"],console.log("prepareForPlayStaff, before notesInStaff[notes-left-current]: ",r.notesInStaff["notes-left-current"]),r.notesInStaff["notes-left-current"]=v-r.notesInStaff["start-left"]}else e("#message-staff").empty().append(r.messageToneOutOfRange+n[t]),r.notesInStaff["continue"]=!1}}}),define("helpers/createSolmiArrayFromToneNumbers",["jquery","underscore","backbone","solmiBasics","helpers/helpers"],function(e,t,n,r,i){return{create:function(t){var n={1:"d",3:"r",5:"m",6:"f",8:"s",10:"l",12:"t"},s={1:"l",3:"t",4:"d",6:"r",8:"m",9:"f",11:"s"},o=n,u=new Array(5,12);r.soundKeyCurrent.mm==="minor"&&(o=s,u=new Array(3,8)),console.log("toneNumbers:",t);var a=new Array;for(var f=0;f<t.length;f++){var l=r.centralViewScaleForStart,c="",h=i.getPositionInScaleOfToneNumber(t[f]);console.log("createSolmiArrayFromToneNumbers toneNumbers[i]: ",t[f]),console.log("createSolmiArrayFromToneNumbers positionInScale: ",h);var p=h-(r.soundKeyCurrent.position-1);p<1&&(p+=12,l+=1);var d="";console.log("createSolmiArrayFromToneNumbers positionInScaleForName 1:",p);var v=e.inArray(p,r.positionOfHalvesInScale[r.soundKeyCurrent.mm]);if(v>-1){var m=-1;r.frequencies[t[f]].whiteKey!==1&&(r.soundKeyCurrent.half==="i"?m=0:r.soundKeyCurrent.half==="u"&&(m=1)),m===-1&&(m=Math.floor(Math.random()*2));if(m===0)d="u",p=i.getPositionInScaleOfBasicTone(p+1);else{var g=e.inArray(p,u);g===-1&&(d="i",p=i.getPositionInScaleOfBasicTone(p-1))}}console.log("createSolmiArrayFromToneNumbers positionInScaleForName 2:",p),console.log("createSolmiArrayFromToneNumbers positionInScaleForName: ",p),console.log("createSolmiArrayFromToneNumbers positionOfDoReMi[positionInScaleForName]: ",o[p]),c+=o[p]+d;var y=r.frequencies[t[f]].scale,b=l-y;if(b!==0){if(b>0)for(var w=0;w<b;w++)c+=",";if(b<0)for(var w=0;w>b;w--)c+="'"}a.push(c)}return console.log("createSolmiArrayFromToneNumbers solmiArray: ",a),a}}}),define("models/randomize",["jquery","underscore","backbone","solmiBasics","helpers/createSolmiArrayFromToneNumbers"],function(e,t,n,r,i){function s(e){var t=[];for(var n=r.randomRange[0];n<=r.randomRange[1];n++)e===r.frequencies[n].soundKey[r.soundKeyCurrent.mm][r.soundKeyCurrent.position].basicTone&&r.frequencies[n].soundKey[r.soundKeyCurrent.mm][r.soundKeyCurrent.position].activeHalf===""&&t.push(n);if(t.length>0){var i=Math.floor(Math.random()*t.length);return t[i]}return 0}return{randomize:function(t){var n=this;console.log("randomize currentField: ",t);var s=parseInt(e(t).parent("form").find(".tone-min").val()),o=parseInt(e(t).parent("form").find(".tone-max").val());if(o<s)throw alert(r.messageMaxToneNotSmallerThanMin),new Error(r.messageMaxToneNotSmallerThanMin);r.randomRange=Array(s,o),r.currentRandomMode=e(t).parent("form").find("#random-modes").val();if(r.currentRandomMode==="withoutSoundKeys"){var u=e(t).parent("form").find(".sound-keys").val();r.setSoundKeyCurrent(u)}else n.randomizeSoundKeys();r.numberOfNotesInStaffCurrent=parseInt(e(t).parent("form").find(".number-of-notes-in-staff").val()),r.maxDeviationFromFirstSound=parseInt(e(t).parent("form").find(".max-deviation-from-first-sound").val());var a=n.randomizeToneNumbers(s,o),f=i.create(a);return f},randomizeToneNumbers:function(t,n){var i=new Array,o=r.randomRange[1]-r.randomRange[0]+1,u=e("#random #syllableOfFirstTone").val();for(var a=0;a<r.numberOfNotesInStaffCurrent;a++){var f=0;a===0&&u!=="-"&&(f=s(u));while(f===0){var l=Math.floor(Math.random()*o+r.randomRange[0]);r.noIU===!1?f=l:r.frequencies[l].soundKey[r.soundKeyCurrent.mm][r.soundKeyCurrent.position].activeHalf===""&&(f=l)}a===0&&r.maxDeviationFromFirstSound>0&&(r.randomRange=[Math.max(r.randomRange[0],f-r.maxDeviationFromFirstSound),Math.min(r.randomRange[1],f+r.maxDeviationFromFirstSound)],o=r.randomRange[1]-r.randomRange[0]+1),i.push(f)}return i},randomizeSoundKeys:function(){var e=new Array;if(r.currentRandomMode==="withSoundKeysMajor")for(var t in r.soundKeys.major)e.push(t);else if(r.currentRandomMode==="withSoundKeysMinor")for(var t in r.soundKeys.minor)e.push(t);var n=e[Math.floor(Math.random()*e.length)];r.setSoundKeyCurrent(n)}}}),define("models/playCommon",["jquery","underscore","backbone","solmiBasics","helpers/helpers","models/playSound","models/playStaff","models/randomize"],function(e,t,n,r,i,s,o,u){return{changeScalesCurrent:function(t){e("#all-squares .squares-3x3").removeClass("scale-pos-"+r.scalesCurrent.join(" scale-pos-"));var n=r.scalesCurrent[0]-t;n>0?r.scalesCurrent=[t+2,t+1,t]:r.scalesCurrent=[t,t-1,t-2],e("#all-squares .squares-3x3").each(function(t){e(this).addClass("scale-pos-"+r.scalesCurrent[t])})},getToneDataThroughValidation:function(t,n,i,s,o){var u="",a=n,f=0,l=0;if(!e.isEmptyObject(s)){var c=jQuery.inArray(s[0],r.basicTones);if(c===-1)return alert(r.messageNotValid+t[i]+" (10)"),!1;if(s.length>1)if(s[1]===",")f+=1;else if(s[1]==="'")l+=1;else if(s[1]==="u")u="u";else{if(s[1]!=="i")return alert(r.messageNotValid+t[i]+" (20)"),!1;u="i"}if(s.length>2)for(var h=2;h<s.length;h++)if(s[h]===","&&l===0)f+=1;else{if(s[h]!=="'"||f!==0)return alert(r.messageNotValid+t[i]+" (30)"),!1;l+=1}if(o[1]&&!r.noteLengths[parseFloat(o[1])])return alert(r.messageToneLengthNotExist+o[1]),!1;if(f>0){if(f>r.scalesLimit[n].sub)return alert(r.messageNotValid+t[i]+" (50)"),!1;a-=f}else if(l>0){if(l>r.scalesLimit[n]["super"])return alert(r.messageNotValid+t[i]+" (60)"),!1;a+=l}var p='{"scale":'+a+',"half":"'+u+'"'+',"marksBottom":'+f+',"marksTop":'+l+"}";return JSON.parse(p)}return alert(r.messageNotValid+t[i]+" (40)"),!1},play:function(){r.startTimeOfPlay=Date.now(),s.playSound(0),this.playSolmiString(0)},playSolmiString:function(t){var n=this;e("#all-squares .row div").css({"background-image":"none"});var i=r.playData.notes[t];e.inArray(i.scale,r.scalesCurrent)<0&&n.changeScalesCurrent(i.scale);var u=e(".scale-pos-"+i.scale+" .row:nth-child("+i["position-square-in-scale"][0]+") div:nth-child("+i["position-square-in-scale"][1]+")");u.css({"background-image":"url('"+r.bPath+"images/redDot2.png')","background-position":r.positionInSquare[i.half]});var a=r.playData.notes[t].length*r.baseToneLength;o.playStaff(t),t>0&&s.playSound(t),r.currentTimeOfPlay+=a;var f=Date.now(),l=r.startTimeOfPlay+r.currentTimeOfPlay-f;l<0&&console.log("playSolmiString, !: waitTime < 0"),n.waitTimeDiffSum+=a-l;var c=f-r.startTimeOfPlay,h=r.currentTimeOfPlay-c;n.timePassedBefore=c,t<r.playData["notes-length"]-1?setTimeout(function(){n.playSolmiString(t+1)},h):(r.currentTimeOfPlay=0,r.remainingNumberOfPlaying-=1,r.remainingNumberOfPlaying>0?setTimeout(function(){n.play()},h):r.remainingNumberOfPlaying=r.currentNumberOfPlaying)},waitTimeDiffSum:0,timePassedBefore:0,prepareForPlay:function(t,n){console.log("playCommon.js prepareForPlay currentField",t),r.samples=[],e("#message-staff, .notes-string, .frequencies-string").empty();var i=!1;if(n==="standard"){console.log("playCommon.js $(currentField)",e(t)),console.log("playCommon.js $(currentField).parents(form)",e(t).parents("form"));var s=e(t).parents("form").find(".sound-keys").val();console.log("playCommon.js soundKey",s),console.log("playCommon.js x200"),console.log("playCommon.js x210"),console.log("prepareForPlay, scalesCurrent : "+r.scalesCurrent);var a=e(t).parents("form").find('input[type="text"]').val();i=parseInt(e(t).parents("form").find(".scales").val()),console.log("solmiString: "+a)}else if(n==="repeat"){var s=e(".used-string .sound-key").text(),a=e(".used-string .solmistring").text();i=parseInt(e(".used-string .scale").text())}if(n==="standard"||n==="repeat"){r.setSoundKeyCurrent(s);var f=a.split("-")}r.notesInStaff=e.extend(!0,{},r.notesInStaffStart),e("div#staff img.sign").remove(),n==="random"&&(f=u.randomize(t),i=r.centralViewScaleForStart),e(".used-string").empty();var l='<input class="repeat" type="button" value="Repeat" name="repeat">';l+='<span class="solmistring">'+f.join("-")+"</span>",l+=' (used string), <span class="sound-key">'+r.soundKeyCurrent.key+"</span> "+r.soundKeyCurrent.mm+', scale <span class="scale">'+i+"</span>",e(".used-string").append(l),o.createKeySignature(),console.log("solmiArray: "+f),this.prepareForPlaySolmiString(f,i,0);var c="",h="";for(var p=0;p<f.length;p++){var d=r.playData.notes[p]["frequency-nr"];c+=Math.round(r.toneFrequencies[d])+"-",d>=r.staffRange[0]&&d<=r.staffRange[1]?h+=r.notesNrAndName[d]:h+="x",h+="-"}e(".frequencies-string").append(c+" (frequencies)"),e(".notes-string").append(h+" (notes)"),console.log("prepareForPlay playData: ",r.playData),console.log("prepareForPlay soundKeyCurrent: ",r.soundKeyCurrent),console.log("prepareForPlay currentNumberOfPlaying: ",r.currentNumberOfPlaying),this.play()},prepareForPlaySolmiString:function(t,n,u){r.playData.notes[u]={};var a=t[u].split("|");r.playData.notes[u].length=1,a[1]&&(r.playData.notes[u].length=parseFloat(a[1]));var f=a[0].split(""),l=this.getToneDataThroughValidation(t,n,u,f,a);if(l===!1)return!1;var c=l.scale,h=l.half;console.log("scalesCurrent: ",r.scalesCurrent),u===0&&e.inArray(c,r.scalesCurrent)<0&&(r.scalesCurrent=i.setScalesCurrent(r.scaleRange,r.centralViewScale,r.scalesCurrent)),r.playData.notes[u].scale=c;var p=r.tonePositions[f[0]];r.playData.notes[u]["position-square-in-scale"]=p,console.log("prepareForPlaySolmiString tone: ",p),h===""?r.playData.notes[u].half="n":r.playData.notes[u].half=h,s.prepareForPlaySound(f,c,h,u,a),r.notesInStaff["continue"]===!0&&o.prepareForPlayStaff(u,t),console.log("prepareForPlaySolmiString solmiArray.length: ",t.length),console.log("prepareForPlaySolmiString position: ",u),u<t.length-1?this.prepareForPlaySolmiString(t,n,u+1):r.playData["notes-length"]=t.length}}}),define("models/frequenciesTuner",["jquery","underscore","backbone"],function(e,t,n){function o(){function e(e,t,n){return e*(t/(n*2))}this.extractHigherValueFrequency=function(t,n,r){var i=0,s=0,o=t.length;for(var u=0;u<o;u++){var a=e(u,r,n);t[u]>i&&(i=t[u],s=a)}return s}}function u(){that=this,window.AudioContext=window.AudioContext||window.webkitAudioContext,navigator.getMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;var t=new AudioContext,n=function(i){var s=t.createMediaStreamSource(i),o=new a(s,t.destination,t);o.start(function(t){that.tunerShowData===!0&&t!==0&&t!==64&&t!==75&&t!==r&&e("#frequencies-string2").append("-"+t),r=t})},i=function(t){console.log(t)};navigator.getMedia({audio:!0},n,i)}function a(e,t,n,r,i){this.sourceNode=e,this.destinationNode=t,this.audioContext=n,this.frequenciesExtractor=r||new o,this.count=0,this.start=function(e){var t=this.audioContext.createAnalyser();t.fftSize=2048,this.sourceNode.connect(t);var n=this.audioContext.createScriptProcessor(!1,1,1);t.connect(n);var r=new Uint8Array(t.frequencyBinCount),i=this;n.onaudioprocess=window.audioProcess=function(){t.getByteFrequencyData(r);var n=i.frequenciesExtractor.extractHigherValueFrequency(r,t.fftSize,i.audioContext.sampleRate),s=Math.floor(n);e(s)},n.connect(this.destinationNode)}}var r=0,i=!1,s=!0;return{frequencyBefore:r,tunerActive:i,tunerShowData:s,startTuner:u}}),define("views/forms",["jquery","underscore","backbone","solmiBasics"],function(e,t,n,r){function s(){var e='<form class="frequencies">';return e+='<input type="submit" class="start" value="Start">',e+='<input type="submit" class="stop" value="Stop">',e+='<input type="submit" class="reset" value="Reset">',e+="</form>",e}function o(){var e='<select name="sound-keys" class="sound-keys">/n',t=new Array("major","minor");for(var n=0;n<t.length;n++)for(var i in r.soundKeys[t[n]])e+='<option value="'+i+'">'+i+"</option>";return e+="</select>",e}var i=o();return{baseScaleSelectField:function(e){var t='<select name="scales" class="scales">/n';for(var n=r.scaleRange[1];n>=r.scaleRange[0];n--){var i="";n===e.base_scale&&(i=" selected"),t+='<option value="'+n+'"'+i+">"+n+"</option>"}return t+="</select>",t},frequenciesForm:s(),randomForm:function(){var e='<form id="random">';return e+="Random: <br>",e+=this.selectFieldForRandomMode()+"<br>",e+=this.selectFormWithToneNames("min",0),e+=this.selectFormWithToneNames("max",1),e+="<br>sound key:"+this.soundKeySelect+"\n",e+=this.selectFieldForNumberOfNotesInStaff()+"<br>",e+='<input class="noIU" type="checkbox"> no i or u in solmization string<br>',e+=this.selectFieldForFirstStringItem()+"<br>",e+=this.selectFieldForMaxDeviationFromFirstSound()+"<br>",e+='<input class="go" type="button" value="Go" name="go">',e+='<input class="repeat" type="button" value="Repeat" name="repeat">',e+="</form>",e},selectFieldForCentralViewScale:function(){var e='<br>Central view scale: <select name="central-view-scale" id="central-view-scale">/n';for(var t=r.scaleRange[1]-1;t>=r.scaleRange[0]+1;t--){var n="";t===r.centralViewScale&&(n=" selected"),e+='<option value="'+t+'"'+n+">"+t+"</option>"}return e+="</select>",e},selectFieldForFirstStringItem:function(){var e='Syllable of first tone: <select name="syllableOfFirstTone" id="syllableOfFirstTone">/n';e+='<option value="-" selected>-</option>';for(var t=0;t<r.basicTones.length;t++)e+='<option value="'+r.basicTones[t]+'">'+r.basicTones[t]+"</option>";return e+="</select>",e},selectFieldForInstruments:function(){var e='<br>Instrument: <select name="instruments" id="instruments">/n';for(var t=0;t<r.instruments.length;t++){var n="";r.instruments[t]===r.currentInstrument&&(n=" selected"),e+='<option value="'+r.instruments[t]+'"'+n+">"+r.instruments[t]+"</option>"}return e+="</select>",e},selectFieldForNumberOfNotesInStaff:function(){var e='number of notes: <select name="number-of-notes-in-staff" class="number-of-notes-in-staff">/n';for(var t=r.rangeOfNumberOfNotesInStaff[0];t<=r.rangeOfNumberOfNotesInStaff[1];t++){var n="";t===r.numberOfNotesInStaffCurrent&&(n=" selected"),e+='<option value="'+t+'"'+n+">"+t+"</option>"}return e+="</select>",e},selectFieldForMaxDeviationFromFirstSound:function(){var e='Max. deviation from 1st sound: <select name="max-deviation-from-first-sound" class="max-deviation-from-first-sound">/n',t="";0===r.maxDeviationFromFirstSound&&(t=" selected"),e+='<option value="0"'+t+">-</option>";for(var n=1;n<=24;n++)t="",n===r.maxDeviationFromFirstSound&&(t=" selected"),e+='<option value="'+n+'"'+t+">"+n+"</option>";return e+="</select>",e},selectFieldForRandomMode:function(){var e={withSoundKeysMajor:"with major random sound keys",withSoundKeysMinor:"with minor random sound keys",withoutSoundKeys:"without random sound keys"},t='mode: <select name="random-modes" id="random-modes">/n';for(var n in e){var i="";n===r.currentRandomMode&&(i=" selected"),t+='<option value="'+n+'"'+i+">"+e[n]+"</option>"}return t+="</select>",t},selectFieldForRepetition:function(){var e='<br>How often play: <select name="repetition" id="repetition">/n',t=[1,2,3,5,10];for(var n=0;n<t.length;n++){var i="";t[n]===r.currentNumberOfPlaying&&(i=" selected"),e+='<option value="'+t[n]+'"'+i+">"+t[n]+"</option>"}return e+="</select>",e},selectFormWithToneNames:function(e,t){var n=e+': <select name="'+e+'" class="tone-'+e+'">'+"/n";for(var i=r.staffRange[1];i>r.staffRange[0];i--){var s="";i===r.randomRange[t]&&(s=" selected"),n+='<option value="'+i+'"'+s+">"+r.notesNrAndName[i]+"</option>"}return n+="</select>",n},soundKeySelect:i}}),define("views/additional",["jquery","underscore","backbone","solmiBasics"],function(e,t,n,r){return{inputBaseToneLength:function(){return'<br>Base tone length: <input id="base-tone-length" type="text" value="'+r.baseToneLength+'">'}}}),define("solmiMain",["jquery","underscore","backbone","solmiBasics","helpers/helpers","models/playCommon","models/frequenciesTuner","views/forms","views/additional"],function(e,t,n,r,i,s,o,u,a){e("#div1").after(u.randomForm()),e("#div1").after(a.inputBaseToneLength()),e("#div1").after(u.selectFieldForRepetition()),e("#div1").after(u.selectFieldForInstruments()),e("#div1").after(u.selectFieldForCentralViewScale());for(var f=1;f<=2;f++)e(".squares-3x3 .row:nth-child("+f+") div:first-child").css({visibility:"hidden"});return e("#solmi-strings form input").keypress(function(e){e.which===13&&e.preventDefault()}),e(".noIU").click(function(){r.noIU===!1?r.noIU=!0:r.noIU=!1}),e("#solmi-strings form .go").click(function(){console.log("scalesCurrent after click go: ",r.scalesCurrent),s.prepareForPlay(this,"standard")}),e("body").on("click",".repeat",function(){console.log("scalesCurrent after click repeat: ",r.scalesCurrent);var t=e(".used-string").text();t&&s.prepareForPlay(this,"repeat")}),e("form#random .go").click(function(){console.log("scalesCurrent after click form#random: ",r.scalesCurrent),s.prepareForPlay(this,"random")}),e("#central-view-scale").change(function(){e("#all-squares .row div").css({"background-image":"none"}),r.centralViewScale=parseInt(e(this).val()),r.scalesCurrent=i.setScalesCurrent(r.scaleRange,r.centralViewScale,r.scalesCurrent)}),e("#instruments").change(function(){r.currentInstrument=e(this).val()}),e("#repetition").change(function(){r.remainingNumberOfPlaying=r.currentNumberOfPlaying=parseInt(e(this).val())}),e("#base-tone-length").change(function(){r.baseToneLength=parseInt(e(this).val())}),e(".sound-keys").change(function(){var t=e(this).val();r.setSoundKeyCurrent(t)}),e("#frequencies-string2").after(u.frequenciesForm),e("form.frequencies .start").click(function(){try{o.tunerActive===!1?(o.tunerActive=!0,o.startTuner()):o.tunerShowData=!0}catch(e){return console.error(e.message),!1}return!1}),e("form.frequencies .stop").click(function(){try{o.tunerShowData=!1,console.log("solmiMain .stop frequenciesTuner",o)}catch(e){return console.error(e.message),!1}return!1}),e("form.frequencies .reset").click(function(){try{e("#frequencies-string2").empty()}catch(t){return console.error(t.message),!1}return!1}),{}}),define("solmi",["solmiBasics","solmiMain"],function(e,t){return console.log("solmi.js, solmiBasics",e),{}}),require.config({paths:{jquery:["http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min","libs/jquery/jquery-1.11.2.min"],underscore:"libs/underscore/underscore-min-1.7.0",backbone:"libs/backbone/backbone-min-1.1.2",audiosynth:"libs/audiosynth/audiosynth"},shim:{audiosynth:{},underscore:{exports:"_"},backbone:{deps:["jquery","underscore"],exports:"Backbone"}}}),require(["infrastructure"],function(){require(["solmi"],function(e){})}),define("config",function(){});