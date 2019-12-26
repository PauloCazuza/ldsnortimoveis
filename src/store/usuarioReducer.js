const INITIAL_STATE = {
	usuarioEmail: "",
	usuarioLogado: 0,
	usuarioFoto: null,
	usuarioNome: "",
	usuario: undefined,
	editado: false,
}

function usuarioReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "LOG_IN":
			return { ...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail }
		case "LOG_OUT":
			return { ...state, usuarioLogado: 0, usuarioEmail: "", usuarioFoto: null, usuario: undefined, editado: false, }
		case "SET_FOTO":
			return { ...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail, usuarioFoto: action.usuarioFoto }
		case "SET_NOME":
			return { ...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail, usuarioFoto: action.usuarioFoto, usuarioNome: action.usuarioNome, usuario: action.usuario, editado: false }
		case "ATUALIZA_USUARIO":
			return { ...state, usuario: action.usuario, editado: true }
		default:
			return state;
	}
}

export default usuarioReducer;