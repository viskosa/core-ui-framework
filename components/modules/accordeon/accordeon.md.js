class AccordeonModule {
	constructor(wrapElement, linkClass, subClass, $public){

		this.wrapper = wrapElement;
		this.linkClass = linkClass;
		this.subClass = subClass;
		this.active = 'framework-accordeon-open';
		this.$public = $public;

		this.$public.helper('event').flyEvent('add', ['click'], [this.wrapper], this.generateAccordeon.bind(this))

	}

	generateAccordeon(event){

		event.stopPropagation();
		if(!event || !event.target || !event.target.classList.contains(this.linkClass)) return;



		let target = event.target,
			parent = target.parentNode,
			sub = parent.querySelector('.' + this.subClass),
			subStaticHeight = sub.getAttribute('data-static-width');

		if(!sub) return;

		this.transitionEvent = this.transitionEnd.bind(this, sub, subStaticHeight);

		let subHeight = sub.firstElementChild.clientHeight;
		
		if(target.classList.contains(this.active)){
			target.classList.remove(this.active);
			sub.style.cssText += "height: " + (subStaticHeight || subHeight) + "px";
			window.getComputedStyle(sub).height;
			sub.style.cssText += "height: " + 0 + "px";
		} else {
			target.classList.add(this.active);
			sub.style.cssText += "height: " + (subStaticHeight || subHeight) + "px";
			this.$public.helper('event').flyEvent('add', ['transitionend'], [sub], this.transitionEvent)
		}


	}
	transitionEnd(sub, subStaticHeight, event){
		if(event.propertyName == "height"){
			if(!subStaticHeight) {
				sub.style.cssText += "height: auto";
			}
			this.$public.helper('event').flyEvent('remove', ['transitionend'], [sub], this.transitionEvent)
		}
	}
}

export default AccordeonModule;