// --- chuilachuipula_v1.0 ---

// # INIT ->
var god_elem = document.getElementById("chuilachuipula");
var is_chuila = {};
// Paramétrage css de base pour le bon affichage de ligne des listes,
// à savoir enlever les puces des listes great parent "ul",
// puis régler les display des small_child "h" en inline pour être positionné à coté des flèches,
// et enfin un cursor pointer pour les small_child_i
// Définition des rangs, status et state des enfants "div" des listes "li"
// Renseignement des états dans l'objet tableau associatif is_chuila

// # SI god_elem (div racine des listes) n'est pas indéfini ->
if(typeof god_elem !== "undefined"){
	// ## POUR chaque great_parent ->
	for(var i = 0; i < god_elem.children.length; i++){
		// ### -> j'alloue un tableau associatif de la liste "ul" à is_chuila
		is_chuila[i] = {}
		// ### -> j'enlève les puces de la liste great_parent
		var great_parent = god_elem.children[i];
		great_parent.style.listStyleType = "none";
		// ### -> j'alloue le rank pour le great_parent "ul"
		great_parent.setAttribute("data-rank", i);
		// ### POUR tous les parents "li" ->
		for(var ii = 0; ii < great_parent.children.length; ii++){
			// #### -> j'initialise les flèches de leurs petits-enfants "i" -> cursor : pointer;
			var small_child_i = great_parent.children[ii].children[0].children[0];
			small_child_i.style.cursor = "pointer";
			// #### -> ainsi que le small_child_h pour lui attribuer -> display : inline;
			var small_child_h = great_parent.children[ii].children[0].children[1];
			small_child_h.style.display = "inline";
			// #### SI c'est le premier parent "li" ->
			if(ii === 0){
				// ##### -> définition rank, status et state adéquates
				great_parent.children[ii].children[0].setAttribute("data-status", "title");
				great_parent.children[ii].children[0].setAttribute("data-state", "chuipula");
			}
			// #### SI ce n'est pas le premier parent "li" ->
			if(ii > 0){
				// ##### -> également définition rank, status et state adéquates
				great_parent.children[ii].children[0].setAttribute("data-status", "subtitle");
				great_parent.children[ii].children[0].setAttribute("data-rank", ii);
				great_parent.children[ii].children[0].setAttribute("data-state", "chuipula");
				// ##### -> ainsi qu'initialisation du display à none et son état au 2e enfant
				great_parent.children[ii].children[1].style.display = "none";
				is_chuila[i][ii] = "chuipula";
			};
			// #### SI je clique sur le small_child_i "i" du premier parent "li" de chaque great_parent "ul", 
			// je dois afficher (si masqués) ou masquer (si affichés) les 2e enfants "div" de tous les parents "li"
			// qui ne sont pas les premiers parents "li" de chaques great_parent "ul".
			// Je définis un évenement qui exécutera le moteur du script
			small_child_i.addEventListener("click", function(e){
				e.preventDefault();
				var item_clicked = e.target;
				// ##### RUN ->
				chuilaChuipula(item_clicked);
				return false;
			});
		};
	};
}
// # SINON god_elem n'éxiste pas et je renvoie une erreur !
else{
	console.log("error : div chuilachuipula n'existe pas !");
};

function chuilaChuipula(item_clicked){
	console.log("------ item_clicked : ------");
	console.log(item_clicked);
	console.log(is_chuila);
	// ## INIT ->
	// ## Je détermine le status du parent de l'élément cliqué ->
	var parent_status = item_clicked.parentElement.getAttribute("data-status");
	console.log("parent_status -> " + parent_status);
	// ## ainsi que l'état de son titre ->
	var state_title = item_clicked.parentElement.getAttribute("data-state");
	console.log("state_title -> " + state_title);
	// ## SI le titre est title,
	// ## j'ouvre tous les subtitle et modifie le sens des arrow (title + subtitle) ->
	if(parent_status === "title"){
		console.log("--- open/hide all : ->");
		// Liste "ul" concernée ->
		var rank_list_ul = item_clicked.parentElement.parentElement.parentElement.getAttribute("data-rank");
		console.log("rank_list_ul -> " + rank_list_ul);
		// Nombre de parent ->
		var nb_parent = item_clicked.parentElement.parentElement.parentElement.childElementCount;
		console.log("nb_parent -> " + nb_parent);
		// Etat arrow ->
		var state_arrow = item_clicked.parentElement.getAttribute("data-state");
		console.log("state_arrow -> " + state_arrow);
		if(state_arrow === "chuila"){
			item_clicked.classList.replace("icofont-caret-down", "icofont-caret-right");
			item_clicked.parentElement.setAttribute("data-state", "chuipula");
			for(var l = 1; l < nb_parent; l++){
				item_clicked.parentElement.parentElement.parentElement.children[l].children[0].children[0].classList.replace("icofont-rounded-down", "icofont-rounded-right");
				item_clicked.parentElement.parentElement.parentElement.children[l].children[0].setAttribute("data-state", "chuipula");
				item_clicked.parentElement.parentElement.parentElement.children[l].children[1].style.display = "none";
				is_chuila[rank_list_ul][l] = "chuipula";
			}
		}
		else if(state_arrow === "chuipula"){
			item_clicked.classList.replace("icofont-caret-right", "icofont-caret-down");
			item_clicked.parentElement.setAttribute("data-state", "chuila");
			for(var l = 1; l < nb_parent; l++){
				item_clicked.parentElement.parentElement.parentElement.children[l].children[0].children[0].classList.replace("icofont-rounded-right", "icofont-rounded-down");
				item_clicked.parentElement.parentElement.parentElement.children[l].children[0].setAttribute("data-state", "chuila");
				item_clicked.parentElement.parentElement.parentElement.children[l].children[1].style.display = "block";
				is_chuila[rank_list_ul][l] = "chuila";
			}
		}
	}
	// ## SINON SI le titre est subtitle,
	// ## j'ouvre le subtitle et modifie le sens de l'arrow ->
	else if(parent_status === "subtitle"){
		console.log("--- open/hide one : ->");
		// Liste "ul" concernée ->
		var rank_list_ul = item_clicked.parentElement.parentElement.parentElement.getAttribute("data-rank");
		console.log("rank_list_ul -> " + rank_list_ul);
		// Liste "li" concernée ->
		var rank_subtitle = item_clicked.parentElement.getAttribute("data-rank");
		console.log("rank_subtitle -> " + rank_subtitle);
		// Suivant state_arrow ->
		var state_arrow = item_clicked.parentElement.getAttribute("data-state");
		console.log("state_arrow -> " + state_arrow);
		if(state_arrow === "chuila"){
			item_clicked.classList.replace("icofont-rounded-down", "icofont-rounded-right");
			item_clicked.parentElement.setAttribute("data-state", "chuipula");
			item_clicked.parentElement.parentElement.children[1].style.display = "none";
			is_chuila[rank_list_ul][rank_subtitle] = "chuipula";
			var check_state = Object.values(is_chuila[rank_list_ul]);
			// #### SI je ne trouve aucun state "chuila", cela veut dire que toute la liste est fermée,
			// #### et donc je dois fermer la flèche du "li" status "title" (icofont-caret-right) ->
			if(check_state.indexOf("chuila") === -1){
				console.log("je ferme la flèche du title !");
				item_clicked.parentElement.parentElement.parentElement.children[0].children[0].children[0].classList.replace("icofont-caret-down", "icofont-caret-right");
				item_clicked.parentElement.parentElement.parentElement.children[0].children[0].setAttribute("data-state", "chuipula");
			}
		}
		else if(state_arrow === "chuipula"){
			item_clicked.classList.replace("icofont-rounded-right", "icofont-rounded-down");
			item_clicked.parentElement.setAttribute("data-state", "chuila");
			item_clicked.parentElement.parentElement.children[1].style.display = "block";
			is_chuila[rank_list_ul][rank_subtitle] = "chuila";
			var check_state = Object.values(is_chuila[rank_list_ul]);
			// #### SI je ne trouve aucun state "chuipula", cela veut dire que toute la liste est ouverte,
			// #### et donc je dois ouvrir la flèche du "li" status "title" (icofont-caret-down) ->
			if(check_state.indexOf("chuipula") === -1){
				console.log("j'ouvre la flèche du title !");
				item_clicked.parentElement.parentElement.parentElement.children[0].children[0].children[0].classList.replace("icofont-caret-right", "icofont-caret-down");
				item_clicked.parentElement.parentElement.parentElement.children[0].children[0].setAttribute("data-state", "chuila");
			}
		}
	}
}
