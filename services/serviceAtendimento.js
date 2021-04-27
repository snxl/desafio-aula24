import connection from "../config/conection.js";
import moment from "moment"


class Atendimentos {
    adiciona(atendimentos, res){

        const acesso = moment().format("YYYY-MM-DD HH:MM:SS")
        const dataAgendamento = moment(atendimentos.dataAgendamento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const validateData = moment(dataAgendamento).isSameOrAfter(acesso)
        const validateClient = atendimentos.cliente.length >= 5

        const validate = [
            {
                nome: "acesso",
                validate: validateData,
                message:"Data deve ser maior ou igual a data atual"
            },
            {
                nome:"cliente",
                validate: validateClient,
                message:"Cliente deve ter ao menos cinco caracteres"
            }
        ]

        const erros = validate.filter(element => !element.validate)
        const validateErro = erros.length

        if(validateErro){
            res.status(400).send(erros)
        }else{
            const newAtendimento = {...atendimentos, acesso, dataAgendamento}
            const sql = "INSERT INTO Atendimentos SET ?"
    
            connection.query(sql, newAtendimento, (err, results) => {
                if(err){
                    res.status(400).json(err)
                }else{
                    res.status(201).json({...newAtendimento, results})
                }
            })
        }
    }

    lista(res){
        const sql = "SELECT * FROM atendimentos"

        connection.query(sql, (err, resultados)=>{
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    searchId(id, res){
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`

        connection.query(sql, (err, resultados)=> {
            const results = resultados[0]
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(results)
            }
        })
    }

    alteraPatch(id, value, res){
        const sql = `UPDATE atendimentos SET ? WHERE id=?`

        if(value.dataAgendamento){
            value.dataAgendamento = moment(value.dataAgendamento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        connection.query(sql, [value, id], (err, results)=>{
            if (err){
                res.status(400).json(err)
            }else{
                res.status(200).json({...value,id,results})
            }
        })
    }

    delete(id,res){
        const sql = 'DELETE FROM atendimentos WHERE id=?'

        connection.query(sql, id, (err, results) => {
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json({
                    "id-deletado":id
                })
            }
        })
    }
}

export default new Atendimentos