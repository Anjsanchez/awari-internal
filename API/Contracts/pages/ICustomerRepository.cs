using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dto.customers;
using API.Models;

namespace API.Contracts.pages
{
    public interface ICustomerRepository : IRepositoryBase<Customer>
    {
        Task<Customer> getCustomerByCustomerId(Int64 id);
        Task<IEnumerable<Customer>> GetCustomersWithActiveBooking();

    }
}