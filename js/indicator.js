const getdatetime = () => {
  const JST = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });
  const now = new Date(JST);

  const zeropadding = (d) => {
    return ('0' + d).slice(-2);
  }

  const year = now.getFullYear() + '';
  const month = zeropadding(now.getMonth() + 1);
  const date = zeropadding(now.getDate());
  const hour = zeropadding(now.getHours());
  const minute = zeropadding(now.getMinutes());
  const timestr = year + month + date + hour + minute;

  return Number(timestr);
}

const indicate = () => {
  const datetime = getdatetime();
  const $slot = $('.slot');
  $slot.each((i, e) => {
    const date = $(e).data('date');
    const start = $(e).data('start').replace(':', '');
    const end = $(e).data('end').replace(':', '');

    if ($slot.length > i + 1) {
      const ne = $slot.eq(i + 1);
      const nstart = $(ne).data('start').replace(':', '');
      if (nstart == start) return;
    }

    const datetime_s = Number(date + start);
    const datetime_e = Number(date + end);

    if (datetime_s <= datetime && datetime < datetime_e) {
      if (!$(e).hasClass('now-here')) {
        $slot.removeClass('now-here');
        $(e).addClass('now-here');
      }
    }
    if ($slot.length == i + 1 && datetime_e <= datetime) {
      $slot.removeClass('now-here');
    }
  });
}

window.onload = () => {
  setInterval(indicate, 1000);
}
