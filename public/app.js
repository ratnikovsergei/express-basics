document.addEventListener('click', (e) => {
  if (e.target.dataset.type === 'remove') {
    const id = e.target.dataset.id;

    remove(id).then(() => {
      e.target.closest('li').remove();
    });
  }

  if (e.target.dataset.type === 'edit') {
    const id = e.target.dataset.id;
    const newTitle = prompt('Введите новое название');

    if (newTitle) {
      update({ id, title: newTitle }).then(() => {
        e.target.closest('li').querySelector('span').innerText = newTitle;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}

async function update(note) {
  const response = await fetch(`/${note.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(note),
  });
}
