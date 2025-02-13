namespace TransitHive.Dtos
{
    public class ApiResponse
    {
        public string Message { get; set; } = string.Empty;

        public DateOnly Date { get; set; }

        public ApiResponse()
        {
            Date = DateOnly.FromDateTime(DateTime.Now);
        }

        public ApiResponse(string message)
        {
            Message = message;
            Date = DateOnly.FromDateTime(DateTime.Now);
        }
    }
}
