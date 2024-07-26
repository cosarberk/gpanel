const CONN = require("./conn")



const getcolumns = (req, res) => {
    const { dbname, tbname } = req.body
    const connection = CONN(dbname)
    connection.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? ;`, [dbname, tbname], (err, results, fields) => {
        if (err) {
            console.error('Hata: column çekilirken bir hata ' + err.stack);
            return;
        }
       // console.log(results)
        let cr = []
        results.forEach(e => {
            cr.push(e.COLUMN_NAME)
        });
        res.status(200).json({ data: cr })
        connection.end();
    })
}

const gettables = (req, res) => {
    const { dbname } = req.body
    const connection = CONN(dbname)
    connection.query(`SELECT table_name FROM information_schema.tables WHERE TABLE_SCHEMA = ?;`, [dbname], (err, results, fields) => {
        if (err) {
            console.error('Hata: tablolar çekilirken bir hata ' + err.stack);
            return;
        }
        // console.log(results)
        let cr = []
        results.forEach(e => {
            cr.push(e.table_name)
        });
        res.status(200).json({ data: cr })
        connection.end();
    })

}
const getdatabases = (req, res) => {
    const connection = CONN()
    connection.query(`SHOW DATABASES`, (err, results, fields) => {
        if (err) {
            console.error('Hata: databaseler çekilirken bir hata ' + err.stack);
            return;
        }
        let cr = []
        let blockdbs = [
            "information_schema",  "performance_schema", "phpmyadmin", "test","gpanel"
        ]
        results.forEach(e => {
            !blockdbs.includes(e.Database) && cr.push(e.Database)
        });
        res.status(200).json({ data: cr })
        connection.end();
    })
}

const getFinders = (req, res) => {
    const connection = CONN('gpanel')
    connection.query("SELECT * FROM finders", (err, results, fields) => {
        if (err) {
            console.error('Hata: Veri çekilirken bir hata oluştu ' + err.stack);
            return;
        }
        // console.log(results)
        let rl = []
        results.forEach(e => {
            rl.push({id:e.id,afcname:e.afcname,dbsec:JSON.parse(e.dbsec)})
        });
        res.status(200).json({ data: rl })
        connection.end();
    })
}

const addFinder =(req,res)=>{
    const { afcname,dbsec } = req.body
    const connection = CONN('gpanel')
    connection.query("INSERT INTO finders (afcname, dbsec) VALUES (?,?)",[afcname,dbsec], (err, results, fields) => {
        if (err) {
            console.error('Hata: Veri eklenirken bir hata oluştu ' + err.stack);
            return;
        }
        // console.log(results)
        res.status(200).json({ data: results })
        connection.end();
    })
}

const delFinders = (req, res) => {
    const { id } = req.body
    const connection = CONN('gpanel')
    connection.query("DELETE FROM finders WHERE id=?",[id], (err, results, fields) => {
        if (err) {
            console.error('Hata: Veri çekilirken bir hata oluştu ' + err.stack);
            return;
        }
      
        res.status(200).json({ data: results })
        connection.end();
    })
}

const hard = (req, res) => {
    const { val } = req.body
    const connection = CONN(val.db)
    let tablenames = ""
    let values = []
    // console.log( val)

    val.f.forEach((e, i) => {
        val.f.length - 1 === i ? tablenames += `${e.value}= ?` : tablenames += `${e.value}= ? AND `
        values.push(e.ival.replace("'", ""))
    });

    const q = `SELECT * FROM ${val.tb} WHERE ${tablenames}`

    connection.query(q, values, (err, results, fields) => {
        if (err) {
            console.error('Hata: Veri eklenirken bir hata oluştu ' + err.stack);
            return;
        }
        // console.log(results)
        res.status(200).json({ data: results })
        connection.end();
    })
}

module.exports = {
    getcolumns, hard, gettables, getdatabases,getFinders,addFinder,delFinders
}
