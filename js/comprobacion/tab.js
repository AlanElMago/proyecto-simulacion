const inputs = document.querySelectorAll('input');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');
const content1 = document.getElementById('content1');
const content2 = document.getElementById('content2');
const content3 = document.getElementById('content3');
const content4 = document.getElementById('content4');

let chose = 1;

export const changeOption = () => {
  chose == 1
    ? ((option1.classList.value = 'option option-active'),
      (content1.classList.value = 'content content-active'))
    : ((option1.classList.value = 'option'),
      (content1.classList.value = 'content '));

  chose == 2
    ? ((option2.classList.value = 'option option-active'),
      (content2.classList.value = 'content content-active'))
    : ((option2.classList.value = 'option'),
      (content2.classList.value = 'content '));

  chose == 3
    ? ((option3.classList.value = 'option option-active'),
      (content3.classList.value = 'content content-active'))
    : ((option3.classList.value = 'option'),
      (content3.classList.value = 'content '));

  chose == 4
    ? ((option4.classList.value = 'option option-active'),
      (content4.classList.value = 'content content-active'))
    : ((option4.classList.value = 'option'),
      (content4.classList.value = 'content '));
}

option1.addEventListener('click', () => {
  chose = 1;
  changeOption();
});

option2.addEventListener('click', () => {
  chose = 2;
  changeOption();
});

option3.addEventListener('click', () => {
  chose = 3;
  changeOption();
});

option4.addEventListener('click', () => {
  chose = 4;
  changeOption();
});

inputs.forEach((input) => {
  input.addEventListener('focus', function () {
    const formGroup = this.closest('.form-group');
    if (formGroup) {
      formGroup.classList.add('focused');
    }
  });

  input.addEventListener('blur', function () {
    const inputValue = this.value;
    const formGroup = this.closest('.form-group');
    if (inputValue === '') {
      this.classList.remove('filled');
      if (formGroup) {
        formGroup.classList.remove('focused');
      }
    } else {
      this.classList.add('filled');
    }
  });
});
