const shapesElement = $('#shapes');
const errorElement = $('#error');
const infoElement = $('#info');

$('#selector').autocomplete({
    source: (request: { term: string }, response: ([]) => void) => {
      try {
        const elements = $(request.term, shapesElement);
        const ids = elements.map((_index, dom) => ({ label: $(dom).attr('id'), value: request.term })).toArray();
        response(ids);
        
        infoElement.text(`Found ${elements.length} element(s)`);
        errorElement.text('');
      } catch (e) {
        response([]);
        infoElement.text('');
        errorElement.text('Invalid selector');
        $('*', shapesElement).css({ border: 'none' });
      }
    },
    focus: (_event, ui) => {
      $('*', shapesElement).css({ border: 'none' });
      $(`#${ui.item.label}`, shapesElement).css({ border: '5px solid red' });
    }
});

$('#selector').on('input', (event: JQuery.TriggeredEvent<HTMLInputElement>) => {
  if (!event.target.value) {
    $('*', shapesElement).css({ border: 'none' });
    errorElement.text('');
    infoElement.text('');
  }
});
