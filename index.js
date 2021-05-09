const Cloudant = require('@cloudant/cloudant')

async function main(params) {
    
	result = {body:{message: "ok", validado: false}}
	
    let num_id = params._id
    const doc0 = {"_id": "doc:" + num_id.toString(), "update": new Date().toString()}
    
	console.log('Entra a cloudant')
    try {
        const cloudant_ = Cloudant({
            url:"https://apikey-v2-2pxuyfo5ogxdyv1yy3sm4d9mr7w0okakc5512capbtq7:e4901805571cc31c42a4e3035e603cd8@90f5998c-e476-4c94-84eb-57ebaa62e088-bluemix.cloudantnosqldb.appdomain.cloud",
            plugins:{
                iamauth:{
                    iamApiKey: "rPk5TU_sSp-vuolcECjW2T1B6bg54peepOY9WlHl70qj"
                }
            }
        })
        console.log("Created connection")

        // let allDBS = await cloudant_.db.list()
        // console.log('cloudant dbs', allDBS)

        const db = cloudant_.db.use('documentos')
        console.log('Usando Documentos')

        let res = ""
        
        // get
        console.log('Usemos Get', doc0._id)
        res = await db.get(doc0._id)
        console.log('Tenemos Get', doc0._id)
        
        var diff =(new Date().getTime() - Date.parse(res.update)) / 1000;
        if(diff > 60) {
            console.log('Validado')
            result.body.message = 'Validado'
            result.body.validado = true
        } else {
            console.log('No Validado')
            result.body.message = 'No Validado'
        }
        return result


    } catch (err) {
        
        if (err.message=='missing') {
            res = await db.insert(doc0)
            console.log('Insertado', res)
            result.body.message = 'Insertado'
        } else {
            console.log('Error: ')
            result.body.message = err
        }
        return result
    }
}
