using System.Collections.Generic;

namespace API.Data.ApiResponse
{
    public class GenericResponse<T> : AuthResult where T : class
    {
        public T singleRecord { get; set; }
        public List<T> listRecords { get; set; }
    }
}