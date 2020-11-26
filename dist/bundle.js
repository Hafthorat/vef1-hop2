(function () {
  'use strict';

  //import List from './lib/list';
  //import Lecture from './lib/lecture';
  document.addEventListener('DOMContentLoaded', function () {
    var page = document.querySelector('body');
    var isLecturePage = page.classList.contains('lecture-page');

    if (isLecturePage) {
      var lecture = new Lecture();
      lecture.load();
    } else {
      var list = new List();
      list.load();
    }
  });

}());
//# sourceMappingURL=bundle.js.map
