using System.ServiceModel;
using System.ServiceModel.Web;


namespace MessageService
{
    //Service contract to send and receive messages.
    [ServiceContract]
    public interface IService1
    {
        [OperationContract]
        [WebInvoke(Method = "PUT", UriTemplate ="/SendMessage?CSVFile={csvPath}&Text={text}")]
        void SendMessage(string csvPath, string text);

        [OperationContract]
        [WebInvoke(Method = "PUT", UriTemplate ="/RetrieveMessages?CSVPath={exportPath}&DateFrom={dateFrom}&DateTo={dateTo}")]
        void RetrieveMessages(string exportPath, string dateFrom, string dateTo);
    }
}
