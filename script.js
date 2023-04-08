function navigation(slider) {
  let wrapper, dots;

  // Create wrapper and dots markup
  function markup(remove) {
    wrapperMarkup(remove);
    dotMarkup(remove);
  }

  // Remove an element from the DOM
  function removeElement(elment) {
    elment.parentNode.removeChild(elment);
  }

  // Create a new <div> element with the specified class names
  function createDiv(className) {
    var div = document.createElement("div");
    var classNames = className.split(" ");
    classNames.forEach((name) => div.classList.add(name));
    return div;
  }

  // Create wrapper markup
  function wrapperMarkup(remove) {
    if (remove) {
      // Remove wrapper element from DOM
      var parent = wrapper.parentNode;
      while (wrapper.firstChild) {
        parent.insertBefore(wrapper.firstChild, wrapper);
      }
      removeElement(wrapper);
      return;
    }
    // Create wrapper element and append slider to it
    wrapper = createDiv("wrapper");
    slider.container.parentNode.appendChild(wrapper);
    wrapper.appendChild(slider.container);
  }

  // Create dots markup
  function dotMarkup(remove) {
    if (remove) {
      // Remove dots element from DOM
      removeElement(dots);
      return;
    }
    // Create dots wrapper and arrows, and append to wrapper
    var dots_wrapper = createDiv("dots_wrapper");
    var arrowLeft = createDiv("arrow arrow--left");
    arrowLeft.addEventListener("click", () => slider.prev());
    dots_wrapper.appendChild(arrowLeft);

    dots = createDiv("dots");
    slider.track.details.slides.forEach((_e, idx) => {
      var dot = createDiv("dot");
      dot.addEventListener("click", () => slider.moveToIdx(idx));
      dots.appendChild(dot);
    });

    dots_wrapper.appendChild(dots);

    var arrowRight = createDiv("arrow arrow--right");
    arrowRight.addEventListener("click", () => slider.next());
    dots_wrapper.appendChild(arrowRight);

    wrapper.appendChild(dots_wrapper);
  }

  // Update active classes for dots
  function updateClasses() {
    var slide = slider.track.details.rel;
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active");
    });
  }

  // Event listeners
  slider.on("created", () => {
    markup();
    updateClasses();
  });

  slider.on("optionsChanged", () => {
    markup(true);
    markup();
    updateClasses();
  });

  slider.on("slideChanged", () => {
    updateClasses();
  });

  slider.on("detailsChanged", (s) => {
    s.slides.forEach((element, idx) => {
      element.style.opacity = s.track.details.slides[idx].portion;
    });
  });

  slider.on("destroyed", () => {
    markup(true);
  });
}

var slider = new KeenSlider("#my-keen-slider", {
  loop: true,
  defaultAnimation: {
    duration: 2000,
  },
  renderMode: "custom",
}, [navigation]);

