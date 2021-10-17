using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dto.customers;
using API.Models;
using API.Models.customer;
using Microsoft.AspNetCore.Http;

namespace API.Contracts.pages
{
    public interface ICustomerRepository : IRepositoryBase<Customer>
    {
        Task<Customer> getCustomerByCustomerId(Int64 id);
        Task<IEnumerable<CustomerWithActiveBookingReadDto>> GetCustomersWithActiveBooking();
        Task<IEnumerable<Customer>> GetCustomersWithImage(HttpRequest request);
    }
}