import "./style.css";

{
  const $foto1 = document.querySelector(`.foto1`);
  const $foto2 = document.querySelector(`.foto2`);
  const $foto3 = document.querySelector(`.foto3`);
  let currentTheme = `Culinair`;
  let weetjesData;
  let photoCounter = 0;

  const showAnswers = data => {
    if (currentTheme === `Culinair`) {
      document.querySelector(`.answer1`).textContent = data.Culinair.answer1;
      document.querySelector(`.answer2`).textContent = data.Culinair.answer2;
      document.querySelector(`.answer3`).textContent = data.Culinair.answer3;
    } else if (currentTheme === `Actualiteit`) {
      document.querySelector(`.answer1`).textContent = data.Actualiteit.answer1;
      document.querySelector(`.answer2`).textContent = data.Actualiteit.answer2;
      document.querySelector(`.answer3`).textContent = data.Actualiteit.answer3;
    } else if (currentTheme === `Kunst`) {
      document.querySelector(`.answer1`).textContent = data.Kunst.answer1;
      document.querySelector(`.answer2`).textContent = data.Kunst.answer2;
      document.querySelector(`.answer3`).textContent = data.Kunst.answer3;
    } else if (currentTheme === `Toerisme`) {
      document.querySelector(`.answer1`).textContent = data.Toerisme.answer1;
      document.querySelector(`.answer2`).textContent = data.Toerisme.answer2;
      document.querySelector(`.answer3`).textContent = data.Toerisme.answer3;
    }
  };

  const changeTheme = newTheme => {
    currentTheme = newTheme;
    showAnswers(weetjesData);
  };

  const handleClickBtn = e => {
    const $clickedBtn = e.currentTarget;
    $clickedBtn.querySelector(`img`).src;

    if (!$clickedBtn.classList.contains(`envelop__btn-active`)) {
      // make previous btn unactive
      const $previousActiveBtn = document.querySelector(`.envelop__btn-active`);
      $previousActiveBtn.classList.remove(`envelop__btn-active`);
      $previousActiveBtn.querySelector(
        `img`
      ).src = `./assets/img/buttons/weetjes_unselected.png`;

      // make clicked btn active
      $clickedBtn.classList.add(`envelop__btn-active`);
      $clickedBtn.querySelector(
        `img`
      ).src = `./assets/img/buttons/weetjes_selected.png`;

      // change previous theme to active theme
      const newTheme = $clickedBtn.querySelector(`p`).textContent;
      changeTheme(newTheme);
    }
  };

  const handleClickLink = e => {
    // e.preventDefault();
    const $clickedLink = e.currentTarget;
    if ($clickedLink.classList.contains(`scroll_eurometropool`)) {
      document.querySelector(`.eurometropool`).scrollIntoView({
        behavior: `smooth`
      });
    } else if ($clickedLink.classList.contains(`scroll_connext`)) {
      document.querySelector(`.overconnext`).scrollIntoView({
        behavior: `smooth`
      });
    } else if ($clickedLink.classList.contains(`scroll_tracktrace`)) {
      document.querySelector(`.tracktrace`).scrollIntoView({
        behavior: `smooth`
      });
    } else if ($clickedLink.classList.contains(`scroll_map`)) {
      document.querySelector(`.map`).scrollIntoView({
        behavior: `smooth`
      });
    }
  };

  const handleHoverOverBtn = e => {
    const $hoveredBtn = e.currentTarget;
    $hoveredBtn.querySelector(
      `img`
    ).src = `./assets/img/buttons/weetjes_selected.png`;
  };

  const handleHoverOutBtn = e => {
    const $hoveredBtn = e.currentTarget;
    if (!$hoveredBtn.classList.contains(`envelop__btn-active`)) {
      $hoveredBtn.querySelector(
        `img`
      ).src = `./assets/img/buttons/weetjes_unselected.png`;
    }
  };

  const rotatePhotos = () => {
    if (photoCounter === 0) {
      $foto1.style.opacity = `0`;
      $foto2.style.opacity = `0`;
      $foto3.style.opacity = `1`;
      photoCounter += 1;
    } else if (photoCounter === 1) {
      $foto1.style.opacity = `1`;
      $foto2.style.opacity = `0`;
      $foto3.style.opacity = `0`;
      photoCounter += 1;
    } else if (photoCounter === 2) {
      $foto1.style.opacity = `0`;
      $foto2.style.opacity = `1`;
      $foto3.style.opacity = `0`;
      photoCounter += 1;
    } else if (photoCounter === 3) {
      $foto1.style.opacity = `0`;
      $foto2.style.opacity = `0`;
      $foto3.style.opacity = `1`;
      photoCounter = 1;
    }
  };

  // const initMap = () => {
  //   // locations
  //   // map zelf
  //   // locations markers
  // };

  const init = () => {
    setInterval(() => {
      rotatePhotos();
    }, 5000);

    //eventlisteners
    const $btns = document.querySelectorAll(`.envelop__btn`);
    $btns.forEach($btn => {
      $btn.addEventListener(`click`, handleClickBtn);
      $btn.addEventListener(`mouseover`, handleHoverOverBtn);
      $btn.addEventListener(`mouseout`, handleHoverOutBtn);
    });
    const $links = document.querySelectorAll(`a`);
    $links.forEach($link => {
      $link.addEventListener(`click`, handleClickLink);
    });

    // map initialiseren
    //initMap();

    //fetch weetjes data
    fetch(`./weetjes.json`)
      .then(r => r.json())
      .then(data => {
        showAnswers(data);
        weetjesData = data;
      });
  };

  init();
}
