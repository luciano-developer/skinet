namespace API.Errors
{
    public class ApiException : ApiResponse
    {

        public ApiException(int statusCode, string message = null, string details = null) : base(statusCode, message)
        {
            this.details = details;
        }

        public string details { get; private set; }

    }
}
