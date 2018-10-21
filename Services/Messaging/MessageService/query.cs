using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace MessageService
{
    public class query
    {
        private string connStr = "server=localhost;user=root;database=team9db;port=3306;password=password";

        public void Update(List<Messages> msg)
        {
            string command = string.Empty;

            using (MySqlConnection conn = new MySqlConnection(connStr))
            {
                conn.Open();
                
                foreach(Messages m in msg)
                {
                    command = String.Format(@"INSERT INTO msg VALUES('{0}', '{1}', CURDATE())", m.MessageSID, m.MessageBody,DateTime.Now.Date.ToShortDateString());
                    MySqlCommand comm = new MySqlCommand(command, conn);
                    comm.ExecuteNonQuery();
                }                           
            }
        }

        public List<string> Retrieve()
        {
            List<string> SIDs = new List<string>();
            string command = string.Empty;

            using (MySqlConnection conn = new MySqlConnection(connStr))
            {
                conn.Open();

                command = "SELECT SID FROM msg";
                MySqlCommand comm = new MySqlCommand(command, conn);
                using (MySqlDataReader reader = comm.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        SIDs.Add(reader.GetString(0));
                    }
                }
            }

            return SIDs;
        }
    }
}