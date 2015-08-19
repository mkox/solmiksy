define("helpers/helpers",["jquery","underscore"],function(e,t){return{array_flip:function(e){for(key in e)e.hasOwnProperty(key),tmp_ar[e[key]]=key;return tmp_ar},createFrequencies:function(){var e="";for(var t=1;t<=111;t++){var n=Math.pow(2,(t-49)/12)*440;e+='"'+t+'":'+n.toFixed(2)+","}return e=e.slice(0,e.length-1),JSON.parse("{"+e+"}")},flipObject:function(t){var n={};return e.each(t,function(e,t){n[t]=e}),n},getPositionInScaleOfBasicTone:function(e){e<0&&(e+=12);var t=e%12;return t===0&&(t=12),t},getPositionInScaleOfToneNumber:function(e){var t=(e-3)%12;return t===0&&(t=12),t},scalesLimit:function(e){var t="";for(var n=e[0];n<=e[1];n++)t+='"'+n+'":'+'{"super":'+(e[1]-n)+',"sub":'+(n-e[0])+"},";return t=t.slice(0,t.length-1),JSON.parse("{"+t+"}")},setPositionStaffForSoundKey:function(e,t,n){console.log("helpers.js setPositionStaffForSoundKey");var r=t;for(var i=0;i<e[n].length;i++)e[n][i]<t&&(r-=1);return r},setScalesCurrent:function(t,n,r){return r.length>0&&e("#all-squares .squares-3x3").removeClass("scale-pos-"+r.join(" scale-pos-")),n>t[0]&&n<t[1]&&(r=[n+1,n,n-1]),console.log("setScalesCurrent, scalesCurrent after",r),e("#all-squares .squares-3x3").each(function(t){e(this).addClass("scale-pos-"+r[t])}),r}}}),define("helpers/createFrequencies",["jquery","underscore","helpers/helpers"],function(e,t,n){var r,i,s,o;return{getFrequenciesInfo:function(t,u,a,f,l,c){r=l,s=u,o=a,i=t;var h={};h={};var p=0,d=["major","minor"];for(var v=4;v<=111;v++){h[v]={};var m=Math.pow(2,(v-49)/12)*440;h[v].hertz=m.toFixed(2),h[v].scale=Math.ceil((v-3)/12);var g=n.getPositionInScaleOfToneNumber(v);h[v].scalePositionOf12=g,h[v].noteNameEnglish=c[g][0];var y=1,b=e.inArray(g,f.major);b>-1&&(y=0),h[v].whiteKey=y,p+=y,h[v].positionOf7=p,h[v].soundKey={};for(var w=0;w<d.length;w++){h[v].soundKey[d[w]]={};for(var E=1;E<=12;E++)if(i[d[w]][E]){var S=this.getSolmiToneOfSoundKeyFromFrequency(v,E,d[w],g);h[v].soundKey[d[w]][E]=S,h[v].soundKey[d[w]][E].name=i[d[w]][E].name}}}return console.log("getFrequenciesInfo frequencies: ",h),h},getSolmiToneOfSoundKeyFromFrequency:function(t,u,a,f){var l=t-(f-1),c=l+(u-1),h=n.getPositionInScaleOfBasicTone(t-c+1),p=e.inArray(h,r[a]),d={};d["TEST10-frequencyNr"]=t,d["TEST20-soundKeyNr"]=u,d["TEST30-scalePosition"]=f,d["TEST40-scaleBaseFrequencyNr"]=l,d["TEST50-soundKeyBaseFrequencyNr"]=c,d["TEST60-solmiToneNr-1"]=h,d["TEST70-solmiToneNr2"]=p,d.basicToneNrOf12orig=h;var v="";if(p===-1){var v=i[a][u].half;d["TEST80-half"]=v,v==="u"?h++:v==="i"?h--:v===""&&(h--,v="i"),d["TEST90-half"]=v}return a==="major"?(d.basicTone=s[h],d["TEST110-basicTone-major"]=s[h]):(d.basicTone=o[h],d["TEST120-basicTone-minor"]=o[h]),d.basicToneNrOf12=h,d.activeHalf=v,d}}}),define("solmiBasics",["jquery","underscore","helpers/helpers","helpers/createFrequencies"],function(e,t,n,r){console.log("solmiBasics.js 1, helpers",n);var i=new Array("d","r","m","f","s","l","t"),s={d:1,r:3,m:5,f:6,s:8,l:10,t:12},o=n.flipObject(s),u={l:1,t:3,d:4,r:6,m:8,f:9,s:11},a=n.flipObject(u),f={l:13,t:15,d:4,r:6,m:8,f:9,s:11},l={1:["C"],2:["C#","Db"],3:["D"],4:["D#","Es"],5:["E"],6:["F"],7:["F#","Gb"],8:["G"],9:["G#","Ab"],10:["A"],11:["A#","Bb"],12:"B"},c=[1,9],h=4,p=0+h,d=!1,v=[];v=n.setScalesCurrent(c,p,v),console.log("solmiBasics.js scalesCurrent",v);var m=n.scalesLimit(c),g={"signature-start-left":60,"start-left":120,"start-bottom":110,"height-diff":6.8,"notes-diff":4,"notes-left-current":0,"note-width":35,"inter-tone-signs-width":6,"continue":!0},y=[16,64],b={major:[2,4,7,9,11],minor:[2,5,7,10,12]},w={major:[1,3,5,6,8,10,12],minor:[1,3,4,6,8,9,11]},E={major:{C:{position:1,half:"",signs:0},Des:{position:2,half:"u",signs:5},D:{position:3,half:"i",signs:2},Es:{position:4,half:"u",signs:3},E:{position:5,half:"i",signs:4},F:{position:6,half:"u",signs:1},G:{position:8,half:"i",signs:1},As:{position:9,half:"u",signs:4},A:{position:10,half:"i",signs:3},B:{position:11,half:"u",signs:2},H:{position:12,half:"i",signs:5}},minor:{c:{position:1,half:"u",signs:3},cis:{position:2,half:"i",signs:4},d:{position:3,half:"u",signs:1},e:{position:5,half:"i",signs:1},f:{position:6,half:"u",signs:4},fis:{position:7,half:"i",signs:3},g:{position:8,half:"u",signs:2},gis:{position:9,half:"i",signs:5},a:{position:10,half:"",signs:0},b:{position:11,half:"u",signs:5},h:{position:12,half:"i",signs:2}}},S={major:{1:{name:"C",position:1,half:"",signs:0},2:{name:"Des",position:2,half:"u",signs:5},3:{name:"D",position:3,half:"i",signs:2},4:{name:"Es",position:4,half:"u",signs:3},5:{name:"E",position:5,half:"i",signs:4},6:{name:"F",position:6,half:"u",signs:1},7:{name:"Fis",position:7,half:"i",signs:6},8:{name:"G",position:8,half:"i",signs:1},9:{name:"As",position:9,half:"u",signs:4},10:{name:"A",position:10,half:"i",signs:3},11:{name:"B",position:11,half:"u",signs:2},12:{name:"H",position:12,half:"i",signs:5}},minor:{1:{name:"c",position:1,half:"u",signs:3},2:{name:"cis",position:2,half:"i",signs:4},3:{name:"d",position:3,half:"u",signs:1},4:{name:"es",position:4,half:"u",signs:6},5:{name:"e",position:5,half:"i",signs:1},6:{name:"f",position:6,half:"u",signs:4},7:{name:"fis",position:7,half:"i",signs:3},8:{name:"g",position:8,half:"u",signs:2},9:{name:"gis",position:9,half:"i",signs:5},10:{name:"a",position:10,half:"",signs:0},11:{name:"b",position:11,half:"u",signs:5},12:{name:"h",position:12,half:"i",signs:2}}};return{bPath:"/bundles/mkoxsolmik/",baseToneLength:500,basicTones:i,basicTonesMajor:s,basicTonesMajor2:o,basicTonesMinorRaw:u,basicTonesMinorRaw2:a,basicTonesMinor:f,basicTonesMajorStaff:{d:1,r:2,m:3,f:4,s:5,l:6,t:7},basicTonesMinorStaff:{l:8,t:9,d:3,r:4,m:5,f:6,s:7},tonePositions:{d:[3,1],r:[3,2],m:[3,3],f:[2,2],s:[2,3],l:[1,2],t:[1,3]},noIU:d,currentNumberOfPlaying:1,remainingNumberOfPlaying:1,scaleRange:c,centralViewScaleForStart:h,centralViewScale:p,scalesCurrent:v,scalesLimit:m,positionOfHalvesInScale:b,positionOfFullInScale:w,positionInSquare:{n:"center",u:"center bottom",i:"center top"},soundKeys:E,soundKeys2:S,startTimeOfPlay:0,currentTimeOfPlay:0,positonsSharp:new Array(0,-3,1,-2,-5),positonsFlat:new Array(0,3,-1,2,-2),soundKeyCurrent:{key:"C",position:1,position_staff:1,half:"",signs:0,mm:"major"},setSoundKeyCurrent:function(e){var t=e.split(""),r="";t[0]===t[0].toUpperCase()?r="major":r="minor",this.soundKeyCurrent=this.soundKeys[r][e],this.soundKeyCurrent.mm=r,this.soundKeyCurrent.key=e,this.soundKeyCurrent.position_staff=n.setPositionStaffForSoundKey(this.positionOfHalvesInScale,this.soundKeyCurrent.position,this.soundKeyCurrent.mm),console.log("sb setSoundKeyCurrent this.soundKeyCurrent:",this.soundKeyCurrent)},currentRandomMode:"withSoundKeysMajor",randomBasicGoCount:0,playData:{notes:{}},notesInStaffStart:g,noteLengths:{4:{imageNamePart:"1-1"},2:{imageNamePart:"1-2"},1:{imageNamePart:"1-4"},.5:{imageNamePart:"1-8"},.25:{imageNamePart:"1-16"},.125:{imageNamePart:"1-32"}},notesInStaff:e.extend(!0,{},g),staffRange:y,notesNrAndName:{16:"C",17:"Cis/Des",18:"D",19:"Dis/Es",20:"E",21:"F",22:"Fis/Ges",23:"G",24:"Gis/As",25:"A",26:"Ais/B",27:"H",28:"c",29:"cis/des",30:"d",31:"dis/es",32:"e",33:"f",34:"fis/ges",35:"g",36:"gis/as",37:"a",38:"ais/b",39:"h",40:"c<sup>1</sup>",41:"cis/des<sup>1</sup>",42:"d<sup>1</sup>",43:"dis/es<sup>1</sup>",44:"e<sup>1</sup>",45:"f<sup>1</sup>",46:"fis/ges<sup>1</sup>",47:"g<sup>1</sup>",48:"gis/as<sup>1</sup>",49:"a<sup>1</sup>",50:"ais/b<sup>1</sup>",51:"h<sup>1</sup>",52:"c<sup>2</sup>",53:"cis/des<sup>2</sup>",54:"d<sup>2</sup>",55:"dis/es<sup>2</sup>",56:"e<sup>2</sup>",57:"f<sup>2</sup>",58:"fis/ges<sup>2</sup>",59:"g<sup>2</sup>",60:"gis/as<sup>2</sup>",61:"a<sup>2</sup>",62:"ais/b<sup>2</sup>",63:"h<sup>2</sup>",64:"c<sup>3</sup>"},randomRange:new Array(28,52),rangeOfNumberOfNotesInStaff:new Array(1,25),numberOfNotesInStaffCurrent:4,maxDeviationFromFirstSound:0,instruments:new Array("piano","organ","acoustic","edm"),currentInstrument:"acoustic",toneFrequencies:n.createFrequencies(),frequencies:r.getFrequenciesInfo(S,o,a,b,w,l),selectedStrings:[],messageNotValid:"Not a valid string in this context: ",messageToneOutOfRange:"This tone can't be shown here: ",messageToneLengthNotExist:"This tone length does not exist: ",messageMaxToneNotSmallerThanMin:"max tone can't be smaller than min tone!",messageModeNotValid:"The used mode is not valid",messageNoStringIsUsed:"No string is used at the moment.",messageNoSelectedStrings:"No string is selected at the moment",messageNotInListOfSelectedStrings:"This string is not in the list of selected strings."}}),define("models/playSound",["jquery","underscore","solmiBasics","helpers/helpers","audiosynth"],function(e,t,n,r){return{playSound:function(e){var t=new Audio(n.playData.notes[e].audioURI);t.play()},prepareForPlaySound:function(e,t,r,i,s){console.log("prepareForPlaySound sb.soundKeyCurrent:",n.soundKeyCurrent);var o=n.basicTonesMajor[e[0]];n.soundKeyCurrent.mm==="minor"&&(o=n.basicTonesMinor[e[0]]),console.log("prepareForPlaySound sb.soundKeyCurrent",n.soundKeyCurrent),console.log("prepareForPlaySound basicToneNr",o);var u=3+(t-1)*12+n.soundKeyCurrent.position+(o-1);r!==""&&(r==="u"?u-=1:r==="i"&&(u+=1)),n.playData.notes[i]["frequency-nr"]=u,this.generateAndStoreSound(n.currentInstrument,u,i)},generateAndStoreSound:function(e,t,r){var i=n.playData.notes[r].length*n.baseToneLength/1e3;n.playData.notes[r].audioURI=Synth.generate(e,n.frequencies[t].noteNameEnglish,n.frequencies[t].scale,i)}}}),define("models/playStaff",["jquery","underscore","solmiBasics","helpers/helpers"],function(e,t,n,r){return{createKeySignature:function(){if(n.soundKeyCurrent.half!==""){var t=10,r=4,i=n.positonsSharp,s="Sharp.svg";n.soundKeyCurrent.half==="u"&&(t=6,r=8,i=n.positonsFlat,s="Flat.svg");var o=n.notesInStaffStart["start-bottom"]+t*n.notesInStaffStart["height-diff"],u=n.notesInStaffStart["start-bottom"]-r*n.notesInStaffStart["height-diff"],a=n.notesInStaffStart["signature-start-left"],f=new Array("violin","bass"),l=new Array(o,u);console.log("createKeySignature staffHeights:",l);for(var c=0;c<n.soundKeyCurrent.signs;c++){for(var h=0;h<f.length;h++){console.log("createKeySignature i - j:",c+" - "+h),e("#staff").append('<img src="'+n.bPath+"images/"+s+'" class="sign '+f[h]+" starthalf starthalf-"+c+'" alt="'+n.soundKeyCurrent.half+'">');var p=l[h]+i[c]*n.notesInStaff["height-diff"];e("#staff ."+f[h]+".starthalf-"+c).css({position:"absolute",bottom:p+"px",left:a+"px"})}a+=n.notesInStaff["inter-tone-signs-width"]}}},playStaff:function(t){var r=n.bPath+"images/",i=["Sharp","Flat","Natural"];if(t>0){var s=n.noteLengths[n.playData.notes[t-1].length].imageNamePart;e("#staff .note-"+(t-1)).attr("src",n.bPath+"images/"+s+"_note.svg");var o=e("#staff .half-"+(t-1));if(!e.isEmptyObject(o))for(var u=0;u<i.length;u++)if(o.attr("src")===r+i[u]+"_current.svg"){o.attr("src",r+i[u]+".svg");break}}var a=n.noteLengths[n.playData.notes[t].length].imageNamePart;e("#staff .note-"+t).attr("src",n.bPath+"images/"+a+"_note_current.svg");var f=e("#staff .half-"+t);if(!e.isEmptyObject(f))for(var u=0;u<i.length;u++)if(f.attr("src")===r+i[u]+".svg"){f.attr("src",r+i[u]+"_current.svg");break}},prepareForPlayStaff:function(t,r){console.log("prepareForPlayStaff solmiArray: ",r),console.log("prepareForPlayStaff position: ",t),console.log("prepareForPlayStaff sb.playData: ",n.playData);var i=n.playData.notes[t]["frequency-nr"];console.log("prepareForPlayStaff frequencyNr",i);var s=n.noteLengths[n.playData.notes[t].length].imageNamePart;if(i>=n.staffRange[0]&&i<=n.staffRange[1]){var o=n.frequencies[40].positionOf7,u=n.frequencies[i];console.log("prepareForPlayStaff frequency:",u);var a=u.soundKey[n.soundKeyCurrent.mm][n.soundKeyCurrent.position],f=u.positionOf7-o,l=n.playData.notes[t].half,c="",h="";if(u.whiteKey!==1){console.log("prepareForPlayStaff 300");var p="";a.activeHalf||(p="_ofKey");if(l==="i"||!a.activeHalf&&n.soundKeyCurrent.half==="i")c="Sharp"+p+".svg",h="i";else if(l==="u"||!a.activeHalf&&n.soundKeyCurrent.half==="u")f+=1,c="Flat"+p+".svg",h="u"}else console.log("prepareForPlayStaff 400"),a.activeHalf!==""&&(c="Natural.svg",h="na");var d=n.notesInStaff["start-bottom"]+f*n.notesInStaff["height-diff"],v=n.notesInStaff["start-left"]+n.notesInStaff["notes-left-current"]+n.notesInStaff["notes-diff"];console.log("prepareForPlayStaff, left [[before half]]:",v),c!==""&&(e("#staff").append('<img src="'+n.bPath+"images/"+c+'" class="sign half half-'+t+'" alt="'+h+'">'),e("#staff .half-"+t).css({position:"absolute",bottom:d+"px",left:v+"px"}),v+=n.notesInStaff["inter-tone-signs-width"]),e("#staff").append('<img src="'+n.bPath+"images/"+s+'_note.svg" class="sign note note-'+t+'" alt="'+a.basicTone+'">'),e("#staff .note-"+t).css({position:"absolute",bottom:d+"px",left:v+"px"}),v+=n.notesInStaff["note-width"],console.log("prepareForPlayStaff, before notesInStaff[notes-left-current]: ",n.notesInStaff["notes-left-current"]),n.notesInStaff["notes-left-current"]=v-n.notesInStaff["start-left"]}else e("#message-staff").empty().append(n.messageToneOutOfRange+r[t]),n.notesInStaff["continue"]=!1}}}),define("helpers/createSolmiArrayFromToneNumbers",["jquery","underscore","solmiBasics","helpers/helpers"],function(e,t,n,r){return{create:function(t){var i={1:"d",3:"r",5:"m",6:"f",8:"s",10:"l",12:"t"},s={1:"l",3:"t",4:"d",6:"r",8:"m",9:"f",11:"s"},o=i,u=new Array(5,12);n.soundKeyCurrent.mm==="minor"&&(o=s,u=new Array(3,8)),console.log("toneNumbers:",t);var a=new Array;for(var f=0;f<t.length;f++){var l=n.centralViewScaleForStart,c="",h=r.getPositionInScaleOfToneNumber(t[f]);console.log("createSolmiArrayFromToneNumbers toneNumbers[i]: ",t[f]),console.log("createSolmiArrayFromToneNumbers positionInScale: ",h);var p=h-(n.soundKeyCurrent.position-1);p<1&&(p+=12,l+=1);var d="";console.log("createSolmiArrayFromToneNumbers positionInScaleForName 1:",p);var v=e.inArray(p,n.positionOfHalvesInScale[n.soundKeyCurrent.mm]);if(v>-1){var m=-1;n.frequencies[t[f]].whiteKey!==1&&(n.soundKeyCurrent.half==="i"?m=0:n.soundKeyCurrent.half==="u"&&(m=1)),m===-1&&(m=Math.floor(Math.random()*2));if(m===0)d="u",p=r.getPositionInScaleOfBasicTone(p+1);else{var g=e.inArray(p,u);g===-1&&(d="i",p=r.getPositionInScaleOfBasicTone(p-1))}}console.log("createSolmiArrayFromToneNumbers positionInScaleForName 2:",p),console.log("createSolmiArrayFromToneNumbers positionInScaleForName: ",p),console.log("createSolmiArrayFromToneNumbers positionOfDoReMi[positionInScaleForName]: ",o[p]),c+=o[p]+d;var y=n.frequencies[t[f]].scale,b=l-y;if(b!==0){if(b>0)for(var w=0;w<b;w++)c+=",";if(b<0)for(var w=0;w>b;w--)c+="'"}a.push(c)}return console.log("createSolmiArrayFromToneNumbers solmiArray: ",a),a}}}),define("models/randomize",["jquery","underscore","solmiBasics","helpers/createSolmiArrayFromToneNumbers"],function(e,t,n,r){function s(e){var t=[];for(var r=n.randomRange[0];r<=n.randomRange[1];r++)e===n.frequencies[r].soundKey[n.soundKeyCurrent.mm][n.soundKeyCurrent.position].basicTone&&n.frequencies[r].soundKey[n.soundKeyCurrent.mm][n.soundKeyCurrent.position].activeHalf===""&&t.push(r);if(t.length>0){var i=Math.floor(Math.random()*t.length);return t[i]}return 0}var i=function(){n.randomBasicGoCount+=1,e("#random .basic-sum span").text(n.randomBasicGoCount)},o=function(){n.randomBasicGoCount=0,e("#random .basic-sum span").text(n.randomBasicGoCount)},u=function(){var t=e(".used-string .solmistring").text();if(t.length>0){var r=e(".used-string .sound-key").text(),i=e(".used-string .scale").text(),s=JSON.parse('{"solmistring": "'+t+'", \n                "soundKey": "'+r+'", \n                "scale": "'+i+'"}');n.selectedStrings.push(s),console.log(n.selectedStrings),e("#selection-solmistrings .sum span").text(n.selectedStrings.length)}else alert(n.messageNoStringIsUsed)},a=function(){if(n.selectedStrings.length>0){var e=Math.floor(Math.random()*n.selectedStrings.length);return n.selectedStrings[e]}alert(n.messageNoSelectedStrings)},f=function(){if(n.selectedStrings.length>0){var t=!1,r=e(".used-string .solmistring").text(),i=e(".used-string .sound-key").text(),s=e(".used-string .scale").text();for(var o=0;o<n.selectedStrings.length;o++){var u=[r,n.selectedStrings[o].solmistring,i,n.selectedStrings[o].soundKey,s,n.selectedStrings[o].scale];if(r===n.selectedStrings[o].solmistring&&i===n.selectedStrings[o].soundKey&&s===n.selectedStrings[o].scale){n.selectedStrings.splice(o,1),e("#selection-solmistrings .sum span").text(n.selectedStrings.length),t=!0;break}}t||alert(n.messageNotInListOfSelectedStrings)}else alert(n.messageNoSelectedStrings)},l=function(){n.selectedStrings=[],e("#selection-solmistrings .sum span").text(n.selectedStrings.length)};return{countBasicGo:i,randomize:function(t){var i=this;console.log("randomize currentField: ",t);var s=parseInt(e(t).parent("form").find(".tone-min").val()),o=parseInt(e(t).parent("form").find(".tone-max").val());if(o<s)throw alert(n.messageMaxToneNotSmallerThanMin),new Error(n.messageMaxToneNotSmallerThanMin);n.randomRange=Array(s,o),n.currentRandomMode=e(t).parent("form").find("#random-modes").val();if(n.currentRandomMode==="withoutSoundKeys"){var u=e(t).parent("form").find(".sound-keys").val();n.setSoundKeyCurrent(u)}else i.randomizeSoundKeys();n.numberOfNotesInStaffCurrent=parseInt(e(t).parent("form").find(".number-of-notes-in-staff").val()),n.maxDeviationFromFirstSound=parseInt(e(t).parent("form").find(".max-deviation-from-first-sound").val());var a=i.randomizeToneNumbers(s,o),f=r.create(a);return f},randomizeToneNumbers:function(t,r){var i=new Array,o=n.randomRange[1]-n.randomRange[0]+1,u=e("#random #syllableOfFirstTone").val();for(var a=0;a<n.numberOfNotesInStaffCurrent;a++){var f=0;a===0&&u!=="-"&&(f=s(u));while(f===0){var l=Math.floor(Math.random()*o+n.randomRange[0]);n.noIU===!1?f=l:n.frequencies[l].soundKey[n.soundKeyCurrent.mm][n.soundKeyCurrent.position].activeHalf===""&&(f=l)}a===0&&n.maxDeviationFromFirstSound>0&&(n.randomRange=[Math.max(n.randomRange[0],f-n.maxDeviationFromFirstSound),Math.min(n.randomRange[1],f+n.maxDeviationFromFirstSound)],o=n.randomRange[1]-n.randomRange[0]+1),i.push(f)}return i},randomizeSoundKeys:function(){var e=new Array;if(n.currentRandomMode==="withSoundKeysMajor")for(var t in n.soundKeys.major)e.push(t);else if(n.currentRandomMode==="withSoundKeysMinor")for(var t in n.soundKeys.minor)e.push(t);var r=e[Math.floor(Math.random()*e.length)];n.setSoundKeyCurrent(r)},resetBasicGo:o,selectionAdd:u,selectionGo:a,selectionRemove:f,selectionReset:l}}),define("models/playCommon",["jquery","underscore","solmiBasics","helpers/helpers","models/playSound","models/playStaff","models/randomize"],function(e,t,n,r,i,s,o){return{changeScalesCurrent:function(t){e("#all-squares .squares-3x3").removeClass("scale-pos-"+n.scalesCurrent.join(" scale-pos-"));var r=n.scalesCurrent[0]-t;r>0?n.scalesCurrent=[t+2,t+1,t]:n.scalesCurrent=[t,t-1,t-2],e("#all-squares .squares-3x3").each(function(t){e(this).addClass("scale-pos-"+n.scalesCurrent[t])})},getToneDataThroughValidation:function(t,r,i,s,o){var u="",a=r,f=0,l=0;if(!e.isEmptyObject(s)){var c=jQuery.inArray(s[0],n.basicTones);if(c===-1)return alert(n.messageNotValid+t[i]+" (10)"),!1;if(s.length>1)if(s[1]===",")f+=1;else if(s[1]==="'")l+=1;else if(s[1]==="u")u="u";else{if(s[1]!=="i")return alert(n.messageNotValid+t[i]+" (20)"),!1;u="i"}if(s.length>2)for(var h=2;h<s.length;h++)if(s[h]===","&&l===0)f+=1;else{if(s[h]!=="'"||f!==0)return alert(n.messageNotValid+t[i]+" (30)"),!1;l+=1}if(o[1]&&!n.noteLengths[parseFloat(o[1])])return alert(n.messageToneLengthNotExist+o[1]),!1;if(f>0){if(f>n.scalesLimit[r].sub)return alert(n.messageNotValid+t[i]+" (50)"),!1;a-=f}else if(l>0){if(l>n.scalesLimit[r]["super"])return alert(n.messageNotValid+t[i]+" (60)"),!1;a+=l}var p='{"scale":'+a+',"half":"'+u+'"'+',"marksBottom":'+f+',"marksTop":'+l+"}";return JSON.parse(p)}return alert(n.messageNotValid+t[i]+" (40)"),!1},play:function(){n.startTimeOfPlay=Date.now(),i.playSound(0),this.playSolmiString(0)},playSolmiString:function(t){var r=this;e("#all-squares .row div").css({"background-image":"none"});var o=n.playData.notes[t];e.inArray(o.scale,n.scalesCurrent)<0&&r.changeScalesCurrent(o.scale);var u=e(".scale-pos-"+o.scale+" .row:nth-child("+o["position-square-in-scale"][0]+") div:nth-child("+o["position-square-in-scale"][1]+")");u.css({"background-image":"url('"+n.bPath+"images/redDot2.png')","background-position":n.positionInSquare[o.half]});var a=n.playData.notes[t].length*n.baseToneLength;s.playStaff(t),t>0&&i.playSound(t),n.currentTimeOfPlay+=a;var f=Date.now(),l=n.startTimeOfPlay+n.currentTimeOfPlay-f;l<0&&console.log("playSolmiString, !: waitTime < 0"),r.waitTimeDiffSum+=a-l;var c=f-n.startTimeOfPlay,h=n.currentTimeOfPlay-c;r.timePassedBefore=c,t<n.playData["notes-length"]-1?setTimeout(function(){r.playSolmiString(t+1)},h):(n.currentTimeOfPlay=0,n.remainingNumberOfPlaying-=1,n.remainingNumberOfPlaying>0?setTimeout(function(){r.play()},h):n.remainingNumberOfPlaying=n.currentNumberOfPlaying)},waitTimeDiffSum:0,timePassedBefore:0,prepareForPlay:function(t,r){console.log("playCommon.js prepareForPlay currentField",t),n.samples=[],e("#message-staff, .notes-string, .frequencies-string").empty();var i=!1;switch(r){case"standard":var u=e(t).parents("form").find(".sound-keys").val(),a=e(t).parents("form").find('input[type="text"]').val();i=parseInt(e(t).parents("form").find(".scales").val());break;case"random":l=o.randomize(t),i=n.centralViewScaleForStart;break;case"repeat":var u=e(".used-string .sound-key").text(),a=e(".used-string .solmistring").text();i=parseInt(e(".used-string .scale").text());break;case"selection-go":var f=o.selectionGo();if(f){var u=f.soundKey,a=f.solmistring;i=f.scale;break}return;default:alert(n.messageModeNotValid)}if(r==="standard"||r==="repeat"||r==="selection-go"){n.setSoundKeyCurrent(u);var l=a.split("-")}n.notesInStaff=e.extend(!0,{},n.notesInStaffStart),e("#staff img.sign").remove(),e(".used-string").empty();var c='<input class="repeat" type="button" value="Repeat" name="repeat">';c+='<span class="solmistring">'+l.join("-")+"</span>",c+=' (used string), <span class="sound-key">'+n.soundKeyCurrent.key+"</span> "+n.soundKeyCurrent.mm+', scale <span class="scale">'+i+"</span>",e(".used-string").append(c),s.createKeySignature(),console.log("solmiArray: "+l),this.prepareForPlaySolmiString(l,i,0);var h="",p="";for(var d=0;d<l.length;d++){var v=n.playData.notes[d]["frequency-nr"];h+=Math.round(n.toneFrequencies[v])+"-",v>=n.staffRange[0]&&v<=n.staffRange[1]?p+=n.notesNrAndName[v]:p+="x",p+="-"}e(".frequencies-string").append(h+" (frequencies)"),e(".notes-string").append(p+" (notes)"),console.log("prepareForPlay playData: ",n.playData),console.log("prepareForPlay soundKeyCurrent: ",n.soundKeyCurrent),console.log("prepareForPlay currentNumberOfPlaying: ",n.currentNumberOfPlaying),this.play()},prepareForPlaySolmiString:function(t,o,u){n.playData.notes[u]={};var a=t[u].split("|");n.playData.notes[u].length=1,a[1]&&(n.playData.notes[u].length=parseFloat(a[1]));var f=a[0].split(""),l=this.getToneDataThroughValidation(t,o,u,f,a);if(l===!1)return!1;var c=l.scale,h=l.half;console.log("scalesCurrent: ",n.scalesCurrent),u===0&&e.inArray(c,n.scalesCurrent)<0&&(n.scalesCurrent=r.setScalesCurrent(n.scaleRange,n.centralViewScale,n.scalesCurrent)),n.playData.notes[u].scale=c;var p=n.tonePositions[f[0]];n.playData.notes[u]["position-square-in-scale"]=p,console.log("prepareForPlaySolmiString tone: ",p),h===""?n.playData.notes[u].half="n":n.playData.notes[u].half=h,i.prepareForPlaySound(f,c,h,u,a),n.notesInStaff["continue"]===!0&&s.prepareForPlayStaff(u,t),console.log("prepareForPlaySolmiString solmiArray.length: ",t.length),console.log("prepareForPlaySolmiString position: ",u),u<t.length-1?this.prepareForPlaySolmiString(t,o,u+1):n.playData["notes-length"]=t.length}}}),define("models/frequenciesTuner",["jquery","underscore"],function(e,t){function s(){function e(e,t,n){return e*(t/(n*2))}this.extractHigherValueFrequency=function(t,n,r){var i=0,s=0,o=t.length;for(var u=0;u<o;u++){var a=e(u,r,n);t[u]>i&&(i=t[u],s=a)}return s}}function o(){that=this,window.AudioContext=window.AudioContext||window.webkitAudioContext,navigator.getMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;var t=new AudioContext,r=function(i){var s=t.createMediaStreamSource(i),o=new u(s,t.destination,t);o.start(function(t){that.tunerShowData===!0&&t!==0&&t!==64&&t!==75&&t!==n&&e("#frequencies-string2").append("-"+t),n=t})},i=function(t){console.log(t)};navigator.getMedia({audio:!0},r,i)}function u(e,t,n,r,i){this.sourceNode=e,this.destinationNode=t,this.audioContext=n,this.frequenciesExtractor=r||new s,this.count=0,this.start=function(e){var t=this.audioContext.createAnalyser();t.fftSize=2048,this.sourceNode.connect(t);var n=this.audioContext.createScriptProcessor(!1,1,1);t.connect(n);var r=new Uint8Array(t.frequencyBinCount),i=this;n.onaudioprocess=window.audioProcess=function(){t.getByteFrequencyData(r);var n=i.frequenciesExtractor.extractHigherValueFrequency(r,t.fftSize,i.audioContext.sampleRate),s=Math.floor(n);e(s)},n.connect(this.destinationNode)}}var n=0,r=!1,i=!0;return{frequencyBefore:n,tunerActive:r,tunerShowData:i,startTuner:o}}),define("views/forms",["jquery","underscore","solmiBasics"],function(e,t,n){function i(){var e='<form class="frequencies">';return e+='<input type="submit" class="start" value="Start">',e+='<input type="submit" class="stop" value="Stop">',e+='<input type="submit" class="reset" value="Reset">',e+="</form>",e}function s(){var e='<select name="sound-keys" class="sound-keys">/n',t=new Array("major","minor");for(var r=0;r<t.length;r++)for(var i in n.soundKeys[t[r]])e+='<option value="'+i+'">'+i+"</option>";return e+="</select>",e}var r=s();return{baseScaleSelectField:function(e){var t='<select name="scales" class="scales">/n';for(var r=n.scaleRange[1];r>=n.scaleRange[0];r--){var i="";r===e.base_scale&&(i=" selected"),t+='<option value="'+r+'"'+i+">"+r+"</option>"}return t+="</select>",t},frequenciesForm:i(),randomForm:function(){var e='<form id="random">';return e+="<strong>Random:</strong><br>",e+=this.selectFieldForRandomMode()+"<br>",e+=this.selectFormWithToneNames("min",0),e+=this.selectFormWithToneNames("max",1),e+="<br>sound key:"+this.soundKeySelect+"\n",e+=this.selectFieldForNumberOfNotesInStaff()+"<br>",e+='<input class="noIU" type="checkbox"> no i or u in solmization string<br>',e+=this.selectFieldForFirstStringItem()+"<br>",e+=this.selectFieldForMaxDeviationFromFirstSound()+"<br>",e+='<input class="basic-go" type="button" value="Go" name="go">',e+='<input class="repeat" type="button" value="Repeat" name="repeat">',e+='<span class="basic-sum">(<span>'+n.randomBasicGoCount+"</span>)</span>",e+='<input class="basic-reset" type="button" value="Reset" name="basic-reset">',e+='<section id="selection-solmistrings">',e+='Selected strings <span class="sum">(<span>'+n.selectedStrings.length+"</span>)</span>:<br>",e+='<input class="go" type="button" value="Go" name="go">',e+='<input class="repeat" type="button" value="Repeat" name="repeat">',e+='<input class="add" type="button" value="Add" name="add">',e+='<input class="remove" type="button" value="Remove" name="remove">',e+='<input class="reset" type="button" value="Reset" name="reset">',e+="</section>",e+="</form>",e},selectFieldForCentralViewScale:function(){var e='Central view scale: <select name="central-view-scale" id="central-view-scale">/n';for(var t=n.scaleRange[1]-1;t>=n.scaleRange[0]+1;t--){var r="";t===n.centralViewScale&&(r=" selected"),e+='<option value="'+t+'"'+r+">"+t+"</option>"}return e+="</select>",e},selectFieldForFirstStringItem:function(){var e='Syllable of first tone: <select name="syllableOfFirstTone" id="syllableOfFirstTone">/n';e+='<option value="-" selected>-</option>';for(var t=0;t<n.basicTones.length;t++)e+='<option value="'+n.basicTones[t]+'">'+n.basicTones[t]+"</option>";return e+="</select>",e},selectFieldForInstruments:function(){var e='<br>Instrument: <select name="instruments" id="instruments">/n';for(var t=0;t<n.instruments.length;t++){var r="";n.instruments[t]===n.currentInstrument&&(r=" selected"),e+='<option value="'+n.instruments[t]+'"'+r+">"+n.instruments[t]+"</option>"}return e+="</select>",e},selectFieldForNumberOfNotesInStaff:function(){var e='number of notes: <select name="number-of-notes-in-staff" class="number-of-notes-in-staff">/n';for(var t=n.rangeOfNumberOfNotesInStaff[0];t<=n.rangeOfNumberOfNotesInStaff[1];t++){var r="";t===n.numberOfNotesInStaffCurrent&&(r=" selected"),e+='<option value="'+t+'"'+r+">"+t+"</option>"}return e+="</select>",e},selectFieldForMaxDeviationFromFirstSound:function(){var e='Max. deviation from 1st sound: <select name="max-deviation-from-first-sound" class="max-deviation-from-first-sound">/n',t="";0===n.maxDeviationFromFirstSound&&(t=" selected"),e+='<option value="0"'+t+">-</option>";for(var r=1;r<=24;r++)t="",r===n.maxDeviationFromFirstSound&&(t=" selected"),e+='<option value="'+r+'"'+t+">"+r+"</option>";return e+="</select>",e},selectFieldForRandomMode:function(){var e={withSoundKeysMajor:"with major random sound keys",withSoundKeysMinor:"with minor random sound keys",withoutSoundKeys:"without random sound keys"},t='mode: <select name="random-modes" id="random-modes">/n';for(var r in e){var i="";r===n.currentRandomMode&&(i=" selected"),t+='<option value="'+r+'"'+i+">"+e[r]+"</option>"}return t+="</select>",t},selectFieldForRepetition:function(){var e='<br>How often play: <select name="repetition" id="repetition">/n',t=[1,2,3,5,10];for(var r=0;r<t.length;r++){var i="";t[r]===n.currentNumberOfPlaying&&(i=" selected"),e+='<option value="'+t[r]+'"'+i+">"+t[r]+"</option>"}return e+="</select>",e},selectFormWithToneNames:function(e,t){var r=e+': <select name="'+e+'" class="tone-'+e+'">'+"/n";for(var i=n.staffRange[1];i>n.staffRange[0];i--){var s="";i===n.randomRange[t]&&(s=" selected"),r+='<option value="'+i+'"'+s+">"+n.notesNrAndName[i]+"</option>"}return r+="</select>",r},soundKeySelect:r}}),define("views/additional",["jquery","underscore","solmiBasics"],function(e,t,n){return{inputBaseToneLength:function(){return'<br>Base tone length: <input id="base-tone-length" type="text" value="'+n.baseToneLength+'">'}}}),define("solmiMain",["jquery","underscore","solmiBasics","helpers/helpers","models/angularTrials","models/playCommon","models/randomize","models/frequenciesTuner","views/forms","views/additional"],function(e,t,n,r,i,s,o,u,a,f){e("#solmi-config").append(a.selectFieldForCentralViewScale()),e("#solmi-config").append(a.selectFieldForInstruments()),e("#solmi-config").append(a.selectFieldForRepetition()),e("#solmi-config").append(f.inputBaseToneLength()),e("#solmi-config").append(a.randomForm());for(var l=1;l<=2;l++)e(".squares-3x3 .row:nth-child("+l+") div:first-child").css({visibility:"hidden"});return e("#solmi-strings form input").keypress(function(e){e.which===13&&e.preventDefault()}),e(".noIU").click(function(){n.noIU===!1?n.noIU=!0:n.noIU=!1}),e("#solmi-strings form .go").click(function(){console.log("scalesCurrent after click go: ",n.scalesCurrent),s.prepareForPlay(this,"standard")}),e("body").on("click",".repeat",function(){console.log("scalesCurrent after click repeat: ",n.scalesCurrent);var t=e(".used-string").text();t&&s.prepareForPlay(this,"repeat")}),e("form#random .basic-go").click(function(){console.log("scalesCurrent after click form#random: ",n.scalesCurrent),o.countBasicGo(),s.prepareForPlay(this,"random")}),e("form#random .basic-reset").click(function(){o.resetBasicGo()}),e("#selection-solmistrings .go").click(function(){s.prepareForPlay(this,"selection-go")}),e("#selection-solmistrings .add").click(function(){o.selectionAdd()}),e("#selection-solmistrings .remove").click(function(){o.selectionRemove()}),e("#selection-solmistrings .reset").click(function(){o.selectionReset()}),e("#central-view-scale").change(function(){e("#all-squares .row div").css({"background-image":"none"}),n.centralViewScale=parseInt(e(this).val()),n.scalesCurrent=r.setScalesCurrent(n.scaleRange,n.centralViewScale,n.scalesCurrent)}),e("#instruments").change(function(){n.currentInstrument=e(this).val()}),e("#repetition").change(function(){n.remainingNumberOfPlaying=n.currentNumberOfPlaying=parseInt(e(this).val())}),e("#base-tone-length").change(function(){n.baseToneLength=parseInt(e(this).val())}),e(".sound-keys").change(function(){var t=e(this).val();n.setSoundKeyCurrent(t)}),e("#frequencies-string2").after(a.frequenciesForm),e("form.frequencies .start").click(function(){try{u.tunerActive===!1?(u.tunerActive=!0,u.startTuner()):u.tunerShowData=!0}catch(e){return console.error(e.message),!1}return!1}),e("form.frequencies .stop").click(function(){try{u.tunerShowData=!1,console.log("solmiMain .stop frequenciesTuner",u)}catch(e){return console.error(e.message),!1}return!1}),e("form.frequencies .reset").click(function(){try{e("#frequencies-string2").empty()}catch(t){return console.error(t.message),!1}return!1}),{}}),define("solmi",["solmiBasics","solmiMain","models/angularTrials"],function(e,t){return console.log("solmi.js, solmiBasics",e),{}}),require.config({paths:{jquery:["http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min","libs/jquery/jquery-1.11.2.min"],underscore:"libs/underscore/underscore-min-1.7.0",angular:["libs/angular/angular"],audiosynth:"libs/audiosynth/audiosynth"},shim:{audiosynth:{},underscore:{exports:"_"},angular:{exports:"angular"}}}),require(["infrastructure"],function(){require(["solmi"],function(e){})}),define("config",function(){});