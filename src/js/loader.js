export class Loader {
  constructor(selector = '.loader') {
    this.isOpen = false;
    this.loaderRef = document.querySelector(selector);
  }
  toggle() {
    if (this.isOpen) {
      this.closeLoader();
    } else {
      this.openLoader();
    }
  }

  openLoader() {
    this.loaderRef.classList.add('is-loader-open');
    this.isOpen = true;
  }

  closeLoader() {
    setTimeout(() => {
      this.loaderRef.classList.remove('is-loader-open');
      this.isOpen = false;
    }, 550);
  }

  status() {
    return this.isOpen;
  }
}
