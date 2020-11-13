
var baseUrl = 'https://api.football-data.org/v2/';
var apiToken = 'b5100a61cefb486ebeaae700a54ab627';
var leagueID = 2021; // Premier League
var listMatches = '/matches';
var showStandings = '/standings';
var standingEPL = `${baseUrl}competitions/${leagueID}${showStandings}`;
var allTeams = `${baseUrl}competitions/${leagueID}/teams`;
var detailTeam = `${baseUrl}teams`;
var statusFinished = '?status=FINISHED';
var matchesSix = `${baseUrl}competitions/${leagueID}${listMatches}${statusFinished}&matchday=7`;
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
  if ("caches" in window) {
    caches.match(allTeams).then(function(response) {
      if (response) {
        response.json().then(function(team) {
          var articlesHTML = "";
          team.teams.forEach(function(tim) {
            articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${tim.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${tim.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${tim.name}</span>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(allTeams, {
    headers: {
      'X-Auth-Token': apiToken,
    }
  })
    .then(status)
    .then(json)
    .then(function(team) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      console.log(team);
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      team.teams.forEach(function(tim) {
        articlesHTML += `
            <div class="container">
              <div class="card">
                <a href="./article.html?id=${tim.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${tim.crestUrl}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${tim.name}</span>
                </div>
              </div>
            </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise((resolve, reject) => {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get('id');
    if ('caches' in window) {
      caches.match(`${detailTeam}/${idParam}`).then((response) => {
        if (response) {
          response.json().then((team) => {
            var articleHTML = `
              <div class="container">
                <div class="card">
                  <div class="card-image">
                    <img src="${team.crestUrl}">
                  </div>
                  <div class="card-content">
                    <table>
                      <thead>
                        <th colspan="2">
                          <div class="responsive-image valign-wrapper">
                            <img src="${team.crestUrl}" style="width: 5vw;"/>
                          </div>
                        </th>
                        <th><p>${team.name}<p></th>
                      </thead>
            
                      <tbody>
                        <tr>
                          <td>Address</td>
                          <td>:</td>
                          <td>${team.address}</td>
                        </tr>
                        <tr>
                          <td>Venue</td>
                          <td>:</td>
                          <td>${team.venue}</td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td>:</td>
                          <td>${team.phone}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>:</td>
                          <td>${team.email}</td>
                        </tr>
                        <tr>
                          <td>Founded</td>
                          <td>:</td>
                          <td>${team.founded}</td>
                        </tr>
                        <tr>
                          <td>Website</td>
                          <td>:</td>
                          <td>${team.website}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            `;
            document.getElementById("body-content").innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(team);
          });
        }
      });
    }
    fetch(`${detailTeam}/${idParam}`, {
      headers: {
        'X-Auth-Token': apiToken,
      },
    })
      .then(status)
      .then(json)
      .then((team) => {
        var articleHTML = `
          <div class="container">
            <div class="card">
              <div class="card-image">
                <img src="${team.crestUrl}">
              </div>
              <div class="card-content">
                <table>
                  <thead>
                    <th colspan="2">
                      <div class="responsive-image valign-wrapper">
                        <img src="${team.crestUrl}" style="width: 5vw;"/>
                      </div>
                    </th>
                    <th><p>${team.name}<p></th>
                  </thead>
        
                  <tbody>
                    <tr>
                      <td>Address</td>
                      <td>:</td>
                      <td>${team.address}</td>
                    </tr>
                    <tr>
                      <td>Venue</td>
                      <td>:</td>
                      <td>${team.venue}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>:</td>
                      <td>${team.phone}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>:</td>
                      <td>${team.email}</td>
                    </tr>
                    <tr>
                      <td>Founded</td>
                      <td>:</td>
                      <td>${team.founded}</td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>:</td>
                      <td>${team.website}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `;
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(team);
      });
  });
}

function getSavedArticles() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    teams.forEach(function(team) {
      var description = team.shortName;
      articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${team.id}&favorite=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${description}</p>
                      <table>
                  <thead>
                    <th colspan="2">
                      <div class="responsive-image valign-wrapper">
                        <img src="${team.crestUrl}" style="width: 5vw;"/>
                      </div>
                    </th>
                    <th><p>${team.name}<p></th>
                  </thead>
        
                  <tbody>
                    <tr>
                      <td>Address</td>
                      <td>:</td>
                      <td>${team.address}</td>
                    </tr>
                    <tr>
                      <td>Venue</td>
                      <td>:</td>
                      <td>${team.venue}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>:</td>
                      <td>${team.phone}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>:</td>
                      <td>${team.email}</td>
                    </tr>
                    <tr>
                      <td>Founded</td>
                      <td>:</td>
                      <td>${team.founded}</td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>:</td>
                      <td>${team.website}</td>
                    </tr>
                  </tbody>
                </table>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getStandings() {
  if ("caches" in window) {
    caches.match(standingEPL).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.standings[0].table.forEach(function(standing) {
            articlesHTML += `
              <tr>
                <td>${standing.position}</td>
                <td colspan="2">
                  <div class="responsive-image valign-wrapper">
                    <img src="${standing.team.crestUrl}" style="width: 3.3vw;"/>
                    <p>${standing.team.name}<p>
                  </div>
                </td>
                <td>${standing.playedGames}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.goalDifference}</td>
                <td>${standing.points}</td>
              </tr>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standings").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(standingEPL, {
    headers: {
      'X-Auth-Token': apiToken,
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.standings[0].table.forEach(function(standing) {
        articlesHTML += `
          <tr>
            <td>${standing.position}</td>
            <td colspan="2">
              <div class="responsive-image valign-wrapper">
                <img src="${standing.team.crestUrl}" style="width: 3.3vw;"/>
                <p>${standing.team.name}<p>
              </div>
            </td>
            <td>${standing.playedGames}</td>
            <td>${standing.won}</td>
            <td>${standing.draw}</td>
            <td>${standing.lost}</td>
            <td>${standing.goalDifference}</td>
            <td>${standing.points}</td>
          </tr>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getMatches() {
  if ("caches" in window) {
    caches.match(matchesSix).then(function(response) {
      if (response) {
        response.json().then(function(match) {
          var articlesHTML = "";
          match.matches.forEach(function(matches) {
            articlesHTML += `
              <tr>
                <td>${matches.status}</td>
                <td>${matches.homeTeam.name}</td>
                <td colspan="2">
                  <div class="score center">
                    ${matches.score.fullTime.homeTeam} : ${matches.score.fullTime.awayTeam}
                  </div>
                </td>
                <td class="right-align">${matches.awayTeam.name}</td>
              </tr>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("matches").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(matchesSix, {
    headers: {
      'X-Auth-Token': apiToken,
    }
  })
    .then(status)
    .then(json)
    .then(function(match) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      console.log(match);
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      match.matches.forEach(function(matches) {
        articlesHTML += `
          <tr>
            <td>${matches.status}</td>
            <td>${matches.homeTeam.name}</td>
            <td colspan="2">
              <div class="score center">
                ${matches.score.fullTime.homeTeam} : ${matches.score.fullTime.awayTeam}
              </div>
            </td>
            <td class="right-align">${matches.awayTeam.name}</td>
          </tr>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("matches").innerHTML = articlesHTML;
    })
    .catch(error);
}

/*
====> Untuk mengakses detail artikel <=====
function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then((team) => {
    articleHTML = "";
    var articleHTML = `
          <div class="container">
            <div class="card">
              <div class="card-image">
                <img src="${team.crestUrl}">
              </div>
              <div class="card-content">
                <table>
                  <thead>
                    <th colspan="2">
                      <div class="responsive-image valign-wrapper">
                        <img src="${team.crestUrl}" style="width: 5vw;"/>
                      </div>
                    </th>
                    <th><p>${team.name}<p></th>
                  </thead>
        
                  <tbody>
                    <tr>
                      <td>Address</td>
                      <td>:</td>
                      <td>${team.address}</td>
                    </tr>
                    <tr>
                      <td>Venue</td>
                      <td>:</td>
                      <td>${team.venue}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>:</td>
                      <td>${team.phone}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>:</td>
                      <td>${team.email}</td>
                    </tr>
                    <tr>
                      <td>Founded</td>
                      <td>:</td>
                      <td>${team.founded}</td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>:</td>
                      <td>${team.website}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}
*/