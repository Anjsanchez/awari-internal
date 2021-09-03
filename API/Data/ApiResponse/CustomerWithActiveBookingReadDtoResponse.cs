using System.Security.Cryptography;
using System.Collections.Generic;
using API.Models.customer;
using API.Dto.products;
using API.Dto.products.product;

namespace API.Data.ApiResponse
{
    public class CustomerWithActiveBookingReadDtoResponse
    {
        public IEnumerable<CustomerWithActiveBookingReadDto> customers { get; set; }
        public List<productCategoryReadDto> ProductCategories { get; set; }
        public List<productReadDto> Products { get; set; }
    }
}