module.exports = function () {

   this.getProfessores = function (connection, callback) {
     connection.query('SELECT * FROM professores', callback);
   }
 
   this.getProfessor = function (connection, callback) {
     connection.query('SELECT * FROM professores WHERE id_professor = 1', callback);
   }
 

   this.getProfessorPorID = function (id_professor, pool, callback) {
    pool.request()
      .input('id_professor', sql.Int, id_professor)
      .query('SELECT * FROM professores WHERE id_professor = @id_professor')
      .then(result => {
        callback(null, result);
      })
      .catch(err => {
        callback(err, null);
      });
  };
 
   this.salvarProfessor = function (professor, connection, callback) {
     connection.query(
       `INSERT INTO professores (nome_professor, email_professor) VALUES ('${professor.nome_professor}', '${professor.email_professor}')`,
       callback
     );
   }
 
   const sql = require('mssql');

   this.deletarProfessor = function (professor, connection, callback) {
     connection.request()
       .input('id_professor', sql.Int, professor.id_professor)
       .query('DELETE FROM professores WHERE id_professor = @id_professor')
       .then(result => callback(null, result))
       .catch(err => callback(err, null));
   };
   
 
   this.editarProfessor = function (professor, connection, callback) {
     connection.query(
       `UPDATE professores SET nome_professor = '${professor.nome_professor}', email_professor = '${professor.email_professor}' WHERE id_professor = ${professor.id_professor}`,
       callback
     );
   }
 
   return this;
 }
 