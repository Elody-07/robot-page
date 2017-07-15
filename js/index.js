$(function() {
  $.get('data.json', function(data) {
    if(data) {
      for(var i = 0; i < data.dance.length; i++) {
        if(data.dance[i].reset == false) {
          // TODO 插入
          blockStart(data.dance[i])
        }else {
          // TODO 截止
          blockEnd(data.dance[i])
        }
      }
    }
  })

  function blockEnd(data) {
    var minute = Number(data.time.substring(0,2));
    var second = Number(data.time.substring(3,5));
    var mSecond = Number(data.time.substring(6,9)); 
    var time = minute * 60 * 1000 + second * 1000 + mSecond; // 终止时间

    for(var item in data) {
      if(item !== 'time' && item !== 'reset'){
        var $panelWidth = $('.handle-panel').width()
        var left = 65 + (time / 50000) * $panelWidth 
        var $item = $('#' + item).find('.panel-line').last()
        var left1 = $item.css('left').substring(0, $item.css('left').length - 2)
        $item.css({
          width: left - left1
        })
      }
    }
  }

  function blockStart(data) {
    var minute = Number(data.time.substring(0,2));
    var second = Number(data.time.substring(3,5));
    var mSecond = Number(data.time.substring(6,9)); 
    var time = minute * 60 * 1000 + second * 1000 + mSecond; // 起始时间
    for(var item in data) {
      if(item !== 'time' && item !== 'reset'){
        var $div = $('<div class="panel-line"></div>')
        var $panelWidth = $('.handle-panel').width()
        var left = 65 + (time / 50000) * $panelWidth 
        $div.css({
          left: left,
          width: '1px' 
        })
        $('#' + item).append($div)
      }
    }
  }

})