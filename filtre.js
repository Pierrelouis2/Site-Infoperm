async function recup_data() {
  const response = await fetch("/lasthh.json");
  const donnee = await response.json();
  return donnee;
}

async function filtre() {
  let nom = String(document.getElementById("nom").value);

  let lst_donnee = await recup_data();
  let lst_donnee_filtre = [];
  let lst_personne_perm = [];
  let lst_personne_perm_tot = [];

  for (var id_nom of lst_donnee) {
    if (id_nom.Nom == nom) {
      lst_donnee_filtre.push(id_nom);

      for (var perm_test in id_nom) {
        //parcour des perms de tout le monde pour toute les horraire et recup des nom:

        for (var id_test_nom of lst_donnee) {
          for (var id_perm_test in id_test_nom) {
            if (
              id_perm_test != "Nom" &&
              id_perm_test != "Prenom" &&
              id_perm_test == perm_test &&
              id_test_nom[id_perm_test] == id_nom[perm_test]
            ) {
              lst_personne_perm.push(id_test_nom.Nom);
            }
          }
        }
        lst_personne_perm_tot.push(lst_personne_perm);
        lst_personne_perm = [];
      }
    }
  }
  console.log(lst_personne_perm_tot);
  display(lst_donnee_filtre, lst_personne_perm_tot);
}

async function display(lst_donnee_filtre, lst_personne_perm_tot) {
  var i = 0;
  const mainUl = document.createElement("ul");
  for (var key in lst_donnee_filtre[0]) {
    const secondUl = document.createElement("ul");
    const renfort = document.createElement("li");
    renfort.className = "renfort";
    renfort.innerHTML = lst_personne_perm_tot[i] + "<br>";
    secondUl.appendChild(renfort);

    i += 1;

    const perm = document.createElement("li");
    perm.innerHTML = "<u>" + key + ": " + lst_donnee_filtre[0][key] + "<br>";
    perm.appendChild(secondUl);
    mainUl.appendChild(perm);
  }
  clearBox();
  document.getElementById("infoperm").appendChild(mainUl);
}

function clearBox() {
  document.getElementById("infoperm").innerHTML = "";
}
