// textarea script
const textarea = document.querySelector('textarea');
textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
});

// animations for buttons
const button1 = document.querySelector('.save_file');
const button2 = document.querySelector('.open_file');

button1.addEventListener('click', () => {
  button1.classList.add('animate');

  setTimeout(() => {
    button1.classList.remove('animate');
  }, 3000);
});

button2.addEventListener('click', () => {
    button2.classList.add('animate');

    setTimeout(() => {
        button2.classList.remove('animate');
    }, 3000);
});

// button SAVE 
const saveButton = document.querySelector('.save_file');

saveButton.addEventListener('click', () => {
  const fileName = document.querySelector('#file_name').value;
  const fileComments = document.querySelector('#file_comments').value;
  const text = document.querySelector('#text').value;

  const data = `##${fileName}\n#${fileComments}\n@${text}`;

  const blob = new Blob([data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.txt`;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
});


// button open
document.querySelector('.open_file').addEventListener('click', function() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';

  // Когда пользователь выбирает файл
  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    // Когда файл прочитан
    reader.addEventListener('load', function(event) {
      const fileContent = event.target.result;

      // Поиск строк, начинающихся со специальных символов
      const nameMatch = fileContent.match(/^##(.*)$/m);
      const commentsMatch = fileContent.match(/^#(.*)$/m);
      const textMatch = fileContent.match(/^@(.*)$/m);

      // Обновление значений форм
      if (nameMatch) {
        document.querySelector('#file_name').value = nameMatch[1];
      }
      if (commentsMatch) {
        document.querySelector('#file_comments').value = commentsMatch[1];
      }
      if (textMatch) {
        document.querySelector('#text').value = textMatch[1];
      }
    });

    // Чтение файла в формате текста
    reader.readAsText(file);
  });

  // Отображение диалога выбора файла
  fileInput.click();
});

// function
window.addEventListener('beforeunload', function(e) {
  e.preventDefault();
  e.returnValue = '';
});

