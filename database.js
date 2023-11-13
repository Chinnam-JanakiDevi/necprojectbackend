const oracledb = require('oracledb');
const dbConfig = {
  user: "system",
  password: "manager",
  connectString: "localhost:/orcl",
};
const Query = async (sql) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql);
    await connection.commit();
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};

const sem_subjects = async (...Parameters) => {

  let Sql, Message;
  console.log(typeof (Parameters[2]));
  Details = Parameters[2];
  console.log(Details);

  switch (Parameters[1]) {
    case "Insert":
      Sql = `insert into ${Parameters[0]} values('${Details.sem}','${Details.subjects}')`;
      Message = "Inserted Successfully";
      break;
    case "Read":
      Sql = `select subject,sem from ${Parameters[0]} where sem = '${Details}'`;
      Message = `${Details} Retrived`
      break;

    default:
      console.error("Invalid Parameters");
      break;
  }
  console.log(Sql);
  var result = await Query(Sql);
  result.Message = Message;
  return result;
};

const topics_table = async (...Parameters) => {

  let Sql, Message;
  console.log(typeof (Parameters[2]));
  Details = Parameters[2];
  console.log(Details);

  switch (Parameters[1]) {
    case "Insert":
      Sql = `insert into ${Parameters[0]} values('${Details.sem}','${Details.subjects}')`;
      Message = "Inserted Successfully";
      break;
    case "Read":
      // Sql = `select topics from ${Parameters[0]} where semester = '${Details}'`;
      Sql = `select question from questions_table where topic in(select topics from ${Parameters[0]} where semester = '${Details}')`;

      Message = `${Details} Retrived`
      break;

    default:
      console.error("Invalid Parameters");
      break;
  }
  console.log(Sql);
  var result = await Query(Sql);
  result.Message = Message;
  return result;
};
module.exports = {
  sem_subjects: sem_subjects,
  topics_table:topics_table,
};

