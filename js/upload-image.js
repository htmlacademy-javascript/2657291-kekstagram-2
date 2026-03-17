const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadFileElement = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreviewElements = document.querySelectorAll('.effects__preview');

export const initUploadImagePreview = () => {
  uploadFileElement.addEventListener('change', () => {
    const file = uploadFileElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((element) => fileName.endsWith(element));
    if (matches) {
      const url = URL.createObjectURL(file);

      imgUploadPreview.src = url;

      effectsPreviewElements.forEach((element) => {
        element.style.backgroundImage = `url(${url})`;
      });
    }
  });
};
