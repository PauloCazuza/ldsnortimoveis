const INITIAL_STATE = {
	usuarioEmail: "",
	usuarioLogado: 0,
	usuarioFoto: null,
	usuarioNome: "",
	usuario: undefined,
	editado: false,
	pessoa: "",
}

function usuarioReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "LOG_IN":
			return { ...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail, pessoa: null }
		case "LOG_OUT":
			return { ...state, usuarioLogado: 0, usuarioEmail: "", usuarioFoto: null, usuario: undefined, editado: false, pessoa: "" }
		case "SET_FOTO":
			return { ...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail, usuarioFoto: action.usuarioFoto }
		case "SET_NOME":
			return { ...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail, usuarioFoto: action.usuarioFoto, usuarioNome: action.usuarioNome, usuario: action.usuario, editado: false, pessoa: action.pessoa }
		case "ATUALIZA_USUARIO":
			return { ...state, usuario: action.usuario, editado: true }
		default:
			return state;
	}
}

export default usuarioReducer;