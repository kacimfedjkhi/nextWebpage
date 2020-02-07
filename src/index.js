import "./style.css";

{
  let currentTheme = `Culinair`;
  let weetjesData;

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
    console.log(currentTheme);
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
    const $photoImg = document.querySelector(`.overconnext__foto`);
    const imgSrc = $photoImg.src;
    console.log(imgSrc);
  };

  const init = () => {
    rotatePhotos();
    const $btns = document.querySelectorAll(`.envelop__btn`);
    $btns.forEach($btn => {
      $btn.addEventListener(`click`, handleClickBtn);
      $btn.addEventListener(`mouseover`, handleHoverOverBtn);
      $btn.addEventListener(`mouseout`, handleHoverOutBtn);
    });
    // fetch weetjes
    fetch(`./weetjes.json`)
      .then(r => r.json())
      .then(data => {
        console.log(data);
        showAnswers(data);
        weetjesData = data;
      });
  };

  init();
}
