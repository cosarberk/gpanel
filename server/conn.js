const mysql = require('mysql2');


const CONN =(db,host='127.0.0.1',user='root',pass='')=>{
    const connection = mysql.createConnection({
        host: host,
        user:user ,
        password: pass,
        database: db
    });
    connection.connect((err) => {
        if (err) {
            console.error('Hata: MySQL sunucusuna bağlanırken bir hata oluştu ' + err.stack);
            return;
        }
    
       //  console.log('Bağlantı başarılı, MySQL sunucusuna bağlandı, connection id: ' + connection.threadId);
    });

    return connection
}


// Bağlantıyı export etme
module.exports = CONN;