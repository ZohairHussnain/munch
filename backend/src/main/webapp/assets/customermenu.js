document.querySelectorAll('.menu-card').forEach(card => {
  card.addEventListener('click', () => {
    const list = card.nextElementSibling;

    // Change only this card's list (don't hide others)
    if (list.style.display === 'block') {
      list.style.display = 'none';
    } else {
      list.style.display = 'block';
    }
  });
});

document.addEventListener("DOMContentLoaded", () => { 
  // Waits Until The Whole Page Is Fully Loaded

  const counters = document.querySelectorAll(".item-counter"); 
  // Selects All Counters On The Page

  counters.forEach(counter => {
    const minusBtn = counter.querySelector(".btn-minus"); 
    // Selects The Minus Button Inside The Counter

    const plusBtn = counter.querySelector(".btn-plus"); 
    // Selects The Plus Button Inside The Counter

    const countDisplay = counter.querySelector(".item-count"); 
    // Selects The Number Display Element

    let count = 0; 
    // Initializes Count Value To 0

    plusBtn.addEventListener("click", () => { 
      // When The Plus Button Is Clicked
      count++; 
      // Increase The Count By 1
      countDisplay.textContent = count; 
      // Update The Displayed Number
    });

    minusBtn.addEventListener("click", () => { 
      // When The Minus Button Is Clicked
      if (count > 0) // Only Decrease If Count Is Greater Than 0
        count--; 
      countDisplay.textContent = count; 
      // Update The Displayed Number
    });
  });
});
