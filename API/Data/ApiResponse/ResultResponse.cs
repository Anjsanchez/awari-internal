namespace API.Data.ApiResponse
{
    public class ResultResponse
    {
        public result result { get; set; }
        public string message { get; set; }
    }

    public enum result
    {
        error,
        success,
    }
}
