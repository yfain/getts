const shapesElement = $('#shapes');

$('#selector').autocomplete({
    source: (request, response) => {
      try {  
        const elements = $(request.term, shapesElement);
        const ids = elements.map((_index, dom) => ({ label: $(dom).attr('id'), value: request.term })).toArray();
        response(ids);
      } catch (e) {
        // Invalid selector
      }
    },
    focus: (_event, ui) => {
      $('*', shapesElement).css({ border: 'none' });
      $(`#${ui.item.label}`, shapesElement).css({ border: '5px solid red' });
    }
});
