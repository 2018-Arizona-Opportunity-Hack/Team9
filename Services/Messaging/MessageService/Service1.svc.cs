using System.Collections.Generic;
using System.Linq;
using System.IO;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System;

namespace MessageService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        const string accountSid = "AC62da8324816413183f116e44edf29fb8";
        const string authToken = "ab782b73f24fabd30c5d18ed1b6656d8";
        const string myPhoneNumber = "+14809990463";

        public void SendMessage(string csvPath, string text)
        {
            TwilioClient.Init(accountSid, authToken);
            CSV file = new CSV(csvPath, text);
            query q = new query();
            List<Messages> messagesTosend = new List<Messages>();
            foreach(Person user in file.getUsers())
            {
                MessageResource message = MessageResource.Create(
                    body: file.getText(),
                    from: new Twilio.Types.PhoneNumber(myPhoneNumber),
                    to: new Twilio.Types.PhoneNumber(user.PhoneNumber)
                    );

                messagesTosend.Add(new Messages(message.DateSent.ToString(), message.Body, message.To, message.Sid, message.Body));
            }

            q.Update(messagesTosend);            
        }

        public void RetrieveMessages(string exportPath, string dateFrom, string dateTo)
        {
            TwilioClient.Init(accountSid, authToken);
            List<Messages> messages = new List<Messages>();
            query q = new query();
            List<string> accountSids = q.Retrieve();

            foreach (string id in accountSids)
            {
                MessageResource resource = MessageResource.Fetch(new FetchMessageOptions(id));
                messages.Add(new Messages(resource.DateSent.ToString(), resource.Body, resource.From.ToString(), resource.Sid,
                    resource.Body));
            }

            CSV.exportCSV(exportPath, messages);
        }

        private class CSV
        {
            private string TextMessage { get; set; }
            private List<Person> Users { get; set; }

            public CSV(string path, string text)
            {
                this.TextMessage = text;
                this.Users = this.LoadUsers(path);
            }

            public List<Person> LoadUsers(string path)
            {
                List<Person> result = new List<Person>();
                using(StreamReader reader = new StreamReader(path))
                {
                    string header = reader.ReadLine();
                    while(reader.EndOfStream == false)
                    {
                        string line = reader.ReadLine();
                        var values = line.Split(',').ToList().Select(x => RemoveWhiteSpace(x)).ToList();

                        result.Add(new Person(values[0], values[1], values[2], values[3]));
                    }
                }
                return result;
            }

            public static void exportCSV(string path, List<Messages> messages)
            {
                using(var w = new StreamWriter(path))
                {
                    string header = "Date, Message, From";
                    w.WriteLine(header);
                    foreach (Messages msg in messages)
                    {
                        var line = String.Format("{0}, {1}, {2}", msg.Date, msg.TextMessage, msg.PhoneNumber);
                        w.WriteLine(line);
                        w.Flush();
                    }
                }

            }

            private string RemoveWhiteSpace(string str)
            {
                return str.Replace(" ", "");
            }

            public List<Person> getUsers()
            {
                return Users;
            }

            public string getText()
            {
                return TextMessage;
            }
        }


    }

    public class Person
    {
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string PhoneNumber { get; private set; }
        public string email { get; private set; }

        public Person(string firstName, string lastName, string phoneNumber, string email)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.PhoneNumber = phoneNumber;
            this.email = email;
        }
    }

    public class Messages
    {
        public string Date { get; private set; }
        public string TextMessage { get; private set; }
        public string FormattedName { get; private set; }
        public string PhoneNumber { get; private set; }
        public string MessageSID { get; private set; }
        public string MessageBody { get; set; }
        public Messages(string date, string TextMessage, string phoneNumber, string messageSID, string messageBody)
        {
            this.Date = date;
            this.TextMessage = TextMessage;
            this.PhoneNumber = phoneNumber.Insert(5,"-").Insert(9,"-");
            this.MessageSID = messageSID;
            this.MessageBody = messageBody;
        }
    }
}
