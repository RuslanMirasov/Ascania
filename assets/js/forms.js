const showErrors = true;
const labelsForFile = document.querySelectorAll('.label-for-file');
const inputsFile = document.querySelectorAll('.input-file');
const showPasswordButtons = document.querySelectorAll('[data-password-btn]');

const validationRegEx = [
  {
    type: 'tel',
    regex: /^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/,
    error: 'Не верный формат телефона!',
  },
  {
    type: 'email',
    regex: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    error: 'Не верный формат E-mail!',
  },
  {
    type: 'password',
    name: 'password',
    regex: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
    error: 'Не верный формат!',
  },
  {
    type: 'url',
    regex: /^(https?:\/\/)?([\w.-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,
    error: 'Не верный формат URL',
  },
  {
    type: 'checkbox',
    error: 'Это обязательное поле!',
  },
  {
    type: 'radio',
    error: 'Выберите вариант!',
  },
  {
    type: 'file',
    error: 'Фото не выбрано!',
  },
  {
    name: 'name',
    regex: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s\-]+$/,
    error: 'Цифры и спец. символы запрещены!',
  },
];

const validateInput = input => {
  if (!input.required) return;

  const validationError = error => {
    addErrorHTML(error, input);
    return false;
  };

  const { name, value, checked, type, files } = input;

  if (type === 'file') {
    const errorEl = input.closest('.label-for-file').querySelector('.label__text');
    const file = files[0];
    const maxSize = 3 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];
    if (!file) {
      errorEl.innerHTML = `<span class="error">Фото не выбрано!</span>`;
      return false;
    }
    if (!allowedTypes.includes(file.type)) {
      errorEl.innerHTML = `<span class="error">Не верный формат файла!</span>`;
      return false;
    }
    if (file.size > maxSize) {
      resetFile(input.closest('.label-for-file'));
      errorEl.innerHTML = `<span class="error">Файл больше 3MB!</span>`;
      return false;
    }
  }

  if ((type === 'checkbox' || type === 'radio') && !checked) {
    return validationError(validationRegEx.find(rule => rule.type === type).error);
  }

  if (!value || value === '') {
    return validationError('Это обязательное поле!');
  }

  const typeValidation = validationRegEx.find(v => v.type === type);

  if (typeValidation) {
    const regex = new RegExp(typeValidation.regex);

    if (!regex.test(value.trim())) {
      return validationError(typeValidation.error);
    }
  }

  const nameValidation = validationRegEx.find(v => v.name === name);

  if (nameValidation) {
    const regex = new RegExp(nameValidation.regex);

    if (!regex.test(value.trim())) {
      return validationError(nameValidation.error);
    }
  }

  removeErrorHTML(input);
  return true;
};

const validateForm = form => {
  if (!form) return;
  let errorsCount = 0;

  const inputs = form.querySelectorAll('[required]');
  if (inputs.length === 0) return;

  inputs.forEach(input => {
    const isInputValid = validateInput(input);
    errorsCount = isInputValid ? errorsCount : errorsCount + 1;
  });

  return errorsCount <= 0;
};

const addErrorHTML = (error, input) => {
  if (!input) return;

  const label = input.closest('label');
  const existingError = label?.querySelector('.inputError');

  if (error) {
    input.classList.add('invalid');

    if (existingError) {
      existingError.innerHtml = error;
      return;
    }

    if (showErrors) {
      label.insertAdjacentHTML('beforeend', `<span class="inputError"><span>${error}</span></span>`);
      const newError = label.querySelector('.inputError');
      newError.style.height = newError.scrollHeight + 'px';
    }
    return;
  }

  if (existingError) existingError.remove();
  input.classList.remove('invalid');
};

const removeErrorHTML = input => {
  if (!input) return;

  const label = input.closest('label');
  const error = label?.querySelector('.inputError');
  input.classList.remove('invalid');
  if (error) {
    error.style.height = '0px';
    setTimeout(() => {
      error.remove();
    }, 300);
  }
};

const onRequiredInputFocus = e => {
  const input = e.target;
  removeErrorHTML(input);
};

const setSelectPlaceholderClass = input => {
  if (input.value === '') {
    input.classList.add('placeholder');
  } else {
    input.classList.remove('placeholder');
  }
};

document.addEventListener('focusin', e => {
  if (e.target.matches('[required]')) {
    onRequiredInputFocus(e);
  }

  if (e.target.nodeName === 'SELECT') {
    // e.target.classList.add('open');
    e.target.classList.remove('placeholder');
  }
});

document.addEventListener('click', e => {
  if (e.target.nodeName === 'SELECT') {
    e.target.classList.toggle('open');
  }
});

document.addEventListener('blur', e => {
  if (e.target.nodeName === 'SELECT') {
    e.target.classList.remove('open');
  }
});

document.addEventListener('change', e => {
  if (e.target.nodeName === 'SELECT') {
    setTimeout(() => {
      e.target.classList.remove('open');
    }, 0);
  }

  if (e.target.type === 'checkbox') {
    validateInput(e.target);
  }
});

document.addEventListener(
  'blur',
  e => {
    if (e.target.nodeName === 'SELECT') {
      e.target.classList.remove('open');
      setSelectPlaceholderClass(e.target);
    }
  },
  true
);

// SUBMIT MIDDLEWARE
document.addEventListener(
  'submit',
  function (event) {
    const form = event.target;
    if (form.tagName.toLowerCase() !== 'form') return;

    const isValid = validateForm(form);
    if (!isValid) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true
);

const FLOAT_SELECTOR = 'input:not([type="checkbox"]):not([type="radio"]), textarea';

const refreshFloatState = el => {
  if (!el || !el.matches?.(FLOAT_SELECTOR)) return;
  const val = (el.value ?? '').trim();
  if (val) el.classList.add('has-value');
  else el.classList.remove('has-value');
};

// Инициализация (учтёт автозаполнение/предзаполненные значения)
const initFloatingLabels = () => {
  document.querySelectorAll(FLOAT_SELECTOR).forEach(refreshFloatState);

  // Иногда автозаполнение срабатывает после DOMContentLoaded
  setTimeout(() => {
    document.querySelectorAll(FLOAT_SELECTOR).forEach(refreshFloatState);
  }, 100);
};

document.addEventListener('DOMContentLoaded', initFloatingLabels);

// Делегирование: обновляем состояние на ввод/изменение/потерю фокуса
document.addEventListener('input', e => refreshFloatState(e.target));
document.addEventListener('change', e => refreshFloatState(e.target), true);
document.addEventListener('blur', e => refreshFloatState(e.target), true);
