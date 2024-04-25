
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    database: "grp",
    host: "localhost",
    user: "root",
    password: "Code@12345",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

exports.getContactsByDetails=async(param) => {
    try {
        const queryString = "SELECT id FROM `booklist` WHERE `book_name` = ? AND `publication_year` = ? AND `author_name` = ?";
        const [rows, fields] = await pool.query(queryString, [param.book_name, param.publication_year, param.author_name]);
        return rows[0]; // Return the first row if found
      } catch (err) {
        console.error(err);
        throw err;
      }
  }


  exports.getListofBooks = async (req) => {
    console.log(req, "fdfdf");
    try {
      let where = "";
      if (req.id) {
        where += ` AND id = '${req.id}'`;
      }
           if (req.book_name) {
        where += ` AND book_name = '${req.book_name}'`;
      }
      if (req.publication_year) {
        where += ` AND publication_year = '${req.publication_year}'`;
      }
      if (req.issueDate) {
        where += ` AND author_name = '${req.author_name}'`;
      }
      
      const condition = " WHERE 1=1 " + where;
      const queryString =
        "SELECT id, book_name, publication_year, author_name FROM `booklist`" + condition;
        console.log("SQL Query:", queryString);
      const [rows, fields] = await pool.query(queryString);
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
  exports.deleteBook = async (param) => {
    const id = param.id;
    console.log(id , "cvcvcxvcxv");
    try {
      const queryString = "DELETE FROM `booklist` WHERE `id` = ?";
      const [result] =  await pool.query(queryString, id); // Passing id as a parameter
      console.log("SQL Query:", queryString);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  

exports.createBookList = async (param) => {
    try {
        const connection = await pool.getConnection();
        const query = "INSERT INTO booklist SET `book_name` = ?, `publication_year` = ?, `author_name` = ?";
        const values = [param.book_name, param.publication_year, param.author_name];
        const result = await connection.execute(query, values);
        connection.release();
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.updateBook = async(param) => {
    const id = param.id
    try {
      const queryString = "UPDATE `booklist` SET `book_name` = ?, `publication_year` = ?, `author_name` = ? WHERE `id` = ?";
      const values = [param.book_name, param.publication_year, param.author_name, id];
      const [result] = await pool.query(queryString, values);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
