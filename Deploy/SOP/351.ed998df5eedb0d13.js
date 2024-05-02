"use strict";(self.webpackChunkorp_front=self.webpackChunkorp_front||[]).push([[351],{5351:(be,T,l)=>{l.r(T),l.d(T,{LoginModule:()=>De});var M=l(6814),h=l(6223),$=l(9862),w=l(4828),r=l(5879),z=l(628),F=l(2939),_=l(9157),x=l(617),b=l(2032),D=l(2296);function G(n,o){if(1&n&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&n){const e=r.oxw();r.xp6(1),r.Oqu(e.getErrorMessage())}}function U(n,o){1&n&&(r.TgZ(0,"mat-error"),r._uU(1," Password is required "),r.qZA())}function W(n,o){1&n&&(r.TgZ(0,"mat-error"),r._uU(1," Password should be at least 8 characters long "),r.qZA())}const K=[{path:"login",component:(()=>{class n{constructor(e,t,a){this.authService=e,this.router=t,this.snackBar=a,this.hide=!0,this.email=new h.NI("",[h.kI.required,h.kI.email]),this.password=new h.NI("",[h.kI.required,h.kI.minLength(8)]),this.errorMessage="",this.loading=!1,this.loadingMessage="Sign In"}getErrorMessage(){return this.email.hasError("required")?"Email is required":this.email.hasError("email")?"Not a valid email":""}getPasswordErrorMessage(){return this.password.hasError("required")?"Password is required":this.password.hasError("minlength")?"Password should be at least 8 characters long":""}submit(){this.email.valid&&this.password.valid&&(this.loading=!0,this.loadingMessage="Signing in...",this.authService.login({userName:this.email.value,password:this.password.value}).subscribe(t=>{this.authService.setToken(t.token);const i=()=>{const s=this.authService.getUserType();s?(this.redirectUser(s),this.snackBar.open("Login successful!","Dismiss",{duration:2e3})):setTimeout(i,100)};i()},t=>{this.snackBar.open(t.error.message||"Login failed. Please try again.","Dismiss",{duration:2e3}),this.errorMessage=t.error.message||"",this.loading=!1,this.loadingMessage="Sign In"}))}redirectUser(e){"Admin"===e?this.router.navigate(["/dashboard"]):"Screen"===e&&this.router.navigate(["/screens"])}static#e=this.\u0275fac=function(t){return new(t||n)(r.Y36(z.e),r.Y36(w.F0),r.Y36(F.ux))};static#t=this.\u0275cmp=r.Xpm({type:n,selectors:[["app-login"]],decls:28,vars:11,consts:[[1,"container-fluid"],[1,"row","justify-content-center"],[1,"col-12","col-sm-10","col-md-6","col-lg-3"],[1,"form-container",3,"submit"],[1,"form-group"],[1,"text-center",2,"color","#3c3c3b"],["appearance","outline",1,"user"],["matPrefix",""],[1,"material-icons"],["matInput","","placeholder","","required","",3,"formControl"],[4,"ngIf"],["appearance","outline",1,"pw"],["matInput","",3,"type","formControl"],["mat-icon-button","","matPrefix","",3,"click"],["mat-raised-button","",1,"full-width-button",2,"background-color","#3c3c3b","color","whitesmoke",3,"disabled","click"]],template:function(t,a){1&t&&(r.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"form",3),r.NdJ("submit",function(){return a.submit()}),r.TgZ(4,"div",4)(5,"h2",5)(6,"b"),r._uU(7,"Sign In"),r.qZA()(),r.TgZ(8,"mat-form-field",6)(9,"mat-label"),r._uU(10,"Enter your Username"),r.qZA(),r.TgZ(11,"mat-icon",7)(12,"i",8),r._uU(13,"person"),r.qZA()(),r._UZ(14,"input",9),r.YNc(15,G,2,1,"mat-error",10),r.qZA()(),r.TgZ(16,"div",4)(17,"mat-form-field",11)(18,"mat-label"),r._uU(19,"Enter your password"),r.qZA(),r._UZ(20,"input",12),r.YNc(21,U,2,0,"mat-error",10),r.YNc(22,W,2,0,"mat-error",10),r.TgZ(23,"button",13),r.NdJ("click",function(){return a.hide=!a.hide}),r.TgZ(24,"mat-icon"),r._uU(25),r.qZA()()()(),r.TgZ(26,"button",14),r.NdJ("click",function(){return a.submit()}),r._uU(27),r.qZA()()()()()),2&t&&(r.xp6(14),r.Q6J("formControl",a.email),r.xp6(1),r.Q6J("ngIf",a.email.invalid),r.xp6(5),r.Q6J("type",a.hide?"password":"text")("formControl",a.password),r.xp6(1),r.Q6J("ngIf",a.password.hasError("required")),r.xp6(1),r.Q6J("ngIf",a.password.hasError("minlength")&&!a.password.hasError("required")),r.xp6(1),r.uIk("aria-label","Hide password")("aria-pressed",a.hide),r.xp6(2),r.Oqu(a.hide?"visibility_off":"visibility"),r.xp6(1),r.Q6J("disabled",a.loading),r.xp6(1),r.hij(" ",a.loadingMessage,""))},dependencies:[M.O5,_.KE,_.hX,_.TO,_.qo,x.Hw,b.Nt,D.lW,D.RK,h._Y,h.Fj,h.JJ,h.JL,h.Q7,h.oH,h.F],styles:[".form-container[_ngcontent-%COMP%]{position:relative;background-color:#fff;top:25vh;padding:15px;display:flex;flex-direction:column;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:#26394d 0 20px 30px -10px;border-radius:10px}.form-container[_ngcontent-%COMP%]:hover{box-shadow:#26394d 0 20px 30px -10px}.color-temp-bg[_ngcontent-%COMP%]{background-color:#e2e2e2;color:#fff}#admin[_ngcontent-%COMP%]{text-align:center}.user[_ngcontent-%COMP%], .pw[_ngcontent-%COMP%]{width:100%;display:block}.link[_ngcontent-%COMP%]{color:gray;text-decoration:none;margin-top:10px;size:5px;padding:2px}"]})}return n})()},{path:"",redirectTo:"login",pathMatch:"full"}];let P=(()=>{class n{static#e=this.\u0275fac=function(t){return new(t||n)};static#t=this.\u0275mod=r.oAB({type:n});static#a=this.\u0275inj=r.cJS({imports:[w.Bz.forChild(K),w.Bz]})}return n})();var O=l(5195),Y=l(1274),Q=l(4300),N=l(3651),Z=l(8484),q=l(799),u=l(3680),k=l(8645);l(7394),l(6028),l(2831),l(2495),l(6825);let te=(()=>{class n{constructor(){this.changes=new k.x,this.calendarLabel="Calendar",this.openCalendarLabel="Open calendar",this.closeCalendarLabel="Close calendar",this.prevMonthLabel="Previous month",this.nextMonthLabel="Next month",this.prevYearLabel="Previous year",this.nextYearLabel="Next year",this.prevMultiYearLabel="Previous 24 years",this.nextMultiYearLabel="Next 24 years",this.switchToMonthViewLabel="Choose date",this.switchToMultiYearViewLabel="Choose month and year",this.startDateLabel="Start date",this.endDateLabel="End date"}formatYearRange(e,t){return`${e} \u2013 ${t}`}formatYearRangeLabel(e,t){return`${e} to ${t}`}static#e=this.\u0275fac=function(t){return new(t||n)};static#t=this.\u0275prov=r.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();const he={provide:new r.OlP("mat-datepicker-scroll-strategy"),deps:[N.aV],useFactory:function ce(n){return()=>n.scrollStrategies.reposition()}};let fe=(()=>{class n{static#e=this.\u0275fac=function(t){return new(t||n)};static#t=this.\u0275mod=r.oAB({type:n});static#a=this.\u0275inj=r.cJS({providers:[te,he],imports:[M.ez,D.ot,N.U8,Q.rt,Z.eL,u.BQ,q.ZD]})}return n})(),De=(()=>{class n{static#e=this.\u0275fac=function(t){return new(t||n)};static#t=this.\u0275mod=r.oAB({type:n});static#a=this.\u0275inj=r.cJS({imports:[M.ez,P,_.lN,O.QW,x.Ps,b.c,Y.g0,D.ot,h.UX,h.u5,$.JF,fe,F.ZX,P,x.Ps,b.c,O.QW,_.lN,Y.g0,D.ot,h.u5,h.UX]})}return n})()}}]);