!function(t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).gestrec=t()}(function(){return function t(e,n,r){function o(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var c=n[s]={exports:{}};e[s][0].call(c.exports,function(t){return o(e[s][1][t]||t)},c,c.exports,t,e,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(t,e){e.exports={Constants:t("./Constants"),Gesture:t("./Gesture"),GestureStore:t("./GestureStore"),Instance:t("./Instance"),InstanceLearner:t("./InstanceLearner"),Learner:t("./Learner"),OrientedBoundingBox:t("./OrientedBoundingBox"),Point:t("./Point"),Prediction:t("./Prediction"),Rect:t("./Rect"),Stroke:t("./Stroke"),Utils:t("./Utils")}},{"./Constants":2,"./Gesture":3,"./GestureStore":4,"./Instance":5,"./InstanceLearner":6,"./Learner":7,"./OrientedBoundingBox":8,"./Point":9,"./Prediction":10,"./Rect":11,"./Stroke":12,"./Utils":13}],2:[function(t,e){e.exports={SEQUENCE_INVARIANT:1,SEQUENCE_SENSITIVE:2,ORIENTATION_INVARIANT:1,ORIENTATION_SENSITIVE:2,ORIENTATION_SENSITIVE_4:4,ORIENTATION_SENSITIVE_8:8,SEQUENCE_SAMPLE_SIZE:16,PATCH_SAMPLE_SIZE:16,ORIENTATIONS:[0,Math.PI/4,Math.PI/2,3*Math.PI/4,Math.PI,-0,-Math.PI/4,-Math.PI/2,3*-Math.PI/4,-Math.PI]}},{}],3:[function(t,e){function n(t){if(this.mBoundingBox=new r,this.mGestureID=n.GESTURE_ID_BASE+ ++n.GESTURE_COUNT,this.mStrokes=[],t)for(var e=0;e<t.length;++e)this.addStroke(t[e])}var r=t("./Rect"),o=t("./Stroke");n.GESTURE_ID_BASE=Date.now(),n.GESTURE_COUNT=0,n.prototype.clone=function(){var t=new n;t.mBoundingBox.set(this.mBoundingBox.left,this.mBoundingBox.top,this.mBoundingBox.right,this.mBoundingBox.bottom);for(var e=this.mStrokes.length,r=0;e>r;++r){var o=this.mStrokes[r];t.mStrokes.push(o.clone())}return t},n.prototype.getStrokes=function(){return this.mStrokes},n.prototype.getStrokesCount=function(){return this.mStrokes.length},n.prototype.addStroke=function(t){this.mStrokes.push(t),this.mBoundingBox.union(t.boundingBox)},n.prototype.getLength=function(){for(var t=0,e=this.mStrokes,n=e.length,r=0;n>r;++r)t+=e[r].length;return t},n.prototype.getBoundingBox=function(){return this.mBoundingBox},n.prototype.setID=function(t){this.mGestureID=t},n.prototype.getID=function(){return this.mGestureID},n.prototype.toJSON=function(){for(var t=[],e=this.mStrokes.length,n=0;e>n;++n)t.push(this.mStrokes[n].toJSON());return t},n.fromJSON=function(t){for(var e=new n,r=0;r<t.length;++r)e.addStroke(o.fromJSON(t[r]));return e},e.exports=n},{"./Rect":11,"./Stroke":12}],4:[function(t,e){function n(){this.mSequenceType=r.SEQUENCE_SENSITIVE,this.mOrientationStyle=r.ORIENTATION_SENSITIVE_4,this.mClassifier=new s,this.mChanged=!1,this.mNamedGestures={}}var r=t("./Constants"),o=t("./Gesture"),i=t("./Instance"),s=t("./InstanceLearner");n.prototype.setOrientationStyle=function(t){this.mOrientationStyle=t},n.prototype.getOrientationStyle=function(){return this.mOrientationStyle},n.prototype.setSequenceType=function(t){this.mSequenceType=t},n.prototype.getSequenceType=function(){return this.mSequenceType},n.prototype.getGestureEntries=function(){var t=[];for(var e in this.mNamedGestures)t.push(e);return t},n.prototype.recognize=function(t){var e=i.createInstance(this.mSequenceType,this.mOrientationStyle,t,null);return this.mClassifier.classify(this.mSequenceType,this.mOrientationStyle,e.vector)},n.prototype.addGesture=function(t,e){var n;null!=t&&0!==t.length&&(null==(n=this.mNamedGestures[t])&&(n=[],this.mNamedGestures[t]=n),n.push(e),this.mClassifier.addInstance(i.createInstance(this.mSequenceType,this.mOrientationStyle,e,t)),this.mChanged=!0)},n.prototype.removeGesture=function(t,e){var n=this.mNamedGestures[t];if(null!=n){var r=n.indexOf(e);n.splice(r,1),0===n.length&&delete this.mNamedGestures[t],this.mClassifier.removeInstance(e.getID()),this.mChanged=!0}},n.prototype.removeEntry=function(t){delete this.mNamedGestures[t],this.mClassifier.removeInstances(t),this.mChanged=!0},n.prototype.getGestures=function(t){var e=this.mNamedGestures[t];return null!=e?e.slice():[]},n.prototype.hasChanged=function(){return this.mChanged},n.prototype.getLearner=function(){return this.mClassifier},n.prototype.toJSON=function(){var t={};for(var e in t.sequence=this.mSequenceType,t.orientation=this.mOrientationStyle,t.gestures={},this.mNamedGestures){var n=this.mNamedGestures[e];t.gestures[e]=n.map(function(t){return t.toJSON()})}return t},n.fromJSON=function(t){var e=new n;for(var r in e.setSequenceType(t.sequence),e.setOrientationStyle(t.orientation),t.gestures)t.gestures[r].forEach(function(t){e.addGesture(r,o.fromJSON(t))});return e},e.exports=n},{"./Constants":2,"./Gesture":3,"./Instance":5,"./InstanceLearner":6}],5:[function(t,e){function n(t,e,n){this.id=t,this.vector=e,this.label=n}var r=t("./Constants"),o=t("./Utils");n.prototype.normalize=function(){for(var t=this.vector,e=0,n=t.length,r=0;n>r;r++)e+=t[r]*t[r];var o=Math.sqrt(e);for(r=0;n>r;r++)t[r]/=o},n.createInstance=function(t,e,o,i){var s,a;return t===r.SEQUENCE_SENSITIVE?(s=n.temporalSampler(e,o),(a=new n(o.getID(),s,i)).normalize()):(s=n.spatialSampler(o),a=new n(o.getID(),s,i)),a},n.spatialSampler=function(t){return o.spatialSampling(t,r.PATCH_SAMPLE_SIZE,!1)},n.temporalSampler=function(t,e){var n=o.temporalSampling(e.getStrokes()[0],r.SEQUENCE_SAMPLE_SIZE),i=o.computeCentroid(n),s=Math.atan2(n[1]-i[1],n[0]-i[0]),a=-s;if(t!=r.ORIENTATION_INVARIANT)for(var u=r.ORIENTATIONS.length,h=0;u>h;h++){var c=r.ORIENTATIONS[h]-s;Math.abs(c)<Math.abs(a)&&(a=c)}return o.translate(n,-i[0],-i[1]),o.rotate(n,a),n},e.exports=n},{"./Constants":2,"./Utils":13}],6:[function(t,e){function n(){i.call(this)}var r=t("./Prediction"),o=t("./Constants"),i=t("./Learner"),s=t("./Utils");n.prototype=new i,n.compare=function(t,e){var n=t.score,r=e.score;return n>r?-1:r>n?1:0},n.prototype.classify=function(t,e,i){for(var a=[],u=this.getInstances(),h=u.length,c={},f=0;h>f;++f){var p,l,m=u[f];m.vector.length==i.length&&(l=0==(p=t==o.SEQUENCE_SENSITIVE?s.minimumCosineDistance(m.vector,i,e):s.squaredEuclideanDistance(m.vector,i))?Number.MAX_VALUE:1/p,(null==(S=c[m.label])||l>S)&&(c[m.label]=l))}for(var g in c){var S=c[g];a.push(new r(g,S))}return a.sort(n.compare)},e.exports=n},{"./Constants":2,"./Learner":7,"./Prediction":10,"./Utils":13}],7:[function(t,e){function n(){this.mInstances=[]}n.prototype.addInstance=function(t){this.mInstances.push(t)},n.prototype.getInstances=function(){return this.mInstances},n.prototype.removeInstance=function(t){instances=this.mInstances;for(var e=instances.length,n=0;e>n;n++)if(t===instances[n].id)return void instances.splice(n,1)},n.prototype.removeInstances=function(t){for(var e=[],n=this.mInstances,r=n.length,o=0;r>o;++o){var i=n[o];(null==i.label&&null==t||null!=i.label&&i.label===t)&&e.push(o)}for(o=e.length-1;o>=0;--o)n.splice(e[o],1)},n.prototype.classify=function(){},e.exports=n},{}],8:[function(t,e){e.exports=function(t,e,n,r,o){this.orientation=t,this.width=r,this.height=o,this.centerX=e,this.centerY=n;var i=r/o;this.squareness=i>1?1/i:i}},{}],9:[function(t,e){e.exports=function(t,e,n){if(t instanceof Object){var r=t;this.x=r.x,this.y=r.y,this.timestamp=r.t}else this.x=t,this.y=e,this.timestamp=n}},{}],10:[function(t,e){function n(t,e){this.name=t,this.score=e}n.prototype.toString=function(){return this.name},e.exports=n},{}],11:[function(t,e){function n(t,e,n,r){this.set(t,e,n,r)}n.prototype.clone=function(){return new n(this.left,this.top,this.right,this.bottom)},n.prototype.centerX=function(){return(this.left+this.right)/2},n.prototype.centerY=function(){return(this.top+this.bottom)/2},n.prototype.width=function(){return this.right-this.left},n.prototype.height=function(){return this.bottom-this.top},n.prototype.set=function(t,e,n,r){this.top=e,this.left=t,this.bottom=r,this.right=n},n.prototype.unionPoint=function(t,e){t<this.left&&(this.left=t),t>this.right&&(this.right=t),e<this.top&&(this.top=e),e>this.bottom&&(this.bottom=e)},n.prototype.union=function(t){t.left<this.left&&(this.left=t.left),t.right>this.right&&(this.right=t.right),t.top<this.top&&(this.top=t.top),t.bottom>this.bottom&&(this.bottom=t.bottom)},e.exports=n},{}],12:[function(t,e){function n(t){if(null!=t){for(var e=t.length,n=Array(2*e),o=Array(e),i=null,s=0,a=0,u=0;e>u;++u){var h=t[u];if(n[2*u]=h.x,n[2*u+1]=h.y,o[a]=h.timestamp,null==i)i=new r(h.x,h.y,h.x,h.y),s=0;else{var c=h.x-n[2*(u-1)],f=h.y-n[2*(u-1)+1];s+=Math.sqrt(c*c+f*f),i.unionPoint(h.x,h.y)}a++}this.timestamps=o,this.points=n,this.boundingBox=i,this.length=s}}var r=t("./Rect"),o=t("./Point");n.prototype.clone=function(){var t=new n;return t.boundingBox=this.boundingBox.clone(),t.length=this.length,t.points=this.points.slice(),t.timestamps=this.timestamps.slice(),t},n.prototype.toJSON=function(){for(var t=[],e=this.points.length,n=0;e>n;n+=2)t.push({x:this.points[n],y:this.points[n+1],t:this.timestamps[n>>1]});return t},n.fromJSON=function(t){for(var e=[],r=0;r<t.length;++r)e.push(new o(t[r]));return new n(e)},e.exports=n},{"./Point":9,"./Rect":11}],13:[function(t,e){var n=t("./OrientedBoundingBox"),r={SCALING_THRESHOLD:.26};r.NONUNIFORM_SCALE=Math.sqrt(2),r.zeroes=function(t){for(var e=Array(t),n=0;t>n;++n)e[n]=0;return e},r.spatialSampling=function(t,e,n){var o,i=e-1,s=r.zeroes(e*e),a=t.getBoundingBox(),u=a.width(),h=a.height(),c=i/u,f=i/h;if(n)c=o=f>c?c:f,f=o;else{var p=u/h;p>1&&(aspectRation=1/p),p<r.SCALING_THRESHOLD?(c=o=f>c?c:f,f=o):c>f?c>(o=f*r.NONUNIFORM_SCALE)&&(c=o):f>(o=c*r.NONUNIFORM_SCALE)&&(f=o)}for(var l,m,g,S=-a.centerX(),v=-a.centerY(),d=i/2,I=i/2,N=t.getStrokes(),y=N.length,E=0;y>E;E++){var M=N[E].points;l=M.length;for(var O=Array(l),x=0;l>x;x+=2)O[x]=(M[x]+S)*c+d,O[x+1]=(M[x+1]+v)*f+I;var T=-1,A=-1;for(x=0;l>x;x+=2){var C=O[x]<0?0:O[x],B=O[x+1]<0?0:O[x+1];if(C>i&&(C=i),B>i&&(B=i),r.plot(C,B,s,e),-1!=T){if(T>C){m=Math.ceil(C);for(var _=(A-B)/(T-C);T>m;)g=_*(m-C)+B,plot(m,g,s,e),m++}else if(C>T)for(m=Math.ceil(T),_=(A-B)/(T-C);C>m;)g=_*(m-C)+B,plot(m,g,s,e),m++;if(A>B){g=Math.ceil(B);for(var b=(T-C)/(A-B);A>g;)m=b*(g-B)+C,plot(m,g,s,e),g++}else if(B>A)for(g=Math.ceil(A),b=(T-C)/(A-B);B>g;)m=b*(g-B)+C,plot(m,g,s,e),g++}T=C,A=B}}return s},r.plot=function(t,e,n,r){t=0>t?0:t,e=0>e?0:e;var o=Math.floor(t),i=Math.ceil(t),s=Math.floor(e),a=Math.ceil(e);if(t===o&&e===s)n[u=a*r+i]<1&&(n[u]=1);else{var u,h=Math.pow(o-t,2),c=Math.pow(s-e,2),f=Math.pow(i-t,2),p=Math.pow(a-e,2),l=Math.sqrt(h+c),m=Math.sqrt(f+c),g=Math.sqrt(h+p),S=Math.sqrt(f+p),v=l+m+g+S,d=l/v;d>n[u=s*r+o]&&(n[u]=d),(d=m/v)>n[u=s*r+i]&&(n[u]=d),(d=g/v)>n[u=a*r+o]&&(n[u]=d),(d=S/v)>n[u=a*r+i]&&(n[u]=d)}},r.temporalSampling=function(t,e){var n=t.length/(e-1),r=2*e,o=Array(r),i=0,s=t.points,a=s[0],u=s[1],h=0,c=Number.MIN_VALUE,f=Number.MIN_VALUE;o[h]=a,o[++h]=u,h++;for(var p=0,l=s.length/2;l>p;){if(c==Number.MIN_VALUE){if(++p>=l)break;c=s[2*p],f=s[2*p+1]}var m=c-a,g=f-u,S=Math.sqrt(m*m+g*g);if(i+S>=n){var v=(n-i)/S,d=a+v*m,I=u+v*g;o[h]=d,o[++h]=I,h++,a=d,u=I,i=0}else a=c,u=f,c=Number.MIN_VALUE,f=Number.MIN_VALUE,i+=S}for(p=h;r>p;p+=2)o[p]=a,o[p+1]=u;return o},r.computeCentroid=function(t){for(var e=0,n=0,r=t.length,o=0;r>o;++o)e+=t[o],n+=t[++o];return[2*e/r,2*n/r]},r.computeCoVariance=function(t){for(var e=[[0,0],[0,0]],n=t.length,r=0;n>r;++r){var o=t[r],i=t[++r];e[0][0]+=o*o,e[0][1]+=o*i,e[1][0]=e[0][1],e[1][1]+=i*i}return e[0][0]/=n/2,e[0][1]/=n/2,e[1][0]/=n/2,e[1][1]/=n/2,e},r.computeTotalLength=function(t){for(var e=0,n=t.length-4,r=0;n>r;r+=2){var o=t[r+2]-t[r],i=t[r+3]-t[r+1];e+=Math.sqrt(o*o+i*i)}return e},r.computeStraightness=function(t){var e=r.computeTotalLength(t),n=t[2]-t[0],o=t[3]-t[1];return Math.sqrt(n*n+o*o)/e},r.computeStraightness=function(t,e){var n=t[2]-t[0],r=t[3]-t[1];return Math.sqrt(n*n+r*r)/e},r.squaredEuclideanDistance=function(t,e){for(var n=0,r=t.length,o=0;r>o;++o){var i=t[o]-e[o];n+=i*i}return n/r},r.cosineDistance=function(t,e){for(var n=0,r=t.length,o=0;r>o;++o)n+=t[o]*e[o];return Math.acos(n)},r.minimumCosineDistance=function(t,e,n){for(var r=t.length,o=0,i=0,s=0;r>s;s+=2)o+=t[s]*e[s]+t[s+1]*e[s+1],i+=t[s]*e[s+1]-t[s+1]*e[s];if(0!=o){var a=i/o,u=Math.atan(a);if(n>2&&Math.abs(u)>=Math.PI/n)return Math.acos(o);var h=Math.cos(u),c=h*a;return Math.acos(o*h+i*c)}return Math.PI/2},r.computeOrientedBoundingBoxPoints=function(t){for(var e=t.length,n=Array(2*e),o=0;e>o;o++){var i=t[o],s=2*o;n[s]=i.x,n[s+1]=i.y}var a=r.computeCentroid(n);return r.computeOrientedBoundingBoxFull(n,a)},r.computeOrientedBoundingBox=function(t){for(var e=t.length,n=Array(e),o=0;e>o;o++)n[o]=t[o];var i=r.computeCentroid(n);return r.computeOrientedBoundingBoxFull(n,i)},r.computeOrientedBoundingBoxFull=function(t,e){r.translate(t,-e[0],-e[1]);var o,i=r.computeCoVariance(t),s=r.computeOrientation(i);0==s[0]&&0==s[1]?o=-Math.PI/2:(o=Math.atan2(s[1],s[0]),r.rotate(t,-o));for(var a=Number.MAX_VALUE,u=Number.MAX_VALUE,h=Number.MIN_VALUE,c=Number.MIN_VALUE,f=t.length,p=0;f>p;p++)t[p]<a&&(a=t[p]),t[p]>h&&(h=t[p]),t[++p]<u&&(u=t[p]),t[p]>c&&(c=t[p]);return new n(180*o/Math.PI,e[0],e[1],h-a,c-u)},r.computeOrientation=function(t){var e=[0,0];(0==t[0][1]||0==t[1][0])&&(e[0]=1,e[1]=0);var n=-t[0][0]-t[1][1],r=t[0][0]*t[1][1]-t[0][1]*t[1][0],o=n/2,i=Math.sqrt(Math.pow(o,2)-r),s=-o+i,a=-o-i;if(s==a)e[0]=0,e[1]=0;else{var u=s>a?s:a;e[0]=1,e[1]=(u-t[0][0])/t[0][1]}return e},r.rotate=function(t,e){for(var n=Math.cos(e),r=Math.sin(e),o=t.length,i=0;o>i;i+=2){var s=t[i]*n-t[i+1]*r,a=t[i]*r+t[i+1]*n;t[i]=s,t[i+1]=a}return t},r.translate=function(t,e,n){for(var r=t.length,o=0;r>o;o+=2)t[o]+=e,t[o+1]+=n;return t},r.scale=function(t,e,n){for(var r=t.length,o=0;r>o;o+=2)t[o]*=e,t[o+1]*=n;return t},e.exports=r},{"./OrientedBoundingBox":8}]},{},[1])(1)});