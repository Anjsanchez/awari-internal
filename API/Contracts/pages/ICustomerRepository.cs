using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data.ApiResponse;
using API.Dto.customers;
using API.Models;
using API.Models.customer;
using API.Models.user_management;
using Microsoft.AspNetCore.Http;

namespace API.Contracts.pages
{
    public interface ICustomerRepository : IRepositoryBase<Customer>
    {
        Task<Customer> getCustomerByCustomerId(long id);
        Task<IEnumerable<CustomerWithActiveBookingReadDto>> GetCustomersWithActiveBooking();
        Task<IEnumerable<Customer>> GetCustomersWithImage(HttpRequest request);

        Task<List<Vendor>> GetVendors(bool isActiveOnly = false);
        Task<ResultResponse> UpsertVendors(Vendor data);
    }
}