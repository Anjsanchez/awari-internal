using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages;
using API.Data;
using API.Dto.customers;
using API.Models;
using API.Models.customer;
using API.Models.reservation;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly resortDbContext _db;

        public CustomerRepository(resortDbContext db)
        {
            _db = db;
        }
        public async Task<bool> Create(Customer entity)
        {
            await _db.Customers.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(Customer entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Customer>> FindAll(bool isActiveOnly = false)
        {
            var custs = await _db.Customers.ToListAsync();

            if (isActiveOnly)
                custs = custs.Where(n => n.isActive == true).ToList();

            return custs;
        }

        public async Task<Customer> FindById(Guid id)
        {
            return await _db.Customers.Include(n => n.user).FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<Customer> getCustomerByCustomerId(long id)
        {
            return await _db.Customers.Include(n => n.user).FirstOrDefaultAsync(n => n.customerid == id);
        }

        private async Task<ICollection<ReservationHeader>> getAllReservationHeader()
        {
            return await _db.ReservationHeaders.ToListAsync();
        }


        public async Task<IEnumerable<CustomerWithActiveBookingReadDto>> GetCustomersWithActiveBooking()
        {
            var custs = await FindAll(true);
            var reservationHdr = await getAllReservationHeader();

            var customersWithHeader = (from p in custs
                                       join c in reservationHdr on p._id equals c.customerId
                                       where (c.isActive == true)
                                       select new CustomerWithActiveBookingReadDto { Customer = p, headerId = c._id });

            return customersWithHeader;
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(Customer entity)
        {
            _db.Customers.Update(entity);
            return await Save();
        }
    }


}