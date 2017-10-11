$(document).ready(() => {
  getFolders();
});

$('#submit-button').on('click', (e) => {
  e.preventDefault();
  $('.message-section').empty();
  const userFolder = $('#folder-input').val();

  if (userFolder.length) {
    createFolder(userFolder);
    $('#folder-input').val('');
  } else {
    $('.message-section').append(`
      <p>Please enter a name for your folder</p>
      `);
  }
});

$('.folder-list').on('click', (e) => {
  if (e.target.className === 'list-folder') {
    folderDetails(e.target.id, e.target.innerText);
  }
});

const folderDetails = (id, name) => {
  const container = $('.folder-detail');
  container.empty();
  container.prepend(`
      <div class="folder-details">
        <h2 class="detail-name">${name}</h2>
        <h3 class="new-link-title">Add New Link:</h3>
        <form class="url-form">
          <input id="url-name" placeholder="name"></input>
          <input id="url" placeholder="url"></input>
          <button onclick=submitUrl(${id}) id="crushify-button">Crushify!!!!</button>
        </form>
        <div class="detail-links-container">
          <h3 class="link-detail-title">Crushed Links:</h3>
          <div class="link-list"> </div>
        </div>
    </div>
  `);
  getLinks(id);
};

const getLinks = (id) => {
  fetch(`/api/v1/folders/${id}/links`)
    .then(response => response.json())
    .then(data => renderLinks(data));
};

const renderLinks = (links) => {
  links.map(link => prependLinks(link));
};

const prependLinks = (link) => {
  $('.link-list').prepend(`
    <div class="link-card">
      <header>
        <h3 class="link-name">${link.name}</h3>
      </header>
      <p>Short link:<a class="short-link" href='/short/${link.id}'>https://jetfuel-.herokuapp.com/short/${link.id}</a></p>
      <p>Visits: ${link.visits}</p>
      <p>Long URL: <a href=${link.url}>${link.url}</a>
      <p>Added on: ${link.created_at}</p>
    </div>
  `);
};

const getFolders = () => {
  fetch('/api/v1/folders')
    .then(response => response.json())
    .then(data => renderFolders(data));
};

const renderFolders = (folders) => {
  folders.map(folder => prependFolder(folder));
};

const prependFolder = (folder) => {
  $('.folder-list').prepend(`
    <div id=${folder.id} class="list-folder">
      <p class="folder" name=${folder.title} >${folder.title}</p>
    </div>
  `);
};

const submitUrl = (id) => {
  $('.message-section').empty();
  const name = $('#url-name').val();
  const url = $('#url').val();

  if (validateUrl(url) && validateName(name)) {
    crushifyLink(name, url, id);
    $('#url, #url-name').val('');
  }
};

const validateUrl = (url) => {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  const regex = new RegExp(expression);

  if (url.match(regex)) {
    return true;
  }

  $('.message-section').append(`
    <p>Please enter a valid URL starting with http:// or https://</p>
  `);
};

const validateName = (name) => {
  if (name.length) {
    return true;
  }

  $('.message-section').append(`
    <p>Please enter a name for your link</p>
  `);
};

const createFolder = (title) => {
  fetch('/api/v1/folders', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ title }),
  })
    .then(response => response.json())
    .then(folder => prependFolder(folder));
};


const crushifyLink = (name, url, folderId) => {
  fetch('api/v1/links', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name, url, folder_id: folderId, visits: 0,
    }),
  })
    .then(response => response.json())
    .then(link => prependLinks(link));
};
