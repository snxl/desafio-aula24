import Atendimentos from "../services/serviceAtendimento.js"


const pages = {
    atendimentosGET: (req, res) => {
        Atendimentos.lista(res)
    },
    
    atendimentosGETEspecifico: (req, res) => {
        const id = parseInt(req.params.id)

        Atendimentos.searchId(id, res)
    },

    atendimentosPOST: (req, res) =>{
        const atendimentos = req.body

        Atendimentos.adiciona(atendimentos, res)
    },  

    atendimentosPatch:(req, res)=>{
        const id = parseInt(req.params.id)
        const values = req.body

        Atendimentos.alteraPatch(id, values, res)
    },

    atendimentosDelete:(req, res) => {
        const id = parseInt(req.params.id)

        Atendimentos.delete(id, res)
    }
}

export default pages