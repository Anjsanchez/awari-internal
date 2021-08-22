using System;
using System.Threading.Tasks;
using API.Models;

namespace API.Contracts.pages
{
    public interface ICustomerRepository : IRepositoryBase<Customer>
    {
        Task<Customer> getCustomerByCustomerId(Int64 id);
    }
}