const hide_elements = $('#tech-chan-copyright,#announce,#print_program,#detail,#update,#footer');
const bg_image = $('body').css('background-image');

$('#print_program').click(() => {
  hide_elements.addClass('d-print-none');
  $('body').css('background-image', 'none');
  window.print();
  hide_elements.removeClass('d-print-none');
  $('body').css('background-image', bg_image);
});
