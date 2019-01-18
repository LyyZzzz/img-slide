/**
 * slide 调用方法 基于jq
 * @param box 图片盒子  *
 * @param eachbox 每个图片最高父级  *
 * @param time 轮播间隔 *
 * @param ctrlLeft  上一张图
 * @param ctrlRight 下一张图
 */

function slide(box, eachbox, time, ctrlLeft, ctrlRight) {
  if(typeof(time) != Number && time < 0) {
    time = 2000
  }
  let $ul = $(`${box}`);
  let eachWidth = $ul.find(`${eachbox}:last`).width();
  $ul.find(`${eachbox}:last`).prependTo($ul);
  $ul.css("left", -eachWidth + "px");
  let setNewInterval = setInterval(animateRight, time);

  $(`${box}, ${ctrlLeft}, ${ctrlRight}`).hover(function () {
    clearInterval(setNewInterval);
  }).mouseleave(function () {
    setNewInterval = setInterval(animateRight, time)
  });

  $(`${ctrlLeft}`).click(function (e) {
    e.preventDefault();
    animateLeft()
  });

  $(`${ctrlRight}`).click(function (e) {
    e.preventDefault();
    animateRight();
  });

  /**
   * 左切
   */
  function animateLeft() {
    $ul.animate({left: 0 + "px"}, 500, function () {
      $ul.find(`${eachbox}:last`).prependTo($ul);
      $ul.css({left: -eachWidth + "px"});
    });
  }

  /**
   * 右切
   */
  function animateRight() {
    $ul.animate({left: -2 * eachWidth + "px"}, 500, function () {
      $ul.find(`${eachbox}:first`).appendTo($ul);
      $ul.css({left: -eachWidth + "px"});
    });
  }

  var dValue;
  var upAndLeave = false;
  $(`${box}`)[0].onmousedown = function (event) {
    upAndLeave = false;
    clearInterval(setNewInterval);
    downClientX = 0;
    var event = event || window.event;
    event.preventDefault();
    var downClientX = event.clientX;
    document.onmousemove = function (event) {
      clearInterval(setNewInterval);
      var event = event || window.event;
      dValue = event.clientX - downClientX;
      $ul.css("left", -eachWidth + dValue+ "px")
    };
  }

  $(`${box}`)[0].onmouseup = function() {
    upAndLeave = true;
    slightlyMove();
  };

  $(`${box}`)[0].onmouseleave = function () {
    if(!upAndLeave) {
      slightlyMove()
    }
  };

  function slightlyMove() {
    if(dValue <= -eachWidth / 2) {
      animateRight()
    } else if ( dValue > -eachWidth / 2 && dValue < 0) {
      $ul.animate({left: -eachWidth + "px"},200)
    } else if(dValue >= eachWidth / 2) {
      animateLeft();
    } else if (dValue > 0 && dValue < eachWidth / 2) {
      $ul.animate({left: -eachWidth + "px"},200)
    }
    document.onmousemove = null;
  }
}
