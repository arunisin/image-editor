const fileInput = document.querySelector(".file-input"),
  previewImg = document.querySelector(".preview-img img"),
  filterOptions = document.querySelectorAll(".filter button"),
  rotateOptions = document.querySelectorAll(".rotate button"),
  filterName = document.querySelector(".filter-info .name"),
  filterValue = document.querySelector(".filter-info .value"),
  filterSlider = document.querySelector(".slider input"),
  resetFilterBtn = document.querySelector(".controls .reset-filter"),
  saveImgBtn = document.querySelector(".save-img"),
  chooseImgBtn = document.querySelector(".choose-img");
  

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0,defBrightness = 100, defSaturation = 100, defInversion = 0, defGrayscale = 0;

const applyFilters = () => {
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  previewImg.style.transform =`rotate(${rotate}deg) scale(${scaleX},${scaleY})`;
}

const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener('load', () => {
    document.querySelector('.container').classList.remove('disable');
    resetFilterBtn.click();
  })
};

filterOptions.forEach(option => {
  option.addEventListener('click', () => {
    document.querySelector('.filter .active').classList.remove('active');
    option.classList.add('active');
    filterName.innerText = option.innerText;
  
    if (option.id === 'brightness') {
      filterSlider.max = '200';
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    }
    else if (option.id === 'saturation') {
      filterSlider.max = '200';
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    }
    else if (option.id === 'inversion') {
      filterSlider.max = '100';
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    }
    else {
      filterSlider.max = '100';
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }

  });

});



const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector('.filter .active');

  if (selectedFilter.id === 'brightness') {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === 'saturation') {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === 'inversion') {
    inversion = filterSlider.value;
  }
  else {
    grayscale = filterSlider.value;
  }
  applyFilters();
}


let rotate = 0, scaleX=1, scaleY=1;

rotateOptions.forEach(option=> {
  option.addEventListener('click', () => {
    if (option.id === 'left') {
      rotate += 90;
    }
    else if (option.id === 'right') {
      rotate -= 90;
    }
    else if (option.id === 'vertical') {
      if (scaleX === 1) {
        scaleX = -1;
      }
      else { scaleX = 1 };
    }
    else if(option.id='horizontal') {
      if (scaleY === 1) {
        scaleY = -1;
      }
      else { scaleY = 1 };
    }
    applyFilters();
  })
  
})

const resetFilter = () => {
  brightness = 100, saturation = 100, inversion = 0, grayscale = 0, rotate = 0, scaleX = 1, scaleY = 1;
  filterOptions.forEach(option => {
    if (option.id === 'brightness') {
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    }
    else if (option.id === 'saturation') {
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    }
    else if (option.id === 'inversion') {
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    }
    else {
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
    
  });
  filterOptions[0].click();
  applyFilters();
};

// filterSlider.addEventListener('dblclick',=> {
  
// })

const saveImg = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;
  ctx.filter= `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
  ctx.scale(scaleX, scaleY);
  if (rotate != 0) {
    ctx.rotate(rotate * Math.PI / 180);
  };
  
  const link = document.createElement('a');
  link.download = 'image.jpg';
  link.href = canvas.toDataURL();
  link.click();
}



fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
filterSlider.addEventListener('click', updateFilter);
resetFilterBtn.addEventListener('click', resetFilter);
saveImgBtn.addEventListener('click', saveImg);
filterSlider.addEventListener('touchstart', updateFilter);
