using System.Security.Cryptography;
using System.Collections.Generic;
using API.Models.customer;
using API.Dto.products;
using API.Dto.products.product;
using API.Dto.products.type;

namespace API.Data.ApiResponse
{
    public class ProductWithCategoryResponse : AuthResult
    {
        public List<productReadDto> products { get; set; }
        public List<productTypeReadDto> types { get; set; }
        public List<productCategoryReadDto> categories { get; set; }
    }
}