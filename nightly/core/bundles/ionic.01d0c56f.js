Ionic.loadComponents("01d0c56f",function(t,e,o){var i=function(){function t(){}return t.prototype.changed=function(t){o.emit(this,"ionChange",{detail:{checked:t}})},t.prototype.canStart=function(){return!this.disabled},t.prototype.onDragStart=function(t){this.startX=t.startX,this.fireFocus()},t.prototype.onDragMove=function(t){this.checked?t.currentX+15<this.startX&&(this.checked=!1,this.activated=!0,this.startX=t.currentX):t.currentX-15>this.startX&&(this.checked=!0,this.activated=t.currentX<this.startX+5,this.startX=t.currentX)},t.prototype.onDragEnd=function(t){this.checked?t.startX+4>t.currentX&&(this.checked=!1):t.startX-4<t.currentX&&(this.checked=!0),this.activated=!1,this.fireBlur(),this.startX=null},t.prototype.onSpace=function(t){this.toggle(),t.stopPropagation(),t.preventDefault()},t.prototype.toggle=function(){this.disabled||(this.checked=!this.checked,this.fireFocus())},t.prototype.fireFocus=function(){this.hasFocus||(this.hasFocus=!0,o.emit(this,"ionFocus"))},t.prototype.fireBlur=function(){this.hasFocus&&(this.hasFocus=!1,o.emit(this,"ionBlur"))},t.prototype.render=function(){return e(this,e("ion-gesture",o.theme(this,"toggle",{class:{"toggle-activated":this.activated,"toggle-checked":this.checked,"toggle-disabled":this.disabled},props:{canStart:this.canStart.bind(this),onStart:this.onDragStart.bind(this),onMove:this.onDragMove.bind(this),onEnd:this.onDragEnd.bind(this),onPress:this.toggle.bind(this),gestureName:"toggle",gesturePriority:30,type:"pan,press",direction:"x",threshold:20,listenOn:"parent"}}),[e("div.toggle-icon",e("div.toggle-inner")),e("div.toggle-cover",{attrs:{id:this.id,"aria-checked":!!this.checked&&"true","aria-disabled":!!this.disabled&&"true","aria-labelledby":this.labelId,role:"checkbox",tabindex:0}})]))},t}();t.Toggle=i},["ion-toggle","Toggle",[["onSpace","keydown.space",0,0,1]],[["checked","changed"]],1,3,":host{display:inline-block;visibility:inherit!important;contain:content}.toggle-cover{position:absolute;top:0;left:0;width:100%;height:100%;border:0;background:0 0;font-family:inherit;font-style:inherit;font-variant:inherit;line-height:1;text-transform:none;cursor:pointer;outline:0}.toggle-wp{position:relative;width:40px;height:18px;box-sizing:content-box;contain:strict}.toggle-wp .toggle-icon{position:relative;display:block;width:100%;height:100%;border:2px solid #323232;border-radius:18px;background-color:transparent;pointer-events:none;contain:strict}.toggle-wp .toggle-inner{position:absolute;top:2px;left:2px;width:10px;height:10px;border-radius:50%;background-color:#323232;transition-duration:.3s;transition-property:transform,background-color;will-change:transform,background-color}.toggle-wp.toggle-checked .toggle-icon{border-color:#327eff;background-color:#327eff}.toggle-wp.toggle-checked .toggle-inner{background-color:#fff;transform:translate3d(22px,0,0)}.item-wp.item-toggle-disabled ion-label,.toggle-wp.toggle-disabled{opacity:.3;pointer-events:none}.toggle-wp.toggle-disabled ion-radio{opacity:.3}.item-wp .toggle-wp{margin:0;padding:12px 8px 12px 16px;cursor:pointer}.item-wp .toggle-wp[item-left]{padding:12px 18px 12px 2px}.item-wp.item-toggle ion-label{margin-left:0}.toggle-wp-primary.toggle-checked .toggle-icon{border-color:#327eff;background-color:#327eff}.toggle-wp-primary.toggle-checked .toggle-inner{background-color:#fff}.toggle-wp-secondary.toggle-checked .toggle-icon{border-color:#32db64;background-color:#32db64}.toggle-wp-secondary.toggle-checked .toggle-inner{background-color:#fff}.toggle-wp-danger.toggle-checked .toggle-icon{border-color:#f53d3d;background-color:#f53d3d}.toggle-wp-danger.toggle-checked .toggle-inner{background-color:#fff}.toggle-wp-light.toggle-checked .toggle-icon{border-color:#f4f4f4;background-color:#f4f4f4}.toggle-wp-light.toggle-checked .toggle-inner{background-color:#000}.toggle-wp-dark.toggle-checked .toggle-icon{border-color:#222;background-color:#222}.toggle-wp-dark.toggle-checked .toggle-inner{background-color:#fff}"]);