var dbPromised = idb.open("teams-reader", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Detail Team berhasil di simpan.");
    });
}


function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}


function deleteTeam(idTeam) {
        dbPromised.then((db) => {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        store.delete(idTeam);
        return tx.complete;
        }).then(() => {
        console.log('Item deleted');
        });
}

/*
dbPromise.then(function(db) {
  var tx = db.transaction('store', 'readwrite');
  var store = tx.objectStore('store');
  store.delete('123456789');
  return tx.complete;
}).then(function() {
  console.log('Item deleted');
});
*/

/*
function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}
*/